import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const source=await fs.readFile(new URL('../functions/api/marketing-event.js',import.meta.url),'utf8');
const {onRequest}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const valid={event:'whatsapp_click',service:'safari',source:'google'};
function context(body=valid,options={}){
  const writes=[];
  const request=new Request('https://augurtravel.com/api/marketing-event',{
    method:options.method||'POST',
    headers:{Origin:options.origin||'https://augurtravel.com','Content-Type':'application/json'},
    ...(options.method==='GET'?{}:{body:typeof body==='string'?body:JSON.stringify(body)})
  });
  const env={MARKETING_DB:{prepare(sql){
    return {bind(...args){
      return {async run(){writes.push({sql,args});if(options.fail)throw new Error('database unavailable');}};
    }};
  }}};
  return {writes,request,env};
}
test('records only allowed categorical fields in daily totals',async()=>{const c=context();const r=await onRequest(c);assert.equal(r.status,204);assert.equal(c.writes.length,1);assert.deepEqual(c.writes[0].args.slice(1),['whatsapp_click','safari','google']);assert.match(c.writes[0].args[0],/^\d{4}-\d{2}-\d{2}$/);});
test('does not accept personal enquiry fields in measurements',async()=>{const c=context({...valid,email:'test@example.com'});assert.equal((await onRequest(c)).status,400);assert.equal(c.writes.length,0);});
test('rejects arbitrary route and source strings',async()=>{for(const body of [{...valid,service:'private-trip-details'},{...valid,source:'https://example.com/private'}]){const c=context(body);assert.equal((await onRequest(c)).status,400);assert.equal(c.writes.length,0);}});
test('does not expose the metric register through GET',async()=>{const c=context(valid,{method:'GET'});const r=await onRequest(c);assert.equal(r.status,405);assert.equal(await r.text(),'');});
test('rejects submissions from another origin',async()=>{const c=context(valid,{origin:'https://example.com'});assert.equal((await onRequest(c)).status,403);assert.equal(c.writes.length,0);});
test('rejects malformed and oversized payloads',async()=>{assert.equal((await onRequest(context('{bad'))).status,400);assert.equal((await onRequest(context(' '.repeat(257)))).status,413);});
test('does not report success when the database is unavailable',async()=>{assert.equal((await onRequest(context(valid,{fail:true}))).status,503);const c=context();c.env={};assert.equal((await onRequest(c)).status,503);});
