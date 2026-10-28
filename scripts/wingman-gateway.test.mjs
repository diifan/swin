import assert from 'node:assert/strict';
import handler from '../api/wingman-gateway.js';
async function invoke(overrides={}) {
 const req={method:'POST',query:{route:'style-chat'},headers:{authorization:'Bearer '+'a'.repeat(43)},body:{messages:[]},...overrides};
 const out={headers:{},setHeader(k,v){this.headers[k]=v},status(s){this.code=s;return this},json(v){this.body=v;return this}};
 await handler(req,out);return out;
}
let calls=0;
global.fetch=async()=>{calls++;throw new Error('unexpected');};
assert.equal((await invoke({headers:{}})).code,401);assert.equal(calls,0);
assert.equal((await invoke({query:{route:'https://untrusted.example'}})).code,404);assert.equal(calls,0);
assert.equal((await invoke({body:{text:'x'.repeat(600001)}})).code,413);assert.equal(calls,0);
global.fetch=async(url,options)=>{assert.equal(url,'https://wingman-ai-gateway.chrischankris.chatgpt.site/v1/style-chat');assert.equal(options.redirect,'manual');assert.equal(options.headers['X-WingMan-Plan'],'pro');return Response.json({error:'pro_unavailable'},{status:503});};
assert.equal((await invoke({headers:{authorization:'Bearer '+'a'.repeat(43),'x-wingman-plan':'pro'}})).code,503);
global.fetch=async()=>new Response('<html>Blocked</html>',{status:403,headers:{'Content-Type':'text/html'}});
const blocked=await invoke();assert.equal(blocked.code,502);assert.equal(blocked.body.error,'upstream_access');assert(!JSON.stringify(blocked.body).includes('<html>'));
global.fetch=async()=>Response.json({message:'hello',reply_count:1});const good=await invoke();assert.equal(good.code,200);assert.equal(good.body.message,'hello');
console.log('PASS: relay authentication, path allowlist, body limit, Pro forwarding, HTML blocking and JSON response');
