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
    nav: [['About', 'about/'], ['Prices', '#s2'], ['Our work', '#s3'], ['Team', 'team/'], ['FAQ', 'faq/'], ['Find us', '#book']],
    resv: { title: 'Reserve a chair', done: 'The chair is held', pay: 'Payable in the chair', with: 'José Luis',
      svc: [['Classic adult cut', 600], ['Cut, wash and massage', 700], ['Cut, wash and beard', 900], ['Full service', 1100],
        ['Beard trim', 250], ['Beard colour', 200], ['Hair ornaments', 100], ['Kids under 5', 300], ['Kids 6 to 12', 400], ['Dreadlocks', 2500]] },
    title: 'MasDos8 Barbershop, Prague 4. Sit down',
    desc: 'Barbershop on Nuselska, Prague 4. Classic cut 600 CZK. 4.8 from 225 Google reviews. Golden Company 2025.',
    stage: [
      ['Sit down', 'A cut, a shave, and a drink while you wait. We will take our time over it.'],
      ['Our prices', 'Ten services, with the price written beside each one.'],
      ['Our work', 'Cuts from this room, photographed the day they were finished.'],
      ['Our room', 'Nuselská 133/134, and four point eight from two hundred and twenty five people.'],
      ['Come in', 'Open from nine, every day of the week. We would love to see you.']
    ],
    photos: ['jose.webp', 'cut9.webp', 'cut6.webp', 'shop1.webp', 'cut2.webp'],
    alts: ['José Luis', 'A cut in progress', 'Finishing the fade', 'The room on Nuselská', 'Detail'],
    steps: [
      { n: '01', h: 'Twenty years <i>at the chair</i>',
        p: 'José Luis cuts, shapes and finishes, and he does the tattoos and the permanent makeup as well. His customers call him an artist, and after twenty years behind the chair he has earned it. The same hands look after you from the first cut to the last.',
        facts: [['225', 'People left a review', 1], ['1752', 'Follow on Instagram', 1], ['13 h', 'Open, every day', 0]] },
      { n: '02', h: 'Everything we do, <i>with the price</i>',
        led: [['Classic adult cut', 'Contours, brows, ears, cologne and a drink', 600], ['Cut, wash and massage', '', 700],
              ['Cut, wash and beard', '', 900], ['Full service', 'Everything together, unhurried', 1100],
              ['Beard trim', 'Plus a drink on the house', 250], ['Beard colour', '', 200], ['Hair ornaments', '', 100],
              ['Kids under 5', 'Free coffee for the parent', 300], ['Kids 6 to 12', '', 400], ['Dreadlocks', '', 2500]] },
      { n: '03', h: 'Let us show you <i>our work</i>', p: 'Drag sideways.',
        strip: ['cut2-s.webp', 'cut6-s.webp', 'cut8-s.webp', 'cut9-s.webp', 'cut10-s.webp', 'fade-s.webp'] },
      { n: '04', h: 'What our <i>customers</i> say',
        qs: [['Best barbershop I\'ve been. Jose Luis knows what he is doing, the hair and beard looks amazing.', 'Rafael Frías'],
             ['If you are a man worth your beard, you must visit José. This is the first time I\'ve come out of a barbershop happy.', 'Swatchhanda Kher'],
             ['Been getting my haircuts and beard maintenance with Jose for more than 4 years. Excellent and quick service.', 'Alberto Alvarez']] },
      { n: '05', h: 'Nuselská 133/134, <i>Prague 4</i>', id: 'book',
        p: 'Open every day from nine in the morning. Call ahead on your first visit and José will meet you at the door. Tattoo and permanent makeup are booked the same way, in the same rooms.' }
    ]
  },

  about: {
    out: 'about/index.html', base: '../', up: '../../',
    nav: [['Barbershop', ''], ['Our story', '#s1'], ['The name', '#s4'], ['Team', 'team/'], ['FAQ', 'faq/'], ['Find us', '#book']],
    title: 'About MasDos8, Prague 4. Four generations of barbers',
    desc: 'Jose Luis is the fourth generation of barbers in his family. Dominican, twenty years behind the chair, Golden Company 2025 in Prague 4.',
    stage: [
      ['The family', 'His father cut hair. So did his grandfather, and his great-grandfather. José started as a child.'],
      ['Prague', 'He worked in other salons until he could open his own, here on Nuselská.'],
      ['Two trades', 'The clippers and the needle, in the same rooms, by the same hands.'],
      ['The name', 'Más dos. More than two, because nobody gets through life on their own.'],
      ['The plaque', 'Zlatá firma 2025, awarded on the strength of verified customer reviews.'],
      ['Come in', 'Nuselská 133/134, open every day from nine.']
    ],
    photos: ['jose.webp', 'shop1.webp', 'cut6.webp', 'shop2.webp', 'award.webp', 'jose2.webp'],
    alts: ['José Luis', 'The room on Nuselská', 'Finishing a fade', 'The studio', 'The Golden Company plaque', 'José Luis at work'],
    steps: [
      { n: '01', h: 'It was never <i>a career choice</i>',
        p: 'José Luis grew up in a Dominican barbershop. His father was a barber, so was his grandfather, and so was his great-grandfather before him. He started cutting as a child, and as he puts it, the passion for this trade is in his blood. Twenty years later he is still at the chair most days himself.',
        facts: [['4', 'Generations of barbers', 1], ['20 +', 'Years behind the chair', 0], ['1', 'Pair of hands, most days', 1]] },
      { n: '02', h: 'Until he could open <i>his own</i>',
        p: 'After moving to the Czech Republic he worked in salons around Prague, learning how the city cuts and what Czech customers like, and saving for a room of his own. He found it on Nuselská, and it has been his ever since.' },
      { n: '03', h: 'The clippers <i>and the needle</i>',
        p: 'Alongside barbering, José tattoos, and he does the permanent makeup as well. Three trades under one badge, which is how somebody who came in for a fade ends up leaving with a consultation booked for something else entirely.',
        imgs: [['cut9-s.webp', 'A cut in progress'], ['tat1-s.webp', 'A tattoo by José Luis']] },
      { n: '04', h: 'What the name <i>means</i>',
        big: ['M&aacute;s dos <i>8</i>', 'Spanish for more than two, because in life we are never alone. The eight on its side is infinity, a cycle with no end and no limits. The name carried the idea before the sign went up.'] },
      { n: '05', h: 'Golden Company <i>2025</i>',
        p: 'Zlatá firma goes to businesses on the strength of verified customer reviews gathered across the web. MasDos8 holds 4.8 from 225 reviews on Google, which put the shop among the best rated companies in the country. The plaque hangs on the wall here. It appears nowhere on the current website, and it should.',
        imgs: [['award-s.webp', 'The Golden Company 2025 plaque, engraved MasDos8 Barber & Tattoo'], ['joseaward-s.webp', 'José Luis holding the plaque in the shop']] },
      { n: '06', h: 'Nuselská 133/134, <i>Prague 4</i>', id: 'book',
        p: 'Open every day from nine in the morning. Call ahead on your first visit and José will meet you at the door.',
        qs: [['Been getting my haircuts and beard maintenance with Jose for more than 4 years. Excellent and quick service.', 'Alberto Alvarez'],
             ['I felt very well treated and happy to connect with the Latino community, felt like home. Recommended 100%.', 'Edicson Nieto']] }
    ]
  },

  tattoo: {
    out: 'tattoo/index.html', base: '../', up: '../../',
    nav: [['About', 'about/'], ['Prices', '#s2'], ['Our work', '#s3'], ['Team', 'team/'], ['FAQ', 'faq/'], ['Find us', '#book']],
    resv: { title: 'Book a consultation', done: 'The consultation is booked', pay: 'Agreed at the consultation', with: 'José Luis',
      svc: [['Small piece', 600], ['Medium piece', 3000], ['Large piece', 6000], ['Half sleeve', 6000], ['Large areas', 18000]] },
    title: 'MasDos8 Tattoo, Prague 4. Consultation first, needle after',
    desc: 'Tattoo studio on Nuselska, Prague 4. Small piece from 600 CZK, large areas 18 000 CZK. 4.8 from 225 Google reviews.',
    stage: [
      ['Hold still', 'The same hands that cut hair all week. A consultation first, then a date, then the needle.'],
      ['Our prices', 'Five sizes, and the price agreed before we start.'],
      ['Our work', 'Pieces from this room, photographed the day they were finished.'],
      ['Our room', 'Nuselská 133/134, behind the barber chairs, through the same door.'],
      ['Come in', 'Call us and we can usually see you for a consultation the same week.']
    ],
    photos: ['tat1.webp', 'tat2.webp', 'tat3.webp', 'tat4.webp', 'shop2.webp'],
    alts: ['A tattoo by José Luis', 'Line work', 'A finished piece', 'Shading', 'The studio'],
    steps: [
      { n: '01', h: 'The same hands, <i>with a needle</i>',
        p: 'José Luis cuts hair and tattoos, in the same rooms, on the same day if the diary allows. Plenty of people come in for a fade and leave with a piece booked, which is how the shop came to carry both trades. Every piece starts with a consultation, and the consultation is free.',
        facts: [['600', 'A small piece, from', 0], ['18 000', 'A back, arms or legs', 0], ['0', 'Cost of the consultation', 0]] },
      { n: '02', h: 'Priced by <i>size</i>, agreed up front',
        led: [['Small piece', 'Lettering, a symbol, something you can cover with a hand', 600],
              ['Medium piece', 'A forearm, a shoulder, a calf', 3000],
              ['Large piece', 'A chest panel or a full forearm sleeve', 6000],
              ['Half sleeve', 'Shoulder to elbow, usually across two sittings', 6000],
              ['Large areas', 'Back, both arms, legs, body work', 18000]] },
      { n: '03', h: 'Let us show you <i>our work</i>', p: 'Drag sideways.',
        strip: ['tat1-s.webp', 'tat2-s.webp', 'tat3-s.webp', 'tat4-s.webp'] },
      { n: '04', h: 'What our <i>customers</i> say',
        qs: [['Quick, clean, and he captured exactly what we had in mind. We called him in the morning and had our tattoo by the afternoon.', 'Adriana Hernandez'],
             ['If you want a tattoo, a haircut, or eyebrow shaping, there is no place more magical. José Luis is a highly skilled professional.', 'Cristina'],
             ['I got my lips done and a tattoo, and it truly exceeded my expectations. The tattoo turned out perfectly, just as I wanted.', 'Yannely De Los Santos Vilaseca']] },
      { n: '05', h: 'Nuselská 133/134, <i>Prague 4</i>', id: 'book',
        p: 'Bring a reference, a rough idea, or nothing at all. We agree the size together, the size sets the price, and the price stays where we agreed it.' }
    ]
  },

  pmu: {
    out: 'pmu/index.html', base: '../', up: '../../',
    nav: [['About', 'about/'], ['Prices', '#s2'], ['Our work', '#s3'], ['Team', 'team/'], ['FAQ', 'faq/'], ['Find us', '#book']],
    resv: { title: 'Book a sitting', done: 'The sitting is booked', pay: 'Agreed before we begin', with: 'José Luis',
      svc: [['Brows', 3500], ['Full lips', 5000], ['Lip fill', 3500], ['Lip contour', 2000], ['Upper and lower eyeliner', 2000],
        ['Upper eyeliner', 1500], ['Repair of earlier work', 3000]] },
    title: 'MasDos8 Permanent makeup, Prague 4. Brows, lips, eyeliner',
    desc: 'Permanent makeup on Nuselska, Prague 4. Brows 3 500 CZK, full lips 5 000 CZK, repairs 3 000 CZK.',
    stage: [
      ['Look up', 'Brows, lips and eyeliner, done by José himself, in a room that has been looking after faces for years.'],
      ['Our prices', 'Seven treatments, including the repair.'],
      ['Our work', 'Healed results, photographed weeks afterwards.'],
      ['Our room', 'Nuselská 133/134, at the quiet end of the studio.'],
      ['Come in', 'We draw the shape on and agree it with you before anything is permanent.']
    ],
    photos: ['pmu1.webp', 'pmu2.webp', 'pmu3.webp', 'pmu4.webp', 'shop1.webp'],
    alts: ['Brows by José Luis', 'Lip work', 'Eyeliner', 'A healed result', 'The studio'],
    steps: [
      { n: '01', h: 'José does this <i>himself</i>',
        p: 'The permanent makeup is José\'s own work, microblading and eyeliner included. Two customers name him for it in their reviews, so you know exactly whose hands you are in before you sit down.',
        facts: [['1 500', 'Upper eyeliner, from', 0], ['3 500', 'Brows', 0], ['3 000', 'Repairing another studio', 0]] },
      { n: '02', h: 'Including the <i>repair</i>',
        led: [['Brows', 'Microblading, shape drawn and agreed before any pigment', 3500],
              ['Full lips', 'Contour and fill together', 5000],
              ['Lip fill', '', 3500],
              ['Lip contour', '', 2000],
              ['Upper and lower eyeliner', '', 2000],
              ['Upper eyeliner', '', 1500],
              ['Repair of earlier work', 'Correcting permanent makeup done in another studio', 3000]] },
      { n: '03', h: 'Healed results, <i>weeks later</i>', p: 'Drag sideways.',
        strip: ['pmu1-s.webp', 'pmu2-s.webp', 'pmu3-s.webp', 'pmu4-s.webp'] },
      { n: '04', h: 'What our <i>customers</i> say',
        qs: [['Professional approach. Permanent makeup, specifically eyebrow shaping, done perfectly. I recommend it to everyone.', 'Jana Králová'],
             ['I had microblading and eyeliner done with him and the result is stunning. Natural, flattering and perfectly executed.', 'Mia Hurtado de Mendoza'],
             ['I got my lips done and it exceeded my expectations. My lips look beautiful and natural.', 'Yannely De Los Santos Vilaseca']] },
      { n: '05', h: 'Nuselská 133/134, <i>Prague 4</i>', id: 'book',
        p: 'We draw the shape on and agree it with you before any pigment goes in. If you already have work from another studio, bring it in, the repair has its own price on the list.' }
    ]
  },

  team: {
    out: 'team/index.html', base: '../', up: '../../',
    nav: [['Barbershop', ''], ['About', 'about/'], ['Who’s in the room', '#s1'], ['FAQ', 'faq/'], ['Find us', '#book']],
    title: 'The team at MasDos8, Prague 4',
    desc: 'Jose Luis Castillo and the barbers who train under him at MasDos8, Nuselska, Prague 4.',
    stage: [
      ['The team', 'Every chair here is held by someone José trained himself, or José.'],
      ['Who’s in the room', 'Owner, barber, and a team that keeps growing.'],
      ['Come in', 'Book with either and you get the same care.']
    ],
    photos: ['jose2.webp', 'cut9.webp', 'shop2.webp', 'jose.webp'],
    alts: ['José Luis', 'A cut in progress', 'The studio', 'José Luis at the chair'],
    steps: [
      { n: '01', h: 'José Luis <i>Castillo</i>', id: 's1',
        p: 'Fourth generation of barbers in his family, Dominican, more than twenty years behind the chair. He cuts, he tattoos, and he does the permanent makeup himself. Most days he is at the chair alongside everyone else.',
        facts: [['4', 'Generations of barbers', 1], ['20 +', 'Years behind the chair', 0]] },
      { n: '02', h: '<i>Denny</i>, barber',
        p: 'Trained by José, and named by regulars in their own reviews. Cuts and beards, same room, same prices.' },
      { n: '03', h: 'The team <i>keeps growing</i>',
        p: 'We train new barbers here ourselves, and they will look after you with care and Dominican energy, as José puts it. There is a drink for you while you wait: coffee, rum, or mamajuana if you are feeling brave.' },
      { n: '04', h: 'Nuselská 133/134, <i>Prague 4</i>', id: 'book',
        p: 'The reservation asks for a service and a time. If you have a favourite pair of hands, tell us on WhatsApp and we will do our best to hold that chair.' }
    ]
  },

  faq: {
    out: 'faq/index.html', base: '../', up: '../../',
    nav: [['Barbershop', ''], ['About', 'about/'], ['Team', 'team/'], ['Find us', '#book']],
    title: 'Frequently asked, MasDos8, Prague 4',
    desc: 'Booking, languages, kids, tattoo consultations and getting to MasDos8 on Nuselska, Prague 4.',
    stage: [
      ['Questions', 'The ones we actually get, answered straight.'],
      ['Still stuck', 'Ask us on WhatsApp and we will answer it properly.']
    ],
    photos: ['shop1.webp', 'shop2.webp', 'cut2.webp', 'cut6.webp', 'cut8.webp', 'cut9.webp'],
    alts: ['The room on Nuselská', 'The studio', 'A cut in progress', 'Finishing a fade', 'Detail work', 'A cut, finished'],
    steps: [
      { n: '01', h: 'Do I need to <i>book</i>?',
        p: 'Book if you can. Three of the reviews on our page are about the old booking system letting people down, a closed door with no answer, a wait with barbers standing idle, a barber swapped without warning. This reservation is built to fix exactly that: it holds a real slot in the diary.' },
      { n: '02', h: 'Do you speak <i>English or Spanish</i>?',
        p: 'Our own customers write their reviews in Czech, Spanish and English, so come in whichever you’re most comfortable with. José is Dominican, and more than one review mentions feeling at home speaking Spanish here.' },
      { n: '03', h: 'I don’t know exactly <i>what I want</i> yet.',
        p: 'That’s what the tattoo consultation is for, and it’s free. Bring a reference, a rough idea, or nothing at all, and we agree the size and the price together before the needle starts.' },
      { n: '04', h: 'Do you cut <i>children’s</i> hair?',
        p: 'Yes. There’s a separate price for under 5s and for 6 to 12s, and a coffee for the parent while it happens.' },
      { n: '05', h: 'Are the prices <i>real</i>?',
        p: 'Every price you see is the one we charge, all of them, with nothing added at the till. If a service isn’t listed, ask and we’ll tell you the price before you sit down.' },
      { n: '06', h: 'I need to <i>move or cancel</i> my slot.', id: 'book',
        p: 'Call or WhatsApp us and we’ll move it for you. The reservation reference we give you at the end makes it a thirty second call.' }
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
  `<a href="#book" data-led data-n="${n}" data-p="${p}"><span>${n}${x ? `<em>${x}</em>` : ''}</span><b>${czk(p)}</b></a>`).join('')}</div>`;

const step = (s, base) => `
    <section class="step" data-stage="${+s.n - 1}" id="${s.id || 's' + (+s.n)}">
      <span class="step__n">${s.n}</span>
      <h2>${s.h}</h2>
      ${s.p ? `<p class="tx"${s.strip ? ' style="margin-bottom:20px"' : ''}>${s.p}</p>` : ''}
      ${s.facts ? `<div class="facts" style="margin-top:22px">${s.facts.map(([v, l, num]) =>
        `<div><b${num ? ` class="num" data-count="${String(v).replace(/\s/g, '')}"` : ''}>${num ? '0' : v}</b><span>${l}</span></div>`).join('')}</div>` : ''}
      ${s.led ? ledger(s.led) : ''}
      ${s.strip ? `<div class="strip" data-drag>${s.strip.map(f =>
        `<figure><img src="${base}img/${f}" alt="" loading="lazy"></figure>`).join('')}</div>` : ''}
      ${s.big ? `<div class="big"><b>${s.big[0]}</b><p>${s.big[1]}</p></div>` : ''}
      ${s.imgs ? `<div class="pair">${s.imgs.map(([f, alt]) =>
        `<img src="${base}img/${f}" alt="${alt}" loading="lazy">`).join('')}</div>` : ''}
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
  // about, team and faq are not one of the three services, so the switcher
  // and the reservation default to the barbershop on those pages
  const sw = ['about', 'team', 'faq'].includes(key) ? 'barber' : key;
  const resv = d.resv || PAGES.barber.resv;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${d.title}</title>
