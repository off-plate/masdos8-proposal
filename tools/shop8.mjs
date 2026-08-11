/* ============================================================
   SHOP 8 BUILD.
   Three pages, one template. The service switcher, the stage, the
   step rows, the ledger and the footer are defined once here and
   emitted into every page, so "make the switcher say X" is one edit.
   node tools/shop8.mjs
   ============================================================ */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'docs', 'shop-8');

/* ---------- the three services. This list IS the switcher. ---------- */
const SERVICES = [
  { k: 'barber', href: '', name: 'Barbershop', blurb: 'Cuts, beards, kids', from: 100 },
  { k: 'tattoo', href: 'tattoo/', name: 'Tattoo', blurb: 'Small pieces to full backs', from: 600 },
  { k: 'pmu', href: 'pmu/', name: 'Permanent makeup', blurb: 'Brows, lips, eyeliner', from: 1500 }
];

const czk = n => n.toLocaleString('cs-CZ').replace(/ /g, ' ');

/* ---------- page content ---------- */
const PAGES = {
  barber: {
    out: 'index.html', base: '', up: '../',
    title: 'MasDos8 Barbershop, Prague 4. Sit down',
    desc: 'Barbershop on Nuselska, Prague 4. Classic cut 600 CZK. 4.8 from 225 Google reviews. Golden Company 2025.',
    stage: [
      ['Sit down', 'One chair, one man, and a price list you can read before you commit to anything.'],
      ['The list', 'Ten services, ten numbers, all of them published by the shop itself.'],
      ['The work', 'Cuts out of this room, and the room they came out of.'],
      ['The room', 'Nuselská 133/134. Four point eight from two hundred and twenty five people.'],
      ['Come in', 'Open from nine, every day of the week.']
    ],
    photos: ['jose.webp', 'cut9.webp', 'cut6.webp', 'shop1.webp', 'cut2.webp'],
    alts: ['José Luis', 'A cut in progress', 'Finishing the fade', 'The room on Nuselská', 'Detail'],
    steps: [
      { n: '01', kk: 'The barber', h: 'You are booking <i>a person</i>, not a slot',
        p: 'José Luis cuts, shapes and finishes. He also tattoos and does permanent makeup, which is unusual and is the reason people describe him as an artist rather than a barber. Nobody hands you on halfway through.',
        facts: [['225', 'People left a review', 1], ['1752', 'Follow on Instagram', 1], ['13 h', 'Open, every day', 0]] },
      { n: '02', kk: 'The list', h: 'Every price, <i>before</i> you sit',
        led: [['Classic adult cut', 'Contours, brows, ears, cologne and a drink', 600], ['Cut, wash and massage', '', 700],
              ['Cut, wash and beard', '', 900], ['Full service', 'Everything together, unhurried', 1100],
              ['Beard trim', 'Plus a drink on the house', 250], ['Beard colour', '', 200], ['Hair ornaments', '', 100],
              ['Kids under 5', 'Free coffee for the parent', 300], ['Kids 6 to 12', '', 400], ['Dreadlocks', '', 2500]] },
      { n: '03', kk: 'The work', h: 'Out of <i>this room</i>', p: 'Drag sideways.',
        strip: ['cut2-s.webp', 'cut6-s.webp', 'cut8-s.webp', 'cut9-s.webp', 'cut10-s.webp', 'fade-s.webp'] },
      { n: '04', kk: '4.8 from 225 on Google', h: 'What they <i>actually</i> wrote',
        qs: [['Best barbershop I\'ve been. Jose Luis knows what he is doing, the hair and beard looks amazing.', 'Rafael Frías'],
             ['If you are a man worth your beard, you must visit José. This is the first time I\'ve come out of a barbershop happy.', 'Swatchhanda Kher'],
             ['Been getting my haircuts and beard maintenance with Jose for more than 4 years. Excellent and quick service.', 'Alberto Alvarez']] },
      { n: '05', kk: 'Getting there', h: 'Nuselská 133/134, <i>Prague 4</i>', id: 'book',
        p: 'Open every day from nine in the morning. Call ahead on a first visit and José meets you at the door. Tattoo and permanent makeup are booked the same way, in the same rooms.' }
    ]
  },

  tattoo: {
    out: 'tattoo/index.html', base: '../', up: '../../',
    title: 'MasDos8 Tattoo, Prague 4. Consultation first, needle after',
    desc: 'Tattoo studio on Nuselska, Prague 4. Small piece from 600 CZK, large areas 18 000 CZK. 4.8 from 225 Google reviews.',
    stage: [
      ['Hold still', 'The same hands that cut hair all week. Consultation first, then a date, then the needle.'],
      ['The list', 'Five sizes, five numbers, published by the studio before you walk in.'],
      ['The work', 'Pieces that left this room, photographed the day they were finished.'],
      ['The room', 'Nuselská 133/134, behind the barber chairs, same door.'],
      ['Come in', 'Call and the consultation is usually the same week.']
    ],
    photos: ['tat1.webp', 'tat2.webp', 'tat3.webp', 'tat4.webp', 'shop2.webp'],
    alts: ['A tattoo by José Luis', 'Line work', 'A finished piece', 'Shading', 'The studio'],
    steps: [
      { n: '01', kk: 'The artist', h: 'The barber <i>is</i> the tattooist',
        p: 'José Luis does both, in the same rooms, on the same day if the diary allows. Customers who came in for a fade end up booking a piece, which is the whole reason this shop is two trades under one badge. Every piece starts with a consultation, and the consultation is free.',
        facts: [['600', 'A small piece, from', 0], ['18 000', 'A back, arms or legs', 0], ['0', 'Cost of the consultation', 0]] },
      { n: '02', kk: 'The list', h: 'Priced by <i>size</i>, not by the hour',
        led: [['Small piece', 'Lettering, a symbol, something you can cover with a hand', 600],
              ['Medium piece', 'A forearm, a shoulder, a calf', 3000],
              ['Large piece', 'A chest panel or a full forearm sleeve', 6000],
              ['Half sleeve', 'Shoulder to elbow, usually across two sittings', 6000],
              ['Large areas', 'Back, both arms, legs, body work', 18000]] },
      { n: '03', kk: 'The work', h: 'Left <i>this room</i>', p: 'Drag sideways.',
        strip: ['tat1-s.webp', 'tat2-s.webp', 'tat3-s.webp', 'tat4-s.webp'] },
      { n: '04', kk: '4.8 from 225 on Google', h: 'What they <i>actually</i> wrote',
        qs: [['Quick, clean, and he captured exactly what we had in mind. We called him in the morning and had our tattoo by the afternoon.', 'Adriana Hernandez'],
             ['If you want a tattoo, a haircut, or eyebrow shaping, there is no place more magical. José Luis is a highly skilled professional.', 'Cristina'],
             ['I got my lips done and a tattoo, and it truly exceeded my expectations. The tattoo turned out perfectly, just as I wanted.', 'Yannely De Los Santos Vilaseca']] },
      { n: '05', kk: 'Getting there', h: 'Nuselská 133/134, <i>Prague 4</i>', id: 'book',
        p: 'Bring a reference, a rough idea, or nothing at all. The consultation sets the size, the size sets the price, and the price does not move afterwards.' }
    ]
  },

  pmu: {
    out: 'pmu/index.html', base: '../', up: '../../',
    title: 'MasDos8 Permanent makeup, Prague 4. Brows, lips, eyeliner',
    desc: 'Permanent makeup on Nuselska, Prague 4. Brows 3 500 CZK, full lips 5 000 CZK, repairs 3 000 CZK.',
    stage: [
      ['Look up', 'Brows, lips and eyeliner, done by the owner, in a room that has been doing faces for years.'],
      ['The list', 'Seven treatments, seven numbers, including the repair.'],
      ['The work', 'Healed results, not the day-one photographs.'],
      ['The room', 'Nuselská 133/134, the quiet end of the studio.'],
      ['Come in', 'A patch test and a shape drawn on before anything is permanent.']
    ],
    photos: ['pmu1.webp', 'pmu2.webp', 'pmu3.webp', 'pmu4.webp', 'shop1.webp'],
    alts: ['Brows by José Luis', 'Lip work', 'Eyeliner', 'A healed result', 'The studio'],
    steps: [
      { n: '01', kk: 'Who does it', h: 'The <i>owner</i> holds the needle',
        p: 'José Luis does the permanent makeup himself, microblading and eyeliner included. Two customers name him by name for it in their reviews, which matters more here than anywhere else on this site, because this is the one service you cannot wash off on the way home.',
        facts: [['1 500', 'Upper eyeliner, from', 0], ['3 500', 'Brows', 0], ['3 000', 'Repairing another studio', 0]] },
      { n: '02', kk: 'The list', h: 'Including the <i>repair</i>',
        led: [['Brows', 'Microblading, shape drawn and agreed before any pigment', 3500],
              ['Full lips', 'Contour and fill together', 5000],
              ['Lip fill', '', 3500],
              ['Lip contour', '', 2000],
              ['Upper and lower eyeliner', '', 2000],
              ['Upper eyeliner', '', 1500],
              ['Repair of earlier work', 'Correcting permanent makeup done in another studio', 3000]] },
      { n: '03', kk: 'The work', h: 'Healed, <i>not day one</i>', p: 'Drag sideways.',
        strip: ['pmu1-s.webp', 'pmu2-s.webp', 'pmu3-s.webp', 'pmu4-s.webp'] },
      { n: '04', kk: '4.8 from 225 on Google', h: 'What they <i>actually</i> wrote',
        qs: [['Professional approach. Permanent makeup, specifically eyebrow shaping, done perfectly. I recommend it to everyone.', 'Jana Králová'],
             ['I had microblading and eyeliner done with him and the result is stunning. Natural, flattering and perfectly executed.', 'Mia Hurtado de Mendoza'],
             ['I got my lips done and it exceeded my expectations. My lips look beautiful and natural.', 'Yannely De Los Santos Vilaseca']] },
      { n: '05', kk: 'Getting there', h: 'Nuselská 133/134, <i>Prague 4</i>', id: 'book',
        p: 'The shape is drawn on and agreed with you before any pigment goes in. If you already have work from somewhere else, bring it, the repair is priced on the list like everything else.' }
    ]
  }
};

