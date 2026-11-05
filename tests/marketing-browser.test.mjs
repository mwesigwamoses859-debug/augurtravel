import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs/promises';

const source=await fs.readFile(new URL('../marketing.js',import.meta.url),'utf8');
function visit(path,{doNotTrack=false}={}){
  const events=[],listeners={},saved=new Map();
  const location=new URL('https://augurtravel.com'+path);
  const context={location,URL,URLSearchParams,Blob,
    document:{referrer:'https://www.google.com/',querySelector:()=>null,addEventListener:(name,fn)=>listeners[name]=fn},
    navigator:{doNotTrack:doNotTrack?'1':'0',sendBeacon:(url,body)=>{events.push({url,body});return true;}},
    sessionStorage:{getItem:key=>saved.get(key),setItem:(key,value)=>saved.set(key,value)}};
  vm.runInNewContext(source,context);
  return {events,click:href=>listeners.click?.({target:{closest:()=>({href})}})};
}
test('separates Murchison, Queen Elizabeth and gorilla pages in categorical measurements',async()=>{
  for(const [path,service]of [['/murchison-falls-safari','murchison'],['/queen-elizabeth-safari','queen'],['/gorilla-trekking-uganda','gorilla']]){
    const {events}=visit(path);const data=JSON.parse(await events[0].body.text());
    assert.deepEqual(data,{event:'page_view',service,source:'google'});
  }
});
test('recognises the chosen package on catalogue enquiry links without sending the full trip text',async()=>{
  const v=visit('/packages');
  v.click('https://augurtravel.com/booking-request?service=Safari&trip=3-day%20Queen%20Elizabeth%20safari%20-%20USD%20planning%20guide');
  const event=v.events.at(-1);assert.equal(event.url,'/api/marketing-event');
  assert.deepEqual(JSON.parse(await event.body.text()),{event:'quote_click',service:'queen',source:'google'});
});
test('keeps the package category on the prefilled enquiry page',async()=>{
  const {events}=visit('/booking-request?service=Safari&trip=3-day%20Murchison%20Falls%20safari');
  assert.equal(JSON.parse(await events[0].body.text()).service,'murchison');
});
test('respects Do Not Track on new safari pages',()=>assert.equal(visit('/murchison-falls-safari',{doNotTrack:true}).events.length,0));