<meta name="description" content="${d.desc}">
<meta name="robots" content="noindex,nofollow">
<link rel="preload" href="${B}fonts/zodiak-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${B}fonts/cabinet-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="icon" href="${B}img/logo.png">
<link rel="stylesheet" href="${B}app.css">
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
      </div>
      <div class="stage__mid">
        <div class="stage__num" id="stage-t">${d.stage[0][0]}</div>
        <p class="stage__cap" id="stage-c">${d.stage[0][1]}</p>
      </div>
      <div class="stage__foot">
        <p class="stage__ad">Nuselská 133/134, Prague 4 &middot; open every day from 09:00</p>
        <div class="facts" style="gap:24px">
          <div><b style="color:var(--paper)" class="num" data-count="4.8" data-dec="1">0</b><span style="color:rgba(237,231,220,.6)">Google, 225 reviews</span></div>
          <div><b style="color:var(--paper)">2025</b><span style="color:rgba(237,231,220,.6)">Golden Company</span></div>
        </div>
        <div class="stage__act">
          <a class="bt bt--r" href="#book" data-book>Reserve</a>
          <a class="bt bt--l" href="tel:+420773267463">+420 773 267 463</a>
          <a class="bt bt--l" href="https://wa.me/420773267463?text=Dobr%C3%BD%20den%2C%20r%C3%A1d%20bych%20se%20objednal." target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </div>
    <div class="prog"><i id="prog"></i></div>
  </aside>

  <main class="flow">

    <nav class="pnav">
      <div class="pnav__l">
        ${d.nav.map(([label, href]) => `<a href="${href.startsWith('#') ? href : B + href}"${href === './' ? ' aria-current="page"' : ''}>${label}</a>`).join('\n        ')}
      </div>
      ${switcher(sw, B)}
    </nav>