/* ---------- components, defined once ---------- */
const switcher = (cur, base) => `
  <div class="sw" data-sw>
    <button class="sw__b" aria-expanded="false" aria-haspopup="true" id="swb">
      <span class="sw__k">Service</span>
      <span class="sw__t">${SERVICES.find(s => s.k === cur).name}</span>
      <svg class="sw__c" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
    </button>
    <div class="sw__p" hidden role="menu" aria-labelledby="swb">
      ${SERVICES.map(s => `<a class="sw__i${s.k === cur ? ' on' : ''}" role="menuitem" href="${(base + s.href) || './'}"${s.k === cur ? ' aria-current="page"' : ''}>
        <b>${s.name}</b><span>${s.blurb} &middot; from ${czk(s.from)} Kč</span></a>`).join('\n      ')}
      <a class="sw__all" role="menuitem" href="${base}../gate-2/">All three, from the start &rarr;</a>
    </div>
  </div>`;

const ledger = rows => `<div class="led">${rows.map(([n, x, p]) =>
  `<a href="#book"><span>${n}${x ? `<em>${x}</em>` : ''}</span><b>${czk(p)}</b></a>`).join('')}</div>`;

const step = (s, base) => `
    <section class="step" data-stage="${+s.n - 1}"${s.id ? ` id="${s.id}"` : ''}>
      <span class="step__n">${s.n}</span>
      <p class="kk">${s.kk}</p>
      <h2>${s.h}</h2>
      ${s.p ? `<p class="tx"${s.strip ? ' style="margin-bottom:20px"' : ''}>${s.p}</p>` : ''}
      ${s.facts ? `<div class="facts" style="margin-top:22px">${s.facts.map(([v, l, num]) =>
        `<div><b${num ? ` class="num" data-count="${String(v).replace(/\s/g, '')}"` : ''}>${num ? '0' : v}</b><span>${l}</span></div>`).join('')}</div>` : ''}
      ${s.led ? ledger(s.led) : ''}
      ${s.strip ? `<div class="strip" data-drag>${s.strip.map(f =>
        `<figure><img src="${base}img/${f}" alt="" loading="lazy"></figure>`).join('')}</div>` : ''}
      ${s.qs ? `<div class="qs">${s.qs.map(([q, who]) =>
        `<blockquote><p>"${q}"</p><cite>${who}</cite></blockquote>`).join('')}</div>` : ''}
      ${s.id === 'book' ? `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:22px">
        <a class="bt bt--r" href="tel:+420773267463">+420 773 267 463</a>
        <a class="bt bt--d" href="https://maps.google.com/?cid=10234528977070182464" target="_blank" rel="noopener">Directions</a>
        <a class="bt bt--d" href="https://www.instagram.com/masdos8/" target="_blank" rel="noopener">Instagram</a>
      </div>` : ''}
    </section>`;

