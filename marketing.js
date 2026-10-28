/* Only categorical aggregate measurements are sent; enquiry contents stay in the form. */
(() => {
  const serviceNames={Safari:'safari','Gorilla trekking':'gorilla','Airport transfer':'transfer','Car hire':'car','Hotel booking':'hotel','Corporate transport':'corporate','Rwanda tour':'rwanda','Custom journey':'custom'};
  const pageServices={'murchison-falls-safari':'safari','queen-elizabeth-safari':'safari','ziwa-rhino-tracking':'safari','gorilla-trekking-uganda':'gorilla','airport-transfers':'transfer','corporate-transport':'corporate','travel-partners':'corporate','car-hire':'car','hotels':'hotel','rwanda-tours':'rwanda','packages':'safari','wild-tours':'safari'};
  const params=new URLSearchParams(location.search);
  const requestedService=params.get('service');
  const selectedService=Object.hasOwn(serviceNames,requestedService)?requestedService:'';
  const requestedTrip=(params.get('trip')||'').replace(/[\r\n]/g,' ').slice(0,180).trim();
  const path=location.pathname.replace(/^\//,'').replace(/\.html$/,'').replace(/\/$/,'');
  const pageService=pageServices[path]||serviceNames[selectedService]||'general';
  const directForm=document.querySelector('#augur-direct-form');
  const fallback=document.querySelector('#augur-form-fallback');
  if(directForm&&(selectedService||requestedTrip)){
    const url=new URL(directForm.src);
    if(selectedService)url.searchParams.set('entry.1375294032',selectedService);
    if(requestedTrip)url.searchParams.set('entry.1651185533','Trip: '+requestedTrip);
    directForm.src=url.href;
    if(fallback){const link=new URL(url.href);link.searchParams.delete('embedded');fallback.href=link.href;}
    const note=document.querySelector('#enquiry-service-note');
    if(note)note.textContent=(selectedService?'Your service: '+selectedService+'. ':'')+(requestedTrip?'Your trip: '+requestedTrip+'. ':'')+'Include your dates or month, group size and budget if known. You can edit the details inside the form.';
  }
  if(navigator.doNotTrack==='1'||navigator.globalPrivacyControl===true)return;
  const production=location.hostname==='augurtravel.com'||location.hostname==='www.augurtravel.com';
  if(!production)return;
  const allowedSources=new Set(['google','bing','tripadvisor','safaribookings','facebook','instagram','partner','direct','other','qa']);
  let source='direct';
  const tagged=(params.get('utm_source')||'').toLowerCase();
  if(tagged){source=allowedSources.has(tagged)?tagged:'other';}
  else if(document.referrer){
    try{const host=new URL(document.referrer).hostname.toLowerCase();
      if(host===location.hostname)source='direct';
      else if(/(^|\.)google\.[a-z.]+$/.test(host))source='google';
      else if(/(^|\.)bing\.com$/.test(host))source='bing';
      else if(/(^|\.)tripadvisor\.[a-z.]+$/.test(host))source='tripadvisor';
      else if(/(^|\.)safaribookings\.com$/.test(host))source='safaribookings';
      else if(/(^|\.)facebook\.com$/.test(host))source='facebook';
      else if(/(^|\.)instagram\.com$/.test(host))source='instagram';
      else source='other';
    }catch{source='other';}
  }
  // Preserve the initial categorical source during navigation within this tab.
  // No visitor identifier, full URL or personal information is retained.
  try{if(source==='direct'&&document.referrer&&new URL(document.referrer).origin===location.origin){const previous=sessionStorage.getItem('augur-referral-category');if(allowedSources.has(previous))source=previous;}else sessionStorage.setItem('augur-referral-category',source);}catch{}
  function record(event,service=pageService){
    const body=JSON.stringify({event,service,source});
    if(navigator.sendBeacon?.('/api/marketing-event',new Blob([body],{type:'application/json'})))return;
    fetch('/api/marketing-event',{method:'POST',headers:{'Content-Type':'application/json'},body,keepalive:true,credentials:'omit'}).catch(()=>{});
  }
  record('page_view');
  if(directForm){
    if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){record('enquiry_form_view');observer.disconnect();}},{threshold:.1});observer.observe(directForm);}
    else record('enquiry_form_view');
  }
  document.addEventListener('click',event=>{
    const a=event.target.closest?.('a[href]');if(!a)return;
    const url=new URL(a.href,location.href);
    const service=serviceNames[url.searchParams.get('service')]||pageService;
    if(url.hostname==='wa.me'||url.hostname==='api.whatsapp.com')record('whatsapp_click',service);
    else if(url.protocol==='tel:')record('phone_click',service);
    else if(url.origin===location.origin&&url.pathname.replace(/\.html$/,'')==='/booking-request')record('quote_click',service);
    else if(url.origin===location.origin&&url.pathname==='/downloads/Augur_Travel_Company_Profile.pdf')record('profile_download',service);
  });
})();
