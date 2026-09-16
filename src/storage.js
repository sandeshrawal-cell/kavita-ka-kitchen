const request = req => new Promise((resolve,reject)=>{req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});
export class KitchenStore {
  constructor(userId,remote,onStatus=()=>{}){if(!userId)throw new Error('A signed-in account is required.');this.userId=userId;this.remote=remote;this.onStatus=onStatus;this.rows=new Map();this.active=true;this.flushTask=null;this.conflicts=new Set();}
  async open(){
    const req=indexedDB.open('kkk-private-v3:'+this.userId,1);
    req.onupgradeneeded=()=>req.result.createObjectStore('records',{keyPath:'id'});
    this.db=await request(req);const rows=await request(this.db.transaction('records').objectStore('records').getAll());
    rows.forEach(r=>this.rows.set(r.id,r));this.status();return this;
  }
  status(error){if(!this.active)return;const dirty=[...this.rows.values()].filter(r=>r.dirty).length;this.onStatus({dirty,conflicts:this.conflicts.size,error,offline:!navigator.onLine});}
  async persist(row){if(!this.active)return;await new Promise((resolve,reject)=>{const tx=this.db.transaction('records','readwrite');tx.objectStore('records').put(row);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}
  get(kind){return [...this.rows.values()].filter(r=>r.kind===kind&&!r.deleted_at).map(r=>({...r.payload,_id:r.id}));}
  value(id,fallback=null){const r=this.rows.get(id);return r&&!r.deleted_at?r.payload:fallback;}
  async put(kind,id,payload){if(!this.active)throw new Error('Sign in again to save.');if(JSON.stringify(payload).length>250000)throw new Error('This item is too large.');
    const old=this.rows.get(id);const row={id,kind,payload,user_id:this.userId,version:old?.version||0,dirty:true,mutation_id:crypto.randomUUID(),deleted_at:null};
    await this.persist(row);if(!this.active)return;this.rows.set(id,row);this.status();clearTimeout(this.timer);this.timer=setTimeout(()=>this.sync(),350);return row;
  }
  async remove(id){const row=this.rows.get(id);if(!row)return;await this.put(row.kind,id,row.payload);const next={...this.rows.get(id),deleted_at:new Date().toISOString()};await this.persist(next);this.rows.set(id,next);this.status();}
  async sync(){if(!this.active||!this.remote||!navigator.onLine)return;if(this.flushTask)return this.flushTask;this.flushTask=this.runSync().catch(e=>this.status(e.message)).finally(()=>{this.flushTask=null;});return this.flushTask;}
  async runSync(){
    for(const initial of [...this.rows.values()].filter(r=>r.dirty)){
      if(!this.active)return;if(this.conflicts.has(initial.id))continue;
      const result=await this.remote.write(initial);if(!this.active)return;
      if(result.conflict){this.conflicts.add(initial.id);continue;}
      const current=this.rows.get(initial.id);const clean=current.mutation_id===initial.mutation_id?{...result.record,dirty:false}:{...current,version:result.record.version};
      await this.persist(clean);if(!this.active)return;this.rows.set(clean.id,clean);
    }
    const incoming=await this.remote.read();if(!this.active)return;
    for(const r of incoming){if(r.user_id!==this.userId)throw new Error('Unexpected account in sync response.');const local=this.rows.get(r.id);if(local?.dirty)continue;await this.persist({...r,dirty:false});if(!this.active)return;this.rows.set(r.id,{...r,dirty:false});}
    this.status();this.onChange?.();
  }
  async resolve(id,keepLocal){const remote=await this.remote.one(id);if(!this.active)return;const local=this.rows.get(id);if(!local)return;
    const row=keepLocal?{...local,version:remote?.version||0,mutation_id:crypto.randomUUID()}:remote?{...remote,dirty:false}:{...local,dirty:false,deleted_at:new Date().toISOString()};
    await this.persist(row);this.rows.set(id,row);this.conflicts.delete(id);this.status();await this.sync();
  }
  close(){this.active=false;clearTimeout(this.timer);this.db?.close();this.rows.clear();}
  async erase(){const name='kkk-private-v3:'+this.userId;this.close();await request(indexedDB.deleteDatabase(name));}
}
export function supabaseRemote(client,userId,connection){
  // Pin each HTTP request to the verified session captured for this store's owner.
  // A shared Supabase client's current session can change while an old queue awaits I/O.
  async function call(path,body){
    const {data,error}=await client.auth.getSession();if(error)throw error;
    if(data.session?.user.id!==userId)throw new Error('Account changed; sync was cancelled.');
    const token=data.session.access_token;
    const r=await fetch(connection.url+'/rest/v1/'+path,{method:body?'POST':'GET',headers:{apikey:connection.key,Authorization:'Bearer '+token,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(12000)});
    const result=await r.json();if(!r.ok)throw new Error(result.message||'Sync unavailable');return result;
  }
  return {
    async write(row){return call('rpc/kkk_write_record',{p_id:row.id,p_kind:row.kind,p_payload:row.payload,p_expected_version:row.version,p_mutation_id:row.mutation_id,p_deleted:!!row.deleted_at});},
    async read(){let cursor='',all=[];for(;;){const q=new URLSearchParams({select:'*',user_id:'eq.'+userId,order:'id',limit:'500'});if(cursor)q.set('id','gt.'+cursor);const rows=await call('kkk_records?'+q);all.push(...rows);if(rows.length<500)return all;cursor=rows.at(-1).id;}},
    async one(id){const rows=await call('kkk_records?'+new URLSearchParams({select:'*',user_id:'eq.'+userId,id:'eq.'+id,limit:'1'}));return rows[0]||null;}
  };
}
// Public catalogue cache contains no account data. Private data never enters the service-worker cache.
export const publicCache={
  async db(){if(this.handle)return this.handle;const r=indexedDB.open('kkk-public-v3',1);r.onupgradeneeded=()=>r.result.createObjectStore('cache');return this.handle=await request(r);},
  async get(key){const db=await this.db();return request(db.transaction('cache').objectStore('cache').get(key));},
  async set(key,value){const db=await this.db();return request(db.transaction('cache','readwrite').objectStore('cache').put(value,key));}
};