const page = (key) => {
  const d = PAGES[key], B = d.base;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${d.title}</title>
<meta name="description" content="${d.desc}">
<meta name="robots" content="noindex,nofollow">
<link rel="preload" href="${B}fonts/panchang-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${B}fonts/ranade-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="icon" href="${B}img/logo.png">
<style>
/* ============================================================
   SHOP 8. A fixed left stage and a scrolling right column.
   The photograph never scrolls: it cross-fades as you move through
   the sections, and the booking action is pinned to it.
   Generated by tools/shop8.mjs. Edit that, not this.
   ============================================================ */
@font-face{font-family:'Pa';src:url('${B}fonts/panchang-600.woff2') format('woff2');font-weight:600;font-display:swap}
@font-face{font-family:'Pa';src:url('${B}fonts/panchang-700.woff2') format('woff2');font-weight:700;font-display:swap}
@font-face{font-family:'Ra';src:url('${B}fonts/ranade-400.woff2') format('woff2');font-weight:400;font-display:swap}
@font-face{font-family:'Ra';src:url('${B}fonts/ranade-500.woff2') format('woff2');font-weight:500;font-display:swap}
@font-face{font-family:'Ra';src:url('${B}fonts/ranade-700.woff2') format('woff2');font-weight:700;font-display:swap}
:root{--bk:#0E0D0C;--bk2:#171514;--paper:#EDE7DC;--paper2:#E2DACC;
 --ink:#14120F;--ink-d:#6A6459;--red:#B4322A;--red2:#D2453B;
 --ln:rgba(20,18,15,.16);--ez:cubic-bezier(.22,.75,.28,1)}
*{margin:0;box-sizing:border-box}[hidden]{display:none!important}
html{scroll-behavior:smooth}
body{background:var(--paper);color:var(--ink);font-family:'Ra',Georgia,serif;font-size:16.5px;line-height:1.62;
 -webkit-font-smoothing:antialiased;overflow-x:hidden}
img{max-width:100%;display:block}a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}
:focus-visible{outline:2px solid var(--red);outline-offset:3px}
::selection{background:var(--red);color:var(--paper)}
.pa{font-family:'Pa',system-ui,sans-serif;font-weight:700;text-transform:uppercase;line-height:.94;letter-spacing:-.01em}
.tx{color:var(--ink-d);max-width:50ch}
.kk{font-family:'Pa',sans-serif;font-weight:600;font-size:10.5px;letter-spacing:.3em;text-transform:uppercase;color:var(--red)}

