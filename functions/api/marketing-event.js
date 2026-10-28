const EVENTS=new Set(['page_view','quote_click','whatsapp_click','phone_click','enquiry_form_view','profile_download']);
const SERVICES=new Set(['general','safari','gorilla','transfer','car','hotel','corporate','rwanda','custom']);
const SOURCES=new Set(['google','bing','tripadvisor','safaribookings','facebook','instagram','partner','direct','other','qa']);
const HEADERS={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'};

export async function onRequest({request,env}){
  const respond=(status)=>new Response(null,{status,headers:HEADERS});
  if(request.method!=='POST')return respond(405);
  const url=new URL(request.url);
  if(!['augurtravel.com','www.augurtravel.com'].includes(url.hostname))return respond(403);
  if(request.headers.get('Origin')!==url.origin)return respond(403);
  if(!request.headers.get('Content-Type')?.startsWith('application/json'))return respond(415);
  if(Number(request.headers.get('Content-Length')||0)>256)return respond(413);
  let data;
  try{const text=await request.text();if(new TextEncoder().encode(text).length>256)return respond(413);data=JSON.parse(text);}catch{return respond(400);}
  if(!data||typeof data!=='object'||Array.isArray(data)||Object.keys(data).length!==3||!EVENTS.has(data.event)||!SERVICES.has(data.service)||!SOURCES.has(data.source))return respond(400);
  if(!env.MARKETING_DB)return respond(503);
  try{
    await env.MARKETING_DB.prepare('INSERT INTO marketing_daily(day,event,service,source,total) VALUES(?1,?2,?3,?4,1) ON CONFLICT(day,event,service,source) DO UPDATE SET total=total+1').bind(new Date().toISOString().slice(0,10),data.event,data.service,data.source).run();
    return respond(204);
  }catch{return respond(503);}
}
