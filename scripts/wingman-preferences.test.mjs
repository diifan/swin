import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import * as copy from '../server/wingman-worker.mjs';
import {localReplies,acquireCooldown} from '../server/wingman-preferences.mjs';
const source=process.env.WINGMAN_WORKER_SOURCE ? await import('data:text/javascript;base64,'+Buffer.from(readFileSync(process.env.WINGMAN_WORKER_SOURCE)).toString('base64')) : null;
if(!source) console.log('SKIP cross-repository parity: set WINGMAN_WORKER_SOURCE to the original Worker source');
const keys=['tone','word_choice','length','line_breaks','punctuation','capitalization','emoji','language'];
const learned={source:'chat',sample_count:3,summary:'Casual',habits:Object.fromEntries(keys.map(k=>[k,'casual']))};
const prefs={source:'explicit_preferences',sample_count:0,summary:'Preferences',habits:{},wording_preferences:'Short and casual'};
for(let i=0;source && i<240;i++) {
 const p={message:i%2?'今天过得怎么样':'How was your day?',style:i%3?prefs:learned,reply_language:{languages:[i%2?'zh-Hans':'en'],allow_code_switching:false},reply_format:['auto','single','separate'][i%3]};
 assert.deepEqual(copy.prepare('/v1/replies',p),source.prepare('/v1/replies',p));
 const value={replies:[{text:'今天挺好的'},{text:'还不错呢'},{text:'你今天怎么样'}]};
 const result=m=>{try{return {ok:m.validate('/v1/replies',p,value)}}catch(e){return {status:e.status,code:e.code}}};
 // Successful results carry random IDs, compare semantics without those IDs.
 const normalize=v=>JSON.parse(JSON.stringify(v,(k,x)=>k==='id'?undefined:x));
 assert.deepEqual(normalize(result(copy)),normalize(result(source)));
}
const env={QWEN_API_KEY:'test',QWEN_URL:'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions'},auth='Bearer '+'a'.repeat(43),p={message:'Hi',style:prefs};let calls=0,gates=0;
const dep={acquire:async()=>{gates++;return {allowed:true,retry_after_ms:0}},run:async()=>{calls++;return {replies:[1,2,3]}}};
assert.equal((await localReplies(p,auth,null,env,dep)).status,200);
assert.equal((await localReplies(p,'bad',null,env,dep)).status,401);
assert.equal((await localReplies(p,auth,'pro',env,dep)).status,503);
assert.equal((await localReplies(p,auth,null,{...env,ENFORCE_FREE_LIMITS:'true'},dep)).status,503);
assert.equal((await localReplies({...p,style:{...prefs,wording_preferences:''}},auth,null,env,dep)).status,422);assert.equal(gates,1);
assert.equal((await localReplies(p,auth,null,env,{...dep,acquire:async()=>({allowed:false,retry_after_ms:7001})})).body.retry_after,8);
assert.equal((await localReplies(p,auth,null,env,{...dep,acquire:async()=>{throw new copy.Fault(503,'unavailable','Unavailable')}})).status,503);assert.equal(calls,1);
await assert.rejects(acquireCooldown('a'.repeat(43),{WM_GATE_SUPABASE_URL:'https://ttlymtchsjhyskaaneeu.supabase.co',WM_GATE_SERVICE_KEY:'test'},async()=>new Response('[]',{status:200})),e=>e.status===503);
console.log('PASS validation before cooldown, auth/pro/quota gates, fail closed, no model call on denial');
if(source) console.log('PASS 240-payload cross-repository parity');
