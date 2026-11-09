import test from 'node:test';
import assert from 'node:assert/strict';
import {authErrorMessage} from '../src/auth-client.js';

test('network and service failures explain retry instead of blaming credentials',()=>{
 for(const error of [new TypeError('Failed to fetch'),{message:'Load failed'}, {name:'AuthRetryableFetchError',message:'NetworkError'}, {name:'TimeoutError',message:'The operation was aborted'}, {status:503,message:'Service unavailable'}]){
  assert.match(authErrorMessage(error),/could not reach the account service/);
  assert.match(authErrorMessage(error),/try again/);
  assert.doesNotMatch(authErrorMessage(error),/email was sent|invalid password/i);
 }
});
test('credential and confirmation errors remain distinct from outages',()=>{
 for(const message of ['Invalid login credentials','Email not confirmed','Passwords do not match.'])assert.equal(authErrorMessage({message}),message);
});
test('outage instructions support all app languages and unknown locale fallback',()=>{
 assert.match(authErrorMessage({message:'Failed to fetch'},'hi-IN'),/खाता सेवा/);
 assert.match(authErrorMessage({message:'Failed to fetch'},'gu-IN'),/ખાતાની સેવા/);
 assert.match(authErrorMessage({message:'Failed to fetch'},'fr'),/account service/);
});
