/* ============================================================
   THE RESERVATION SHEET, shop 8.
   One flow shared by all six pages: service, day, a slot that can
   be taken, who you are, then a summary and a reference. Nothing
   is sent anywhere in the proposal, and the panel says so.
   This file is copied by tools/shop8.mjs; edit it, not the copy.
   ============================================================ */
(()=>{
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const SVC=window.RESV_SVC||[['Classic adult cut',600],['Cut, wash and massage',700],['Cut, wash and beard',900],
    ['Full service',1100],['Beard trim',250],['Beard colour',200],['Hair ornaments',100],
    ['Kids under 5',300],['Kids 6 to 12',400],['Dreadlocks',2500]];
  const SVC_TITLE=window.RESV_TITLE||'Reserve a chair', SVC_DONE=window.RESV_DONE||'The chair is held',
    SVC_PAY=window.RESV_PAY||'Payable in the chair', SVC_WITH=window.RESV_WITH||'José Luis';
  const STAFF=window.RESV_STAFF||null;
  const SLOTS=(()=>{const a=[];for(let h=9;h<20;h++){a.push(h+':00',h+':30');}return a.map(s=>s.padStart(5,'0'));})();
  const hash=s=>{let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))>>>0;return h;};
  const taken=(d,t,w)=>hash(d+t+(w||''))%5===0;
  let sheet=null, sel={n:SVC[0][0],p:SVC[0][1],d:'',t:'',w:STAFF?STAFF[0]:SVC_WITH};
  const iso=x=>x.toISOString().slice(0,10);

  function openSheet(n,p){
    if(n){ sel.n=n; sel.p=+p; }
    const today=new Date(); const tom=new Date(Date.now()+864e5);
    sel.d=sel.d||iso(tom); sel.t='';
    sheet=document.createElement('div'); sheet.className='bsheet';
    sheet.innerHTML='<div class="bsheet__bg" aria-hidden="true"></div><div class="bsheet__p" role="dialog" aria-modal="true" aria-label="Reservation"></div>';
    document.body.appendChild(sheet); document.body.style.overflow='hidden';
    sheet.querySelector('.bsheet__bg').addEventListener('click',closeSheet);
    renderSheet(iso(today));
  }
  function closeSheet(){ if(!sheet)return; sheet.remove(); sheet=null; document.body.style.overflow=''; }
  function renderSheet(min){
    const p=sheet.querySelector('.bsheet__p');
    p.innerHTML=`
      <div class="bsheet__h"><h2>${SVC_TITLE}</h2><button class="rnd" id="bx" aria-label="Close">&times;</button></div>
      <label class="bfl"><span>Service</span><select id="b-s">${SVC.map(([n,v])=>`<option value="${v}"${n===sel.n?' selected':''}>${n} &middot; ${v.toLocaleString('cs-CZ')} Kč</option>`).join('')}</select></label>
      ${STAFF?`<label class="bfl"><span>Barber</span><select id="b-w">${STAFF.map(w=>`<option${w===sel.w?' selected':''}>${w}</option>`).join('')}</select></label>`:''}
      <label class="bfl"><span>Day</span><input type="date" id="b-d" min="${min}" value="${sel.d}"></label>
      <div class="bfl"><span>Time</span><div class="bslots" id="b-t"></div></div>
      <label class="bfl"><span>Name</span><input type="text" id="b-n" placeholder="Your name" autocomplete="name"></label>
      <label class="bfl"><span>Phone</span><input type="tel" id="b-p" placeholder="+420" autocomplete="tel"></label>
      <div class="bsum" id="b-sum"></div>
      <button class="bt bt--r" id="b-go" style="width:100%;justify-content:center">Confirm the reservation</button>
      <p class="bnote">This is a proposal, so nothing is sent yet. On the live site the slot goes straight into the studio diary and you get a confirmation by text.</p>`;
    p.querySelector('#bx').addEventListener('click',closeSheet);
    const fs=p.querySelector('#b-s'), fw=p.querySelector('#b-w'), fd=p.querySelector('#b-d'), ft=p.querySelector('#b-t'),
          fn=p.querySelector('#b-n'), fp=p.querySelector('#b-p'), sum=p.querySelector('#b-sum'), go=p.querySelector('#b-go');
    const drawSlots=()=>{
      ft.innerHTML=SLOTS.map(t=>{
        const off=taken(sel.d,t,sel.w);
        return `<button class="bslot" data-t="${t}" aria-pressed="${sel.t===t}"${off?' disabled aria-label="'+t+' taken"':''}>${t}</button>`;
      }).join('');
      $$('.bslot',ft).forEach(b=>b.addEventListener('click',()=>{ sel.t=b.dataset.t; drawSlots(); drawSum(); }));
    };
    const drawSum=()=>{
      sum.innerHTML=`
        <div class="bsum__r"><span>Service</span><b>${sel.n}</b></div>
        <div class="bsum__r"><span>When</span><b>${sel.d||'pick a day'}${sel.t?', '+sel.t:''}</b></div>
        <div class="bsum__r"><span>With</span><b>${sel.w}</b></div>
        <div class="bsum__t"><span>${SVC_PAY}</span><b>${sel.p.toLocaleString('cs-CZ')} Kč</b></div>`;
      go.disabled=!(sel.t&&fn.value.trim()&&fp.value.trim());
      go.style.opacity=go.disabled?.5:1;
    };
    fs.addEventListener('change',()=>{ sel.p=+fs.value; sel.n=fs.selectedOptions[0].textContent.split(' · ')[0]; drawSum(); });
    if(fw) fw.addEventListener('change',()=>{ sel.w=fw.value; sel.t=''; drawSlots(); drawSum(); });
    fd.addEventListener('change',()=>{ sel.d=fd.value; sel.t=''; drawSlots(); drawSum(); });
    [fn,fp].forEach(f=>f.addEventListener('input',drawSum));
    go.addEventListener('click',()=>{
      const ref='MD8-'+sel.d.replace(/-/g,'').slice(4)+'-'+sel.t.replace(':','');
      p.innerHTML=`<div class="bok"><div class="bok__i">&#10003;</div>
        <h2 class="pa" style="font-size:26px">${SVC_DONE}</h2>
        <p class="bok__ref">${ref}</p>
        <p class="tx" style="margin-inline:auto">${sel.n}, ${sel.d} at ${sel.t}, with ${sel.w}. ${sel.p.toLocaleString('cs-CZ')} Kč, ${SVC_PAY.toLowerCase()}.</p>
        <p class="bnote" style="max-width:40ch;margin-inline:auto">On the live site this arrives as a confirmed slot and a text message. In the proposal it stops here.</p>
        <button class="bt bt--d" id="bok-x" style="justify-self:center">Close</button></div>`;
      p.querySelector('#bok-x').addEventListener('click',closeSheet);
    });
    drawSlots(); drawSum();
  }
  $$('[data-book]').forEach(b=>b.addEventListener('click',e=>{ e.preventDefault(); openSheet(); }));
  $$('[data-led]').forEach(row=>row.addEventListener('click',e=>{
    e.preventDefault(); openSheet(row.dataset.n,row.dataset.p);
  }));
  addEventListener('keydown',e=>{ if(e.key==='Escape')closeSheet(); });
})();