${d.steps.map(s => step(s, B)).join('\n')}

    <footer class="end">
      <div class="end__g">
        <div class="end__c"><h4>MasDos8</h4>
          <span>Barber &amp; Tattoo</span><span>Nuselská 133/134, 140 00 Prague 4</span><span>Open daily from 09:00</span></div>
        <div class="end__c"><h4>The other rooms</h4>
          ${SERVICES.filter(s => s.k !== sw).map(s => `<a href="${(B + s.href) || './'}">${s.name}, from ${czk(s.from)} Kč</a>`).join('\n          ')}
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
<script>
window.RESV_SVC=${JSON.stringify(resv.svc)};
window.RESV_TITLE=${JSON.stringify(resv.title)};
window.RESV_DONE=${JSON.stringify(resv.done)};
window.RESV_PAY=${JSON.stringify(resv.pay)};
window.RESV_WITH=${JSON.stringify(resv.with)};
</script>
<script src="${B}book.js" defer></script>
</body>
</html>
`;
};

fs.mkdirSync(ROOT, { recursive: true });
fs.copyFileSync(path.join('tools', 'shop8.css'), path.join(ROOT, 'app.css'));
fs.copyFileSync(path.join('tools', 'shop8-book.js'), path.join(ROOT, 'book.js'));
console.log('wrote docs/shop-8/app.css, docs/shop-8/book.js');

for (const key of Object.keys(PAGES)) {
  const out = path.join(ROOT, PAGES[key].out);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(key));
  console.log('wrote', path.relative(process.cwd(), out));
}
