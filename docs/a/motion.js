/* Motion kit. Copied into each variant so no variant depends on another.
   Everything here is opt-in per element and dies under prefers-reduced-motion. */
(() => {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* 1. scroll reveal, with stagger via --i */
  const rv = $$('[data-rv]');
  if (rv.length) {
    if (still) rv.forEach(e => e.classList.add('in'));
    else {
      const io = new IntersectionObserver((es) => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }), { rootMargin: '0px 0px -12% 0px', threshold: .08 });
      rv.forEach(e => io.observe(e));
    }
  }

  /* 2. count-up on any [data-count] */
  const nums = $$('[data-count]');
  if (nums.length) {
    const run = el => {
      const to = parseFloat(el.dataset.count), dec = (el.dataset.dec | 0);
      const sfx = el.dataset.sfx || '', t0 = performance.now(), dur = 1100;
      const tick = t => {
        const k = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - k, 3);
        el.textContent = (to * e).toLocaleString('en-GB', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + sfx;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (still) nums.forEach(el => el.textContent = (+el.dataset.count).toLocaleString('en-GB', { minimumFractionDigits: el.dataset.dec | 0, maximumFractionDigits: el.dataset.dec | 0 }) + (el.dataset.sfx || ''));
    else {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
      }), { threshold: .5 });
      nums.forEach(el => io.observe(el));
    }
  }

  /* 3. pointer parallax: [data-par="12"] drifts by that many px */
  const par = $$('[data-par]');
  if (par.length && !still && matchMedia('(pointer:fine)').matches) {
    let tx = 0, ty = 0, cx = 0, cy = 0, live = false;
    addEventListener('pointermove', e => {
      tx = (e.clientX / innerWidth - .5) * 2; ty = (e.clientY / innerHeight - .5) * 2;
      if (!live) { live = true; requestAnimationFrame(loop); }
    }, { passive: true });
    const loop = () => {
      cx += (tx - cx) * .06; cy += (ty - cy) * .06;
      par.forEach(el => {
        const d = parseFloat(el.dataset.par) || 10;
        el.style.transform = `translate3d(${(-cx * d).toFixed(2)}px,${(-cy * d).toFixed(2)}px,0)`;
      });
      if (Math.abs(tx - cx) > .001 || Math.abs(ty - cy) > .001) requestAnimationFrame(loop); else live = false;
    };
  }

  /* 4. scroll parallax: [data-sp="0.15"] */
  const sp = $$('[data-sp]');
  if (sp.length && !still) {
    let ticking = false;
    const upd = () => {
      const vh = innerHeight;
      sp.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const k = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = `translate3d(0,${(k * (parseFloat(el.dataset.sp) || .15) * -100).toFixed(2)}px,0)`;
      });
      ticking = false;
    };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  /* 5. drag-to-scroll on any [data-drag] rail */
  $$('[data-drag]').forEach(rail => {
    let down = false, sx = 0, sl = 0;
    rail.addEventListener('pointerdown', e => { down = true; sx = e.clientX; sl = rail.scrollLeft; rail.setPointerCapture(e.pointerId); rail.classList.add('grab'); });
    rail.addEventListener('pointermove', e => { if (down) rail.scrollLeft = sl - (e.clientX - sx); });
    const up = () => { down = false; rail.classList.remove('grab'); };
    rail.addEventListener('pointerup', up); rail.addEventListener('pointercancel', up);
  });

  /* 6. prev / next buttons for a rail: [data-rail-prev="#id"] */
  $$('[data-rail-prev],[data-rail-next]').forEach(b => {
    const sel = b.dataset.railPrev || b.dataset.railNext;
    const rail = document.querySelector(sel); if (!rail) return;
    b.addEventListener('click', () => {
      const card = rail.firstElementChild;
      const step = card ? card.getBoundingClientRect().width + 16 : 320;
      rail.scrollBy({ left: b.dataset.railPrev ? -step : step, behavior: still ? 'auto' : 'smooth' });
    });
  });

  /* 7. mobile drawer: [data-menu="#id"] */
  $$('[data-menu]').forEach(btn => {
    const d = document.querySelector(btn.dataset.menu); if (!d) return;
    btn.addEventListener('click', e => {
      e.stopPropagation(); const o = d.hidden; d.hidden = !o; btn.setAttribute('aria-expanded', String(o));
    });
    document.addEventListener('click', e => {
      if (!d.hidden && !e.target.closest(btn.dataset.menu) && !e.target.closest('[data-menu]')) {
        d.hidden = true; btn.setAttribute('aria-expanded', 'false');
      }
    });
    d.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { d.hidden = true; btn.setAttribute('aria-expanded', 'false'); }));
  });

  /* 8. header pins after a scroll */
  const pin = document.querySelector('[data-pin]');
  if (pin) {
    const on = () => pin.classList.toggle('pin', scrollY > 40);
    addEventListener('scroll', on, { passive: true }); on();
  }
})();
