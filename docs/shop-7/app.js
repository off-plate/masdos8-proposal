(()=>{
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const still=matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  /* ---------- the reservation sheet ----------
     A real flow: service, day, a slot that can be taken, who you are,
     then a summary and a reference. Nothing is sent anywhere in the
     proposal, and the panel says so. */
  const SVC=window.RESV_SVC||[['Classic adult cut',600],['Cut, wash and massage',700],['Cut, wash and beard',900],['Full service',1100],
    ['Beard trim',250],['Beard colour',200],['Hair ornaments',100],['Kids under 5',300],['Kids 6 to 12',400],['Dreadlocks',2500]];
  const SVC_TITLE=window.RESV_TITLE||'Reserve a chair', SVC_DONE=window.RESV_DONE||'The chair is held',
    SVC_PAY=window.RESV_PAY||'Payable in the chair';
  const SLOTS=(()=>{const a=[];for(let h=9;h<20;h++){a.push(h+':00',h+':30');}return a.map(s=>s.padStart(5,'0'));})();
  const hash=s=>{let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h;};
  const taken=(d,t)=>hash(d+t)%5===0;      /* deterministic, so a day always looks the same */
  let sheet=null, sel={n:SVC[0][0],p:SVC[0][1],d:'',t:''};

  const iso=x=>x.toISOString().slice(0,10);
  function openSheet(n,p){
    if(n){ sel.n=n; sel.p=+p; }
    const today=new Date(); const tom=new Date(Date.now()+864e5);
    sel.d=sel.d||iso(tom); sel.t='';
    sheet=document.createElement('div'); sheet.className='sheet';
    sheet.innerHTML='<div class="sheet__bg" aria-hidden="true"></div><div class="sheet__p" role="dialog" aria-modal="true" aria-label="Reservation"></div>';
    document.body.appendChild(sheet); document.body.style.overflow='hidden';
    sheet.querySelector('.sheet__bg').addEventListener('click',closeSheet);
    renderSheet(iso(today));
  }
  function closeSheet(){ if(!sheet)return; sheet.remove(); sheet=null; document.body.style.overflow=''; }
  function renderSheet(min){
    const p=sheet.querySelector('.sheet__p');
    p.innerHTML=`
      <div class="sheet__h"><h2>${SVC_TITLE}</h2><button class="rnd" id="sx" aria-label="Close">&times;</button></div>
      <label class="fl"><span>Service</span><select id="f-s">${SVC.map(([n,v])=>`<option value="${v}"${n===sel.n?' selected':''}>${n} &middot; ${v.toLocaleString('cs-CZ')} Kč</option>`).join('')}</select></label>
      <label class="fl"><span>Day</span><input type="date" id="f-d" min="${min}" value="${sel.d}"></label>
      <div class="fl"><span>Time</span><div class="slots" id="f-t"></div></div>
      <label class="fl"><span>Name</span><input type="text" id="f-n" placeholder="Your name" autocomplete="name"></label>
      <label class="fl"><span>Phone</span><input type="tel" id="f-p" placeholder="+420" autocomplete="tel"></label>
      <div class="sum" id="f-sum"></div>
      <button class="bt bt--g" id="f-go" style="width:100%">Confirm the reservation</button>
      <p class="note">This is a proposal, so nothing is sent yet. On the live site the slot goes straight into the studio diary and you get a confirmation by text.</p>`;
    p.querySelector('#sx').addEventListener('click',closeSheet);
    const fs=p.querySelector('#f-s'), fd=p.querySelector('#f-d'), ft=p.querySelector('#f-t'),
          fn=p.querySelector('#f-n'), fp=p.querySelector('#f-p'), sum=p.querySelector('#f-sum'), go=p.querySelector('#f-go');
    const drawSlots=()=>{
      ft.innerHTML=SLOTS.map(t=>{
        const off=taken(sel.d,t);
        return `<button class="slot" data-t="${t}" aria-pressed="${sel.t===t}"${off?' disabled aria-label="'+t+' taken"':''}>${t}</button>`;
      }).join('');
      $$('.slot',ft).forEach(b=>b.addEventListener('click',()=>{ sel.t=b.dataset.t; drawSlots(); drawSum(); }));
    };
    const drawSum=()=>{
      sum.innerHTML=`
        <div class="sum__r"><span>Service</span><b>${sel.n}</b></div>
        <div class="sum__r"><span>When</span><b>${sel.d||'pick a day'}${sel.t?', '+sel.t:''}</b></div>
        <div class="sum__r"><span>With</span><b>José Luis</b></div>
        <div class="sum__t"><span>${SVC_PAY}</span><b>${sel.p.toLocaleString('cs-CZ')} Kč</b></div>`;
      go.disabled=!(sel.t&&fn.value.trim()&&fp.value.trim());
      go.style.opacity=go.disabled?.5:1;
    };
    fs.addEventListener('change',()=>{ sel.p=+fs.value; sel.n=fs.selectedOptions[0].textContent.split(' · ')[0]; drawSum(); });
    fd.addEventListener('change',()=>{ sel.d=fd.value; sel.t=''; drawSlots(); drawSum(); });
    [fn,fp].forEach(f=>f.addEventListener('input',drawSum));
    go.addEventListener('click',()=>{
      const ref='MD8-'+sel.d.replace(/-/g,'').slice(4)+'-'+sel.t.replace(':','');
      p.innerHTML=`<div class="ok"><div class="ok__i">&#10003;</div>
        <h2 class="cl" style="font-size:28px">${SVC_DONE}</h2>
        <p class="ok__ref">${ref}</p>
        <p class="tx" style="margin-inline:auto">${sel.n}, ${sel.d} at ${sel.t}, with José Luis. ${sel.p.toLocaleString('cs-CZ')} Kč, ${SVC_PAY.toLowerCase()}.</p>
        <p class="note" style="max-width:40ch;margin-inline:auto">On the live site this arrives as a confirmed slot and a text message. In the proposal it stops here.</p>
        <button class="bt bt--o" id="ok-x" style="justify-self:center">Close</button></div>`;
      p.querySelector('#ok-x').addEventListener('click',closeSheet);
    });
    drawSlots(); drawSum();
  }
  $$('[data-book]').forEach(b=>b.addEventListener('click',()=>openSheet()));
  addEventListener('keydown',e=>{ if(e.key==='Escape'){closeLb();closeSheet();}
    if(lb&&e.key==='ArrowRight'){li=(li+1)%shots.length;draw();}
    if(lb&&e.key==='ArrowLeft'){li=(li-1+shots.length)%shots.length;draw();} });
})();
