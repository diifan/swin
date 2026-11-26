import {createHash} from 'node:crypto';
import {Fault,prepare,runModel} from './wingman-worker.mjs';
export const isPreferencesOnly=s=>s && typeof s==='object' && !Array.isArray(s) && s.source==='explicit_preferences' && s.sample_count===0;
const unavailable=()=>new Fault(503,'unavailable','AI is temporarily unavailable. Please try again shortly.');
export async function acquireCooldown(bearer,env,fetcher=fetch) {
  try {
    const base=new URL(env.WM_GATE_SUPABASE_URL);
    if(base.protocol!=='https:' || base.hostname!=='ttlymtchsjhyskaaneeu.supabase.co' || base.username || base.password || !env.WM_GATE_SERVICE_KEY)throw unavailable();
    const p_key=createHash('sha256').update('wm-reply-cooldown:v1:'+bearer).digest('hex');
    const response=await fetcher(new URL('/rest/v1/rpc/wm_reply_cooldown_acquire',base),{method:'POST',redirect:'error',headers:{'Content-Type':'application/json',apikey:env.WM_GATE_SERVICE_KEY,Authorization:'Bearer '+env.WM_GATE_SERVICE_KEY},body:JSON.stringify({p_key,p_cooldown_ms:8000}),signal:AbortSignal.timeout(5000)});
    if(!response.ok)throw unavailable();
    const rows=await response.json();
    if(!Array.isArray(rows)||rows.length!==1||typeof rows[0].allowed!=='boolean'||!Number.isInteger(rows[0].retry_after_ms)||rows[0].retry_after_ms<0||rows[0].retry_after_ms>60000)throw unavailable();
    return rows[0];
  } catch {throw unavailable();}
}
export async function localReplies(payload,auth,plan,env=process.env,dependencies={}) {
  try {
    if(!/^Bearer [A-Za-z0-9_-]{43}$/.test(auth??''))throw new Fault(401,'invalid_installation','Please reopen WingMan and try again.');
    if(payload.plan==='pro'||plan==='pro')throw new Fault(503,'pro_unavailable','WingMan Pro is not available yet.');
    if(env.ENFORCE_FREE_LIMITS==='true'||!env.QWEN_API_KEY||!env.QWEN_URL)throw unavailable();
    const prepared=prepare('/v1/replies',payload);
    const url=new URL(env.QWEN_URL);
    if(url.protocol!=='https:'||url.username||url.password||!(url.hostname==='dashscope.aliyuncs.com'||url.hostname.endsWith('.cn-beijing.maas.aliyuncs.com')))throw unavailable();
    const gate=await (dependencies.acquire??acquireCooldown)(auth.slice(7),env);
    if(!gate.allowed)throw Object.assign(new Fault(429,'retry_cooldown','Please wait a few seconds before trying again.'),{retryAfter:Math.max(1,Math.ceil(gate.retry_after_ms/1000))});
    const result=await (dependencies.run??runModel)(url,env,prepared,'/v1/replies',payload);
    return {status:200,body:{...result,allowance:{unlimited:true}}};
  } catch(error) {
    const known=error instanceof Fault;
    return {status:known?error.status:502,body:{error:known?error.code:'service_error',message:known?error.message:'AI is temporarily unavailable. Please try again shortly.',...(error.retryAfter?{retry_after:error.retryAfter}:{})}};
  }
}