/* ---------- THE SPLIT ---------- */
.split{display:grid;grid-template-columns:minmax(0,44fr) minmax(0,56fr);min-height:100dvh}
.stage{position:sticky;top:0;height:100dvh;background:var(--bk);overflow:hidden;isolation:isolate}
.stage__ph{position:absolute;inset:0}
.stage__ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 22%;
 opacity:0;transition:opacity 1s var(--ez),transform 6s linear;transform:scale(1.04)}
.stage__ph img.on{opacity:1;transform:scale(1)}
.stage::after{content:'';position:absolute;inset:0;z-index:1;
 background:linear-gradient(180deg,rgba(14,13,12,.8) 0%,rgba(14,13,12,.46) 42%,rgba(14,13,12,.93) 100%)}
.stage__in{position:relative;z-index:2;height:100%;display:grid;align-content:space-between;
 padding:clamp(20px,2.4vw,42px)}
.stage__top{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.stage__lg{display:flex;align-items:center;gap:10px;color:var(--paper)}
.stage__lg img{height:46px;border-radius:50%;background:#fff;padding:2px}
.stage__lg b{font-family:'Pa',sans-serif;font-weight:700;font-size:17px;letter-spacing:.1em}
.stage__mid{display:grid;gap:10px;align-content:center;color:var(--paper)}
.stage__num{font-family:'Pa',sans-serif;font-weight:700;font-size:clamp(46px,6.4vw,104px);line-height:.9;color:var(--paper)}
.stage__cap{font-size:13.5px;color:rgba(237,231,220,.66);max-width:30ch}
.stage__foot{display:grid;gap:12px;color:var(--paper)}
.stage__act{display:flex;gap:10px;flex-wrap:wrap}
.bt{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:50px;padding:14px 24px;
 font-family:'Pa',sans-serif;font-weight:600;font-size:13px;letter-spacing:.1em;text-transform:uppercase;
 border:1px solid transparent;transition:background .2s var(--ez),color .2s var(--ez),border-color .2s var(--ez),transform .2s var(--ez)}
.bt--r{background:var(--red);color:var(--paper)}.bt--r:hover{background:var(--red2);transform:translateY(-2px)}
.bt--l{border-color:rgba(237,231,220,.4);color:var(--paper)}.bt--l:hover{background:var(--paper);color:var(--ink)}
.bt--d{border-color:var(--ln);color:var(--ink)}.bt--d:hover{background:var(--ink);color:var(--paper)}
.prog{position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(237,231,220,.18);z-index:3}
.prog i{display:block;height:100%;width:0;background:var(--red)}

/* ============================================================
   THE SERVICE SWITCHER.
   One component, one definition, the same markup on all three
   pages, always in the same place. It is how a visitor who came
   for a fade discovers the other two trades without going back
   to the gateway.
   ============================================================ */
.sw{position:relative;z-index:20}
.sw__b{display:flex;align-items:center;gap:9px;min-height:44px;padding:6px 14px;
 border:1px solid rgba(237,231,220,.34);background:rgba(14,13,12,.78);color:var(--paper);
 transition:border-color .2s var(--ez),background .2s var(--ez)}
.sw__b:hover,.sw[data-open] .sw__b{border-color:var(--red2);background:rgba(14,13,12,.78)}
.sw__k{font-family:'Pa',sans-serif;font-weight:600;font-size:9.5px;letter-spacing:.24em;text-transform:uppercase;
 color:var(--red2)}
.sw__t{font-family:'Pa',sans-serif;font-weight:700;font-size:14px;letter-spacing:.04em;text-transform:uppercase}
.sw__c{width:10px;height:6px;transition:transform .25s var(--ez)}
.sw[data-open] .sw__c{transform:rotate(180deg)}
.sw__p{position:absolute;top:calc(100% + 8px);left:0;min-width:334px;background:var(--bk2);
 border:1px solid rgba(237,231,220,.2);box-shadow:0 26px 60px rgba(0,0,0,.6);display:grid;
 animation:sw .2s var(--ez)}
@keyframes sw{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
.sw__i{display:grid;gap:2px;padding:13px 16px;color:var(--paper);border-bottom:1px solid rgba(237,231,220,.12);
 transition:background .18s var(--ez),padding-left .18s var(--ez)}
.sw__i:hover{background:rgba(212,69,59,.16);padding-left:22px}
.sw__i.on{background:rgba(237,231,220,.07)}
.sw__i.on b::after{content:'';display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--red2);
 margin-left:8px;vertical-align:middle}
.sw__i b{font-family:'Pa',sans-serif;font-weight:700;font-size:14.5px;letter-spacing:.03em;text-transform:uppercase}
.sw__i span{font-size:12.5px;color:rgba(237,231,220,.62)}
.sw__all{padding:12px 16px;font-family:'Pa',sans-serif;font-weight:600;font-size:11px;letter-spacing:.16em;
 text-transform:uppercase;color:var(--red2)}
.sw__all:hover{background:rgba(237,231,220,.06)}
@media (prefers-reduced-motion:reduce){.sw__p{animation:none}}

/* RIGHT: the scrolling column. Rows, not cards. */
.flow{background:var(--paper);min-width:0}
.step{padding:clamp(46px,7vh,96px) clamp(22px,4vw,80px);border-bottom:1px solid var(--ln);position:relative;min-width:0}
.step:last-of-type{border-bottom:0}
.step__n{position:absolute;right:clamp(18px,3vw,54px);top:clamp(22px,3vh,40px);
 font-family:'Pa',sans-serif;font-weight:700;font-size:13px;color:var(--red);letter-spacing:.14em}
.step h2{font-family:'Pa',sans-serif;font-weight:700;text-transform:uppercase;line-height:.96;
 font-size:clamp(28px,3.6vw,58px);letter-spacing:-.01em;margin:12px 0 14px;max-width:16ch}
.step h2 i{font-style:normal;color:var(--red)}
.led{display:grid;margin-top:8px}
.led a{display:grid;grid-template-columns:1fr auto;gap:16px;align-items:baseline;padding:14px 0;
 border-top:1px solid var(--ln);transition:padding-left .28s var(--ez),color .28s var(--ez)}
.led a:last-child{border-bottom:1px solid var(--ln)}
.led a:hover{padding-left:12px;color:var(--red)}
.led a span{font-size:16px}
.led a em{font-style:normal;display:block;font-size:12.5px;color:var(--ink-d)}
.led a b{font-family:'Pa',sans-serif;font-weight:700;font-size:22px;font-variant-numeric:tabular-nums;white-space:nowrap}
.strip{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:10px;
 margin-right:calc(-1*clamp(22px,4vw,80px));scrollbar-width:none;cursor:grab}
.strip::-webkit-scrollbar{display:none}
.strip.grab{cursor:grabbing}
.strip figure{margin:0;flex:0 0 clamp(180px,22vw,260px);scroll-snap-align:start;position:relative;overflow:hidden}
.strip img{width:100%;aspect-ratio:3/4;object-fit:cover;transition:transform .5s var(--ez)}
.strip figure:hover img{transform:scale(1.05)}
.qs{display:grid;gap:26px;margin-top:6px}
.qs blockquote{margin:0;padding-left:26px;border-left:2px solid var(--red)}
.qs p{font-size:17px;line-height:1.5}
.qs cite{font-style:normal;display:block;margin-top:7px;font-family:'Pa',sans-serif;font-weight:600;
 font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-d)}
.facts{display:flex;flex-wrap:wrap;gap:clamp(20px,3vw,52px);margin-top:6px}
.facts b{display:block;font-family:'Pa',sans-serif;font-weight:700;font-size:clamp(28px,3.2vw,46px);line-height:1;
 color:var(--red);font-variant-numeric:tabular-nums}
.facts span{display:block;font-size:12.5px;color:var(--ink-d)}
.end{background:var(--bk);color:var(--paper);padding:clamp(34px,5vw,64px) clamp(22px,4vw,80px)}
.end a{color:var(--paper)}
.end h4{font-family:'Pa',sans-serif;font-weight:600;font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--red2);margin-bottom:10px}
.end__g{display:grid;grid-template-columns:1fr 1fr;gap:24px}
.end__c{display:grid;gap:7px;font-size:14.5px;color:rgba(237,231,220,.7)}
.end__b{border-top:1px solid rgba(237,231,220,.18);margin-top:26px;padding-top:16px;font-size:11.5px;color:rgba(237,231,220,.5)}

