(()=>{
  const $=s=>document.querySelector(s);
  const svc=$('#b-svc'), date=$('#b-date'), time=$('#b-time'), total=$('#b-total'),
        sum=$('#b-sum'), go=$('#b-go'), panel=$('#b-x'), row=$('#b-row'),
        name=$('#b-name'), phone=$('#b-phone'), back=$('#b-back'), confirm=$('#b-confirm');
  const iso=d=>d.toISOString().slice(0,10);
  date.min=iso(new Date());
  date.value=iso(new Date(Date.now()+864e5));

  /* the diary is deterministic, so a given day always shows the same gaps */
  const hash=s=>{let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h;};
  const slots=()=>{const a=[];for(let h=9;h<20;h++)a.push(String(h).padStart(2,'0')+':00',String(h).padStart(2,'0')+':30');return a;};
  function fillTimes(){
    const d=date.value, keep=time.value;
    time.innerHTML=slots().map(t=>{
      const off=hash(d+t)%5===0;
      return `<option value="${t}"${off?' disabled':''}>${t}${off?' taken':''}</option>`;
    }).join('');
    const ok=[...time.options].find(o=>o.value===keep&&!o.disabled)||[...time.options].find(o=>!o.disabled);
    if(ok) time.value=ok.value;
  }
  const pretty=v=>{const d=new Date(v+'T12:00:00');
    return d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'});};
  function upd(){
    const p=+svc.selectedOptions[0].dataset.p;
    total.textContent=p.toLocaleString('cs-CZ')+' Kč';
    sum.textContent=`${svc.value}, ${pretty(date.value)} at ${time.value}, with José Luis`;
  }
  svc.addEventListener('change',upd);
  time.addEventListener('change',upd);
  date.addEventListener('change',()=>{fillTimes();upd();});
  fillTimes(); upd();

  const bar=document.querySelector('.bkb');
  const phone_=()=>matchMedia('(max-width:1000px)').matches;
  const step2=on=>{ panel.hidden=!on; go.textContent=on?'Reserving':(bar.hasAttribute('data-open')||!phone_()?'Continue':'Reserve');
    if(on) name.focus(); };
  go.addEventListener('click',()=>{
    if(phone_()&&!bar.hasAttribute('data-open')){ bar.setAttribute('data-open',''); go.textContent='Continue'; return; }
    step2(true);
  });
  back.addEventListener('click',()=>step2(false));
  confirm.addEventListener('click',()=>{
    if(!name.value.trim()||!phone.value.trim()){ (name.value.trim()?phone:name).focus(); return; }
    const ref='MD8-'+date.value.replace(/-/g,'').slice(4)+'-'+time.value.replace(':','');
    panel.hidden=true;
    row.className='w bkb__ok';
    row.innerHTML=`<b>${ref}</b><span>${svc.value}, ${pretty(date.value)} at ${time.value}. ${name.value.trim()}, we hold the chair.</span>`+
      `<span style="opacity:.6">Proposal only, nothing was sent.</span>`;
  });
})();
