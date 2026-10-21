/* Shared enhancement; no automatic enquiry uploads or online booking confirmations. */
(() => {
  const menu=document.querySelector('.menu-toggle');
  const nav=document.querySelector('#site-nav');
  const hasExistingNavigation=!!document.querySelector('script[src^="app.js"],script[src^="homepage-layout.js"]');
  if(menu&&nav&&!hasExistingNavigation){
    menu.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');}));
  }
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav&&menu){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');}});
  const path=location.pathname.replace(/\.html$/,'').replace(/\/$/,'')||'/';
  nav?.querySelectorAll('a').forEach(a=>{if(new URL(a.href).pathname===path)a.setAttribute('aria-current','page');});
  // Any retained service form sends its actual entered details, rather than a fixed example message.
  document.querySelectorAll('form.quote-form').forEach(form=>{
    const link=form.querySelector('a[href^="https://wa.me/"]');
    if(!link)return;
    const update=()=>{const details=[...form.querySelectorAll('input,select,textarea')].map(el=>{const label=el.closest('label')?.querySelector('span')?.textContent||el.name||'Details';return label+': '+el.value.trim();}).filter(Boolean);link.href='https://wa.me/256772510411?text='+encodeURIComponent('Hello Augur Tours, '+(form.querySelector('h2')?.textContent||'travel enquiry')+'\n'+details.join('\n'));};
    form.addEventListener('input',update);form.addEventListener('change',update);update();
    form.addEventListener('submit',e=>{e.preventDefault();if(form.reportValidity())link.click();});
    link.addEventListener('click',e=>{if(!form.reportValidity())e.preventDefault();});
  });
  const homeForm=document.querySelector('#booking-enquiry-form');
  if(homeForm){
    const name=homeForm.querySelector('#contact-name'),contact=homeForm.querySelector('#contact-reach');
    if(name){name.required=true;name.maxLength=120;name.autocomplete='name';}
    if(contact){contact.required=true;contact.maxLength=180;}
    const link=homeForm.querySelector('#contact-whatsapp-link');
    link?.addEventListener('click',e=>{if(!homeForm.reportValidity())e.preventDefault();});
  }
})();