@media (max-width:900px){
 .split{grid-template-columns:1fr}
 .stage{position:relative;height:auto;min-height:74svh}
 .stage__in{min-height:74svh}
 .strip{margin-right:0}
 .end__g{grid-template-columns:1fr}
 /* the stage scrolls away on a phone, so the switcher follows the reader.
    The wordmark stands down for it: the badge alone is enough identification. */
 .sw{position:fixed;top:10px;right:10px;z-index:100}
 .sw__p{left:auto;right:0;min-width:min(304px,calc(100vw - 20px))}
 .sw__b{background:rgba(14,13,12,.94)}
 .sw__k{display:none}
 .stage__lg b{display:none}
}
@media (prefers-reduced-motion:reduce){*{transition-duration:1ms!important}}
</style>
</head>
<body>

<div class="split">

  <aside class="stage">
    <div class="stage__ph">
      ${d.photos.map((f, i) => `<img${i === 0 ? ' class="on"' : ''} data-stage="${i}" src="${B}img/${f}" alt="${d.alts[i]}"${i === 0 ? ' fetchpriority="high"' : ''}>`).join('\n      ')}
    </div>
    <div class="stage__in">
      <div class="stage__top">
        <a class="stage__lg" href="${B}../gate-2/"><img src="${B}img/logo.png" alt="MasDos8"><b>MasDos8</b></a>
        ${switcher(key, B)}
      </div>
      <div class="stage__mid">
        <p class="kk" style="color:rgba(237,231,220,.82)">Nuselská 133/134 &middot; Prague 4</p>
        <div class="stage__num" id="stage-t">${d.stage[0][0]}</div>
        <p class="stage__cap" id="stage-c">${d.stage[0][1]}</p>
      </div>
      <div class="stage__foot">
        <div class="facts" style="gap:24px">
          <div><b style="color:var(--paper)" class="num" data-count="4.8" data-dec="1">0</b><span style="color:rgba(237,231,220,.6)">Google, 225 reviews</span></div>
          <div><b style="color:var(--paper)">2025</b><span style="color:rgba(237,231,220,.6)">Golden Company</span></div>
        </div>
        <div class="stage__act">
          <a class="bt bt--r" href="#book">Reserve</a>
          <a class="bt bt--l" href="tel:+420773267463">+420 773 267 463</a>
        </div>
      </div>
    </div>
    <div class="prog"><i id="prog"></i></div>
  </aside>

  <main class="flow">
