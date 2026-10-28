import {randomUUID} from 'node:crypto';
const origin='https://wingman-ai-gateway.chrischankris.chatgpt.site';
const routes=new Set(['style-chat','style','replies','person-summary','prepare','validate']);
export default async function handler(req,res) {
  const id=randomUUID();
  res.setHeader('Cache-Control','no-store');res.setHeader('X-WingMan-Request-ID',id);
  const fail=(status,code,message)=>res.status(status).json({error:code,message,request_id:id});
  const route=String(req.query.route??'');
  if(route==='health'&&req.method==='GET')return res.status(200).json({service:'WingMan API',status:'ok'});
  if(!(route==='config'&&req.method==='GET')&&!(routes.has(route)&&req.method==='POST'))return fail(404,'not_found','Not found.');
  const auth=req.headers.authorization??'';
  if(req.method==='POST'&&!/^Bearer [A-Za-z0-9_-]{43}$/.test(auth))return fail(401,'invalid_installation','Please reopen WingMan and try again.');
  const body=req.method==='POST'?JSON.stringify(req.body):undefined;
  if(body&&Buffer.byteLength(body)>600000)return fail(413,'too_large','Input is too large.');
  try {
    const upstream=await fetch(origin+'/v1/'+route,{method:req.method,redirect:'manual',headers:{'Content-Type':'application/json',...(auth?{Authorization:auth}:{}),...(req.headers['x-wingman-plan']?{'X-WingMan-Plan':req.headers['x-wingman-plan']}:{})},body,signal:AbortSignal.timeout(265000)});
    if(!upstream.headers.get('content-type')?.includes('application/json')) {
      console.error(JSON.stringify({request_id:id,route,upstream_status:upstream.status,reason:'non_json_origin'}));
      return fail(502,'upstream_access','The AI connection is unavailable. Please try again shortly.');
    }
    const reader=upstream.body.getReader();let size=0;const chunks=[];
    while(true){const {value,done}=await reader.read();if(done)break;size+=value.length;if(size>262144){await reader.cancel();throw new Error('response_size');}chunks.push(Buffer.from(value));}
    const data=JSON.parse(Buffer.concat(chunks).toString('utf8'));
    return res.status(upstream.status).json(data);
  }catch(error){console.error(JSON.stringify({request_id:id,route,reason:error.name}));return fail(502,'connection_failed','The AI connection was interrupted. Please try again.');}
}
