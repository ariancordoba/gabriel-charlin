(function () {
  'use strict';

  // Todo viene de config.js → objeto SITE
  const { hero, sobre, footer, galeria } = SITE;
  const TOTAL = galeria.length;

  // ——————————————————————————————
  // Poblar contenido desde config
  // ——————————————————————————————

  // Hero
  document.querySelector('.name').textContent = hero.nombre;
  document.querySelector('.subtitle').textContent = hero.subtitulo;
  document.getElementById('hero-video').src = hero.video;

  // Sobre él
  document.querySelector('.sobre-text').textContent = sobre;

  // Footer
  document.querySelector('.footer-name').textContent = footer.nombre;
  document.querySelector('.footer-year').textContent = footer.anio;

  // Título de la pestaña
  document.title = hero.nombre + ' — Pintor';

  // ——————————————————————————————
  // Gallery — CMS cards
  // ——————————————————————————————

  const gallery = document.getElementById('gallery');

  galeria.forEach(function (obra, i) {
    const title = (obra.title || '').trim() || 'Sin título';
    const num = String(i + 1).padStart(2, '0');

    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.dataset.index = String(i);

    const imgWrap = document.createElement('div');
    imgWrap.className = 'card-img-wrap';

    const img = document.createElement('img');
    img.src = obra.src;
    img.alt = title;
    img.loading = i < 8 ? 'eager' : 'lazy';
    img.decoding = 'async';

    imgWrap.appendChild(img);

    const info = document.createElement('div');
    info.className = 'card-info';

    const titleEl = document.createElement('span');
    titleEl.className = 'card-title';
    titleEl.textContent = title;

    const numEl = document.createElement('span');
    numEl.className = 'card-num';
    numEl.textContent = num;

    info.appendChild(titleEl);
    info.appendChild(numEl);
    card.appendChild(imgWrap);
    card.appendChild(info);
    gallery.appendChild(card);
  });

  // ——————————————————————————————
  // Lightbox
  // ——————————————————————————————

  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbTitleEl = document.getElementById('lb-title');
  const lbClose = document.getElementById('lb-close');
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = ((index % TOTAL) + TOTAL) % TOTAL;
    const obra = galeria[currentIndex];
    const t = (obra.title || '').trim() || 'Sin título';
    lbImg.src = obra.src;
    lbImg.alt = t;
    lbTitleEl.textContent = t;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function navigate(delta) {
    currentIndex = ((currentIndex + delta) % TOTAL + TOTAL) % TOTAL;
    const obra = galeria[currentIndex];
    const t = (obra.title || '').trim() || 'Sin título';
    lbImg.src = obra.src;
    lbImg.alt = t;
    lbTitleEl.textContent = t;
  }

  gallery.addEventListener('click', function (e) {
    const card = e.target.closest('.gallery-card');
    if (!card) return;
    openLightbox(parseInt(card.dataset.index, 10));
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', function (e) { e.stopPropagation(); navigate(-1); });
  lbNext.addEventListener('click', function (e) { e.stopPropagation(); navigate(1); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  var touchStartX = 0;
  lightbox.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
  }, { passive: true });

  // ——————————————————————————————
  // Video hero — fade in/out cinematic loop
  // ——————————————————————————————

  var video = document.getElementById('hero-video');
  var FADE_SEC = 0.5;
  var rafId = null;

  function tickFade() {
    if (video.readyState >= 2 && video.duration) {
      var t = video.currentTime;
      var d = video.duration;
      var opacity;
      if (t < FADE_SEC) {
        opacity = t / FADE_SEC;
      } else if (d - t < FADE_SEC) {
        opacity = (d - t) / FADE_SEC;
      } else {
        opacity = 1;
      }
      video.style.opacity = Math.max(0, Math.min(1, opacity));
    }
    rafId = requestAnimationFrame(tickFade);
  }

  function startVideo() {
    video.play().then(function () {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tickFade);
    }).catch(function () {});
  }

  video.addEventListener('ended', function () {
    if (rafId) cancelAnimationFrame(rafId);
    video.style.opacity = '0';
    setTimeout(function () {
      video.currentTime = 0;
      startVideo();
    }, 100);
  });

  video.addEventListener('canplay', startVideo, { once: true });
  if (video.readyState >= 3) startVideo();

  // ——————————————————————————————
  // Scroll hint
  // ——————————————————————————————

  var scrollHint = document.querySelector('.scroll-hint');
  if (scrollHint) {
    scrollHint.addEventListener('click', function () {
      document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' });
    });
  }

  var heroCta = document.getElementById('hero-cta');
  if (heroCta) {
    heroCta.addEventListener('click', function () {
      document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ——————————————————————————————
  // Animación de firma
  // ——————————————————————————————

  function runSignature() {
    var name = document.querySelector('.name');
    var flourishPath = document.getElementById('flourish-path');
    var subtitle = document.querySelector('.subtitle');

    if (flourishPath) {
      try {
        var len = flourishPath.getTotalLength();
        flourishPath.style.strokeDasharray = len;
        flourishPath.style.strokeDashoffset = len;
      } catch (_) {}
    }

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        name.classList.add('visible');
        setTimeout(function () { if (flourishPath) flourishPath.classList.add('animate'); }, 700);
        setTimeout(function () { subtitle.classList.add('visible'); }, 2000);
        var cta = document.getElementById('hero-cta');
        if (cta) setTimeout(function () { cta.classList.add('visible'); }, 2600);
      });
    });
  }

  function launchSignature() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(runSignature);
    } else {
      runSignature();
    }
  }

  if (document.body.classList.contains('birthday-active')) {
    document.addEventListener('birthdayDismissed', launchSignature, { once: true });
  } else {
    launchSignature();
  }

})();