${d.steps.map(s => step(s, B)).join('\n')}

    <footer class="end">
      <div class="end__g">
        <div class="end__c"><h4>MasDos8</h4>
          <span>Barber &amp; Tattoo</span><span>Nuselská 133/134, 140 00 Prague 4</span><span>Open daily from 09:00</span></div>
        <div class="end__c"><h4>The other rooms</h4>
          ${SERVICES.filter(s => s.k !== key).map(s => `<a href="${(B + s.href) || './'}">${s.name}, from ${czk(s.from)} Kč</a>`).join('\n          ')}
          <a href="tel:+420773267463">+420 773 267 463</a></div>
      </div>
      <div class="end__b">&copy; 2026 MasDos8 Barber &amp; Tattoo. Design proposal by Off-Plate. Photography, logo, prices and reviews are theirs.</div>
    </footer>

  </main>
</div>

<script src="${B}motion.js" defer></script>
<script>
(()=>{
  /* the fixed stage reacts to which step is in view */
  const COPY=${JSON.stringify(d.stage)};
  const imgs=[...document.querySelectorAll('.stage__ph img')];
  const steps=[...document.querySelectorAll('.step')];
  const t=document.getElementById('stage-t'),c=document.getElementById('stage-c'),prog=document.getElementById('prog');
  let cur=-1;
  const show=i=>{
    if(i===cur)return; cur=i;
    imgs.forEach(m=>m.classList.toggle('on',+m.dataset.stage===i));
    if(COPY[i]){t.textContent=COPY[i][0];c.textContent=COPY[i][1];}
  };
  /* at the very top the first step can be shorter than the band, so pin stage 0 there */
  const io=new IntersectionObserver(es=>{
    if(scrollY<60){show(0);return;}
    es.forEach(e=>{if(e.isIntersecting)show(+e.target.dataset.stage);});
  },{rootMargin:'-45% 0px -45% 0px'});
  steps.forEach(s=>io.observe(s)); show(0);
  addEventListener('scroll',()=>{
    if(scrollY<60)show(0);
    const h=document.documentElement.scrollHeight-innerHeight;
    prog.style.width=(h>0?Math.min(scrollY/h,1)*100:0)*1+'%';
  },{passive:true});

  /* the service switcher */
  const sw=document.querySelector('[data-sw]'), b=sw.querySelector('.sw__b'), p=sw.querySelector('.sw__p');
  const open=on=>{ p.hidden=!on; b.setAttribute('aria-expanded',String(on));
    sw.toggleAttribute('data-open',on); if(on) p.querySelector('.sw__i').focus(); };
  b.addEventListener('click',e=>{ e.stopPropagation(); open(p.hidden); });
  document.addEventListener('click',e=>{ if(!p.hidden&&!e.target.closest('[data-sw]')) open(false); });
  addEventListener('keydown',e=>{ if(e.key==='Escape'&&!p.hidden){ open(false); b.focus(); } });
  p.addEventListener('keydown',e=>{
    const items=[...p.querySelectorAll('a')], i=items.indexOf(document.activeElement);
    if(e.key==='ArrowDown'){e.preventDefault();items[(i+1)%items.length].focus();}
    if(e.key==='ArrowUp'){e.preventDefault();items[(i-1+items.length)%items.length].focus();}
  });
})();
</script>
</body>
</html>
`;
};

for (const key of Object.keys(PAGES)) {
  const out = path.join(ROOT, PAGES[key].out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(key));
  console.log('wrote', path.relative(process.cwd(), out));
}
