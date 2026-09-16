import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist'),port=Number(process.env.PORT||4173);
const harness=process.env.KKK_TEST_BACKEND==='1'?await import('../tests/browser-harness.mjs'):null;
try{const text=await fs.readFile('.env','utf8');for(const line of text.split(/\r?\n/)){const m=line.match(/^([A-Z_]+)=(.*)$/);if(m&&!process.env[m[1]])process.env[m[1]]=m[2].trim();}}catch{}
http.createServer(async(req,res)=>{
 const url=new URL(req.url,'http://localhost:'+port);res.setHeader('X-Content-Type-Options','nosniff');
 if(harness&&await harness.handle(req,res,url))return;
 if(url.pathname.startsWith('/api/')){
  const name=url.pathname.slice(5);if(!['config','weather','catalog','delete-account','assistant'].includes(name)){res.writeHead(404).end();return;}
  let body='';for await(const chunk of req){body+=chunk;if(body.length>3000000){res.writeHead(413).end();return;}}
  req.query=Object.fromEntries(url.searchParams);try{req.body=body?JSON.parse(body):{};}catch{res.writeHead(400).end();return;}
  res.status=n=>{res.statusCode=n;return res;};res.json=x=>{res.setHeader('Content-Type','application/json');res.end(JSON.stringify(x));};
  try{const {default:handler}=await import('../api/'+name+'.js');await handler(req,res);}catch(e){console.error(e);res.status(500).json({error:'Server error'});}return;
 }
 let target=path.resolve(root,'.'+decodeURIComponent(url.pathname));if(target!==root&&!target.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 if(!path.extname(target)){try{await fs.access(path.join(target,'index.html'));target=path.join(target,'index.html');}catch{target=path.join(root,'index.html');}}
 const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.xml':'application/xml','.txt':'text/plain','.woff2':'font/woff2'};
 try{const data=await fs.readFile(target);res.setHeader('Content-Type',mime[path.extname(target)]||'application/octet-stream');res.setHeader('Cache-Control','no-cache');res.end(data);}catch{res.writeHead(404).end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log('Preview: http://127.0.0.1:'+port));
