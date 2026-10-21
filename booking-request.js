(() => {
  const form=document.querySelector('#professional-booking');if(!form)return;
  const panels=[...form.querySelectorAll('[data-booking-step]')];
  const next=document.querySelector('#booking-next'),back=document.querySelector('#booking-back'),error=document.querySelector('#booking-error');
  const steps=[...document.querySelectorAll('.enquiry-steps li')];let step=0;
  const field=n=>form.elements.namedItem(n);
  const params=new URLSearchParams(location.search);
  const service=params.get('service');if(service&&[...field('service').options].some(o=>o.value===service))field('service').value=service;
  field('trip').value=(params.get('trip')||'').slice(0,180);
  const today=new Date();const localDate=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');field('start').min=localDate;field('end').min=localDate;
  field('start').addEventListener('change',()=>{field('end').min=field('start').value||localDate;field('end').setCustomValidity('');});
  field('end').addEventListener('change',()=>field('end').setCustomValidity(''));
  field('contact').addEventListener('input',()=>field('contact').setCustomValidity(''));
  function validate(index){
    error.textContent='';
    if(index===0){field('end').setCustomValidity(field('start').value&&field('end').value&&field('end').value<field('start').value?'Please choose an end date on or after your start date.':'');}
    if(index===1){const v=field('contact').value.trim();const valid=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)||/^\+?[\d\s().-]{7,25}$/.test(v)&&v.replace(/\D/g,'').length>=7;field('contact').setCustomValidity(valid?'':'Please enter a valid email address or phone number, including country code where possible.');}
    const invalid=[...panels[index].querySelectorAll('input,select,textarea')].find(el=>!el.checkValidity());
    if(invalid){error.textContent=invalid.validationMessage;invalid.reportValidity();invalid.focus();return false;}return true;
  }
  const labels={service:'Service',trip:'Destination / trip',start:'Start date',end:'End date',adults:'Adults',children:'Children',comfort:'Travel style',budget:'Budget guide',route:'Pickup / flight / rooms',notes:'Other preferences',name:'Name',contact:'Contact',country:'Country',reply:'Preferred reply'};
  function data(){return Object.fromEntries(Object.keys(labels).map(k=>[k,field(k).value.trim()]));}
  let requestText='';
  function review(){const values=data();const root=document.querySelector('#booking-review');root.replaceChildren();for(const [key,label]of Object.entries(labels)){const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=values[key]||(['start','end'].includes(key)?'Flexible / to discuss':'Not specified');row.append(dt,dd);root.append(row);}requestText='Hello Augur Tours, please prepare a travel quotation.\n\n'+Object.entries(labels).map(([k,l])=>l+': '+(values[k]||'To discuss')).join('\n')+'\n\nPlease confirm availability, inclusions, total price and booking conditions.';document.querySelector('#booking-send-whatsapp').href='https://wa.me/256772510411?text='+encodeURIComponent(requestText);document.querySelector('#booking-send-email').href='mailto:rssempebwa@augurtravel.com?subject='+encodeURIComponent('Travel quotation request — '+values.service)+'&body='+encodeURIComponent(requestText);}
  function show(){panels.forEach((p,i)=>p.hidden=i!==step);steps.forEach((s,i)=>{if(i===step)s.setAttribute('aria-current','step');else s.removeAttribute('aria-current');});back.hidden=step===0;next.hidden=step===2;next.textContent=step===1?'Review my request →':'Continue →';error.textContent='';if(step===2)review();const legend=panels[step].querySelector('legend');legend.tabIndex=-1;legend.focus({preventScroll:true});document.querySelector('.booking-flow').scrollIntoView({behavior:'smooth',block:'start'});}
  form.addEventListener('submit',e=>{e.preventDefault();if(step<2&&validate(step)){step++;show();}});
  back.addEventListener('click',()=>{if(step>0){step--;show();}});
  document.querySelector('#booking-download').addEventListener('click',()=>{review();const url=URL.createObjectURL(new Blob([requestText],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='Augur-Travel-Enquiry.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  // Recheck all fields immediately before preparing an outgoing message.
  for(const id of ['booking-send-whatsapp','booking-send-email'])document.getElementById(id).addEventListener('click',e=>{for(let i=0;i<2;i++)if(!validate(i)){e.preventDefault();step=i;show();return;}review();});
})();
