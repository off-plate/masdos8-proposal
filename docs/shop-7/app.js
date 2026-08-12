(()=>{
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const still=matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- the service switcher, in the nav ---------- */
  const sw=$('[data-sw]');
  if(sw){
    const swb=$('.sw__b',sw), swp=$('.sw__p',sw);
    const openSw=on=>{ swp.hidden=!on; swb.setAttribute('aria-expanded',String(on));
      sw.toggleAttribute('data-open',on); if(on) $('.sw__i',swp).focus(); };
    swb.addEventListener('click',e=>{ e.stopPropagation(); openSw(swp.hidden); });
    document.addEventListener('click',e=>{ if(!swp.hidden && !e.target.closest('[data-sw]')) openSw(false); });
    addEventListener('keydown',e=>{ if(e.key==='Escape' && !swp.hidden){ openSw(false); swb.focus(); } });
    swp.addEventListener('keydown',e=>{
      const items=$$('a',swp), i=items.indexOf(document.activeElement);
      if(e.key==='ArrowDown'){ e.preventDefault(); items[(i+1)%items.length].focus(); }
      if(e.key==='ArrowUp'){ e.preventDefault(); items[(i-1+items.length)%items.length].focus(); }
    });
  }

  /* ---------- the map stays locked until clicked, so it never eats the page scroll ---------- */
  const mapEl=$('.map');
  if(mapEl){
    const lock=$('.map__lock',mapEl);
    lock.addEventListener('click',()=>{ mapEl.classList.add('on'); });
    mapEl.addEventListener('mouseleave',()=>{ mapEl.classList.remove('on'); });
  }

  /* ---------- gallery lightbox ---------- */
  const galBtns=$$('#gal button');
  const shots=galBtns.map(b=>({big:$('img',b).src.replace('-s.webp','.webp'),alt:$('img',b).alt,cap:$('figcaption',b).textContent}));
  let lb=null,li=0;
  const draw=()=>{ $('img',lb).src=shots[li].big; $('img',lb).alt=shots[li].alt;
    $('.cnt',lb).textContent=String(li+1).padStart(2,'0')+' / '+String(shots.length).padStart(2,'0'); };
  const openLb=i=>{
    li=i; lb=document.createElement('div'); lb.className='lb'; lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true');
    lb.innerHTML='<img alt=""><button class="rnd lb__x" aria-label="Close">&times;</button>'+
      '<div class="lb__b"><button class="rnd" data-d="-1" aria-label="Previous image">&larr;</button>'+
      '<span class="cnt"></span><button class="rnd" data-d="1" aria-label="Next image">&rarr;</button></div>';
    document.body.appendChild(lb); document.body.style.overflow='hidden'; draw();
    $('.lb__x',lb).focus();
    lb.addEventListener('click',e=>{
      const d=e.target.closest('[data-d]');
      if(d){ li=(li+ +d.dataset.d+shots.length)%shots.length; draw(); return; }
      if(e.target.closest('.lb__x')||e.target===lb) closeLb();
    });
  };
  const closeLb=()=>{ if(!lb)return; lb.remove(); lb=null; document.body.style.overflow=''; };
  galBtns.forEach((b,i)=>b.addEventListener('click',()=>openLb(i)));

  /* ---------- services: hover swaps the photograph ---------- */
  const imgs=$$('.svc__r img'), nm=$('#svcn'), xx=$('#svcx');
  const pick=nm?row=>{
    $$('.sr').forEach(r=>r.classList.toggle('on',r===row));
    const k=row.dataset.img;
    imgs.forEach(m=>m.classList.toggle('on',m.dataset.k===k));
    nm.textContent=row.dataset.n;
    xx.textContent=(+row.dataset.p).toLocaleString('cs-CZ')+' Kč';
  }:()=>{};
  $$('.sr').forEach(row=>{
    row.addEventListener('mouseenter',()=>pick(row));
    row.addEventListener('focus',()=>pick(row));
    row.addEventListener('click',()=>openSheet(row.dataset.n,row.dataset.p));
  });

  /* ---------- reviews: advances itself, stops when you touch it ---------- */
  const qs=$$('.rv__s'), rvc=$('#rvc'), rvp=$('#rvp'), rv=$('#rv'); let ri=0, timer=null;
  const DUR=5000;
  const show=i=>{ if(!qs.length)return; ri=(i+qs.length)%qs.length;
    qs.forEach((q,n)=>q.classList.toggle('on',n===ri));
    rvc.textContent=String(ri+1).padStart(2,'0')+' / '+String(qs.length).padStart(2,'0');
    if(rvp){ rvp.style.transition='none'; rvp.style.width='0%';
      requestAnimationFrame(()=>{ if(still||!timer)return; rvp.style.transition='width '+DUR+'ms linear'; rvp.style.width='100%'; }); }
  };
  const start=()=>{ if(still||timer)return; timer=setInterval(()=>show(ri+1),DUR); show(ri); };
  const stop=()=>{ clearInterval(timer); timer=null; if(rvp){rvp.style.transition='none';} };
  if(rv){
    $('#rvnext').addEventListener('click',()=>{stop();show(ri+1);});
    $('#rvprev').addEventListener('click',()=>{stop();show(ri-1);});
    rv.addEventListener('mouseenter',stop); rv.addEventListener('focusin',stop);
    rv.addEventListener('mouseleave',start);
    if(!still){ const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?start():stop()),{threshold:.3}); io.observe(rv); }
    show(0);
  }

  /* ============================================================
     THE RESERVATION WIZARD.
     Deliberately not shop 8's single always-visible panel: one
     question at a time. Pick the service, then who and when, then
     say who you are. Nothing is sent anywhere in the proposal.
     ============================================================ */
  const SVC=window.RESV_SVC||[['Classic adult cut',600],['Cut, wash and massage',700],['Cut, wash and beard',900],['Full service',1100],
    ['Beard trim',250],['Beard colour',200],['Hair ornaments',100],['Kids under 5',300],['Kids 6 to 12',400],['Dreadlocks',2500]];
  const SVC_TITLE=window.RESV_TITLE||'Reserve a chair', SVC_DONE=window.RESV_DONE||'The chair is held',
    SVC_PAY=window.RESV_PAY||'Payable in the chair';
  const STAFF=window.RESV_STAFF||null;
  const SLOTS=(()=>{const a=[];for(let h=9;h<20;h++){a.push(h+':00',h+':30');}return a.map(s=>s.padStart(5,'0'));})();
  const hash=s=>{let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h;};
  const taken=(d,t,w)=>hash(d+t+(w||''))%5===0;
  const DOW=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const iso=x=>x.toISOString().slice(0,10);
  const days=(()=>{const a=[];for(let i=0;i<14;i++){const d=new Date(Date.now()+i*864e5);a.push({iso:iso(d),dow:DOW[d.getDay()],date:d.getDate()});}return a;})();

  let wiz=null, step=0, sel={n:SVC[0][0],p:SVC[0][1],w:STAFF?STAFF[0]:null,d:days[1].iso,t:''};

  function openSheet(n,p){
    if(n){ sel.n=n; sel.p=+p; }
    step=0;
    wiz=document.createElement('div'); wiz.className='wiz'; wiz.setAttribute('role','dialog'); wiz.setAttribute('aria-modal','true'); wiz.setAttribute('aria-label','Reservation');
    wiz.innerHTML='<div class="wiz__card"><button class="rnd wiz__x" id="wx" aria-label="Close">&times;</button>'+
      '<div class="wiz__prog" id="wp"></div><div id="wbody"></div></div>';
    document.body.appendChild(wiz); document.body.style.overflow='hidden';
    wiz.addEventListener('click',e=>{ if(e.target===wiz) closeSheet(); });
    wiz.querySelector('#wx').addEventListener('click',closeSheet);
    renderWiz();
  }
  function closeSheet(){ if(!wiz)return; wiz.remove(); wiz=null; document.body.style.overflow=''; }

  function stepService(){
    return `<p class="wiz__k">Step 1 of 3</p><h2 class="wiz__h">What are you here for?</h2>
      <div class="wiz__svc">${SVC.map(([n,v])=>
        `<button class="wiz__c" data-n="${n}" data-p="${v}" aria-pressed="${n===sel.n}"><b>${n}</b><span></span><em>${v.toLocaleString('cs-CZ')} Kč</em></button>`).join('')}</div>
      <div class="wiz__nav"><button class="bt bt--g" id="wnext">Continue</button></div>`;
  }
  function stepWhen(){
    return `<p class="wiz__k">Step 2 of 3</p><h2 class="wiz__h">Who, and when?</h2>
      ${STAFF?`<div class="wiz__who">${STAFF.map(w=>`<button class="wiz__wb" data-w="${w}" aria-pressed="${w===sel.w}">${w}</button>`).join('')}</div>`:''}
      <div class="wiz__days">${days.map(d=>`<button class="wiz__d" data-d="${d.iso}" aria-pressed="${d.iso===sel.d}"><span>${d.dow}</span><b>${d.date}</b></button>`).join('')}</div>
      <div class="slots" id="wt"></div>
      <div class="wiz__nav"><button class="bt bt--o" id="wback">Back</button><button class="bt bt--g" id="wnext">Continue</button></div>`;
  }
  function stepYou(){
    return `<p class="wiz__k">Step 3 of 3</p><h2 class="wiz__h">Who do we expect?</h2>
      <div class="wiz__fl2">
        <label class="fl"><span>Name</span><input type="text" id="wn" placeholder="Your name" autocomplete="name"></label>
        <label class="fl"><span>Phone</span><input type="tel" id="wph" placeholder="+420" autocomplete="tel"></label>
      </div>
      <div class="sum" id="wsum"></div>
      <div class="wiz__nav"><button class="bt bt--o" id="wback">Back</button><button class="bt bt--g" id="wgo">Confirm the reservation</button></div>
      <p class="note" style="margin-top:14px">This is a proposal, so nothing is sent yet. On the live site the slot goes straight into the studio diary and you get a confirmation by text.</p>`;
  }

  function renderWiz(){
    const card=wiz.querySelector('.wiz__card'), prog=wiz.querySelector('#wp'), body=wiz.querySelector('#wbody');
    prog.innerHTML=[0,1,2].map(i=>`<i class="${i<step?'done':i===step?'on':''}"><b></b></i>`).join('');
    body.innerHTML = step===0?stepService(): step===1?stepWhen(): stepYou();
    card.scrollTop=0;

    if(step===0){
      $$('.wiz__c',body).forEach(c=>c.addEventListener('click',()=>{
        sel.n=c.dataset.n; sel.p=+c.dataset.p;
        $$('.wiz__c',body).forEach(x=>x.setAttribute('aria-pressed',String(x===c)));
      }));
      $('#wnext',body).addEventListener('click',()=>{ step=1; renderWiz(); });
    }
    if(step===1){
      $('#wback',body).addEventListener('click',()=>{ step=0; renderWiz(); });
      $('#wnext',body).addEventListener('click',()=>{ if(sel.t){ step=2; renderWiz(); } });
      if(STAFF) $$('.wiz__wb',body).forEach(b=>b.addEventListener('click',()=>{
        sel.w=b.dataset.w; sel.t=''; $$('.wiz__wb',body).forEach(x=>x.setAttribute('aria-pressed',String(x===b))); drawSlots();
      }));
      $$('.wiz__d',body).forEach(d=>d.addEventListener('click',()=>{
        sel.d=d.dataset.d; sel.t=''; $$('.wiz__d',body).forEach(x=>x.setAttribute('aria-pressed',String(x===d))); drawSlots();
      }));
      var drawSlots=()=>{
        const ft=$('#wt',body);
        ft.innerHTML=SLOTS.map(t=>{
          const off=taken(sel.d,t,sel.w);
          return `<button class="slot" data-t="${t}" aria-pressed="${sel.t===t}"${off?' disabled aria-label="'+t+' taken"':''}>${t}</button>`;
        }).join('');
        $$('.slot',ft).forEach(b=>b.addEventListener('click',()=>{
          sel.t=b.dataset.t; $$('.slot',ft).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
          $('#wnext',body).disabled=false; $('#wnext',body).style.opacity=1;
        }));
        const go=$('#wnext',body); go.disabled=!sel.t; go.style.opacity=sel.t?1:.5;
      };
      drawSlots();
    }
    if(step===2){
      $('#wback',body).addEventListener('click',()=>{ step=1; renderWiz(); });
      const wn=$('#wn',body), wph=$('#wph',body), sum=$('#wsum',body), go=$('#wgo',body);
      const dObj=days.find(d=>d.iso===sel.d);
      const drawSum=()=>{
        sum.innerHTML=`
          <div class="sum__r"><span>Service</span><b>${sel.n}</b></div>
          <div class="sum__r"><span>When</span><b>${dObj?dObj.dow+' '+dObj.date:sel.d}, ${sel.t}</b></div>
          <div class="sum__r"><span>With</span><b>${sel.w||'José Luis'}</b></div>
          <div class="sum__t"><span>${SVC_PAY}</span><b>${sel.p.toLocaleString('cs-CZ')} Kč</b></div>`;
        go.disabled=!(wn.value.trim()&&wph.value.trim());
        go.style.opacity=go.disabled?.5:1;
      };
      [wn,wph].forEach(f=>f.addEventListener('input',drawSum));
      go.addEventListener('click',()=>{
        const ref='MD8-'+sel.d.replace(/-/g,'').slice(4)+'-'+sel.t.replace(':','');
        const who=sel.w||'José Luis';
        wiz.querySelector('.wiz__card').innerHTML=`<div class="ok"><div class="ok__i">&#10003;</div>
          <h2 class="cl" style="font-size:28px">${SVC_DONE}</h2>
          <p class="ok__ref">${ref}</p>
          <p class="tx" style="margin-inline:auto">${sel.n}, ${dObj?dObj.dow+' '+dObj.date:sel.d} at ${sel.t}, with ${who}. ${sel.p.toLocaleString('cs-CZ')} Kč, ${SVC_PAY.toLowerCase()}.</p>
          <p class="note" style="max-width:40ch;margin-inline:auto">On the live site this arrives as a confirmed slot and a text message. In the proposal it stops here.</p>
          <button class="bt bt--o" id="ok-x" style="justify-self:center">Close</button></div>`;
        wiz.querySelector('#ok-x').addEventListener('click',closeSheet);
      });
      drawSum();
    }
  }
  $$('[data-book]').forEach(b=>b.addEventListener('click',()=>openSheet()));
  addEventListener('keydown',e=>{ if(e.key==='Escape'){closeLb();closeSheet();}
    if(lb&&e.key==='ArrowRight'){li=(li+1)%shots.length;draw();}
    if(lb&&e.key==='ArrowLeft'){li=(li-1+shots.length)%shots.length;draw();} });
})();
