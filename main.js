(function () {
  'use strict';

  // ——————————————————————————————
  // TÍTULOS — editá este array para nombrar cada obra.
  // Dejá el string vacío ("") para mostrar solo el número.
  // ——————————————————————————————
  const TITLES = [
    '',  // 01
    '',  // 02
    '',  // 03
    '',  // 04
    '',  // 05
    '',  // 06
    '',  // 07
    '',  // 08
    '',  // 09
    '',  // 10
    '',  // 11
    '',  // 12
    '',  // 13
    '',  // 14
    '',  // 15
    '',  // 16
    '',  // 17
    '',  // 18
    '',  // 19
    '',  // 20
    '',  // 21
    '',  // 22
    '',  // 23
    '',  // 24
    '',  // 25
    '',  // 26
    '',  // 27
    '',  // 28
    '',  // 29
    '',  // 30
    '',  // 31
    '',  // 32
    '',  // 33
    '',  // 34
    '',  // 35
    '',  // 36
    '',  // 37
    '',  // 38
    '',  // 39
    '',  // 40
    '',  // 41
    '',  // 42
    '',  // 43
    '',  // 44
    '',  // 45
    '',  // 46
    '',  // 47
    '',  // 48
    '',  // 49
    '',  // 50
    '',  // 51
    '',  // 52
    '',  // 53
    '',  // 54
    '',  // 55
    '',  // 56
    '',  // 57
    '',  // 58
    '',  // 59
    '',  // 60
    '',  // 61
    '',  // 62
  ];

  const TOTAL = 62;

  // ——————————————————————————————
  // Gallery — CMS cards con título
  // ——————————————————————————————

  const gallery = document.getElementById('gallery');
  const imagePaths = [];
  const imageTitles = [];

  for (let i = 1; i <= TOTAL; i++) {
    const n = String(i).padStart(2, '0');
    const src = `images/${n}.jpg`;
    const rawTitle = (TITLES[i - 1] || '').trim();
    const title = rawTitle || `Sin título`;
    imagePaths.push(src);
    imageTitles.push(title);

    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.dataset.index = String(i - 1);

    const imgWrap = document.createElement('div');
    imgWrap.className = 'card-img-wrap';

    const img = document.createElement('img');
    img.src = src;
    img.alt = title;
    img.loading = i <= 6 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.width = 1050;
    img.height = 1400;

    imgWrap.appendChild(img);

    const info = document.createElement('div');
    info.className = 'card-info';

    const titleEl = document.createElement('span');
    titleEl.className = 'card-title';
    titleEl.textContent = title;

    const numEl = document.createElement('span');
    numEl.className = 'card-num';
    numEl.textContent = n;

    info.appendChild(titleEl);
    info.appendChild(numEl);

    card.appendChild(imgWrap);
    card.appendChild(info);
    gallery.appendChild(card);
  }

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
    lbImg.src = imagePaths[currentIndex];
    lbImg.alt = imageTitles[currentIndex];
    lbTitleEl.textContent = imageTitles[currentIndex];
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
    lbImg.src = imagePaths[currentIndex];
    lbImg.alt = imageTitles[currentIndex];
    lbTitleEl.textContent = imageTitles[currentIndex];
  }

  gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.gallery-card');
    if (!card) return;
    openLightbox(parseInt(card.dataset.index, 10));
  });

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
  }, { passive: true });

  // ——————————————————————————————
  // Video hero — fade in/out loop cinematic
  // ——————————————————————————————

  const video = document.getElementById('hero-video');
  const FADE_SEC = 0.5;
  let rafId = null;

  function tickFade() {
    if (video.readyState >= 2 && video.duration) {
      const t = video.currentTime;
      const d = video.duration;
      let opacity;

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
    video.play().then(() => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tickFade);
    }).catch(() => {
      // Autoplay bloqueado — video permanece invisible, el hero sigue funcionando
    });
  }

  video.addEventListener('ended', () => {
    if (rafId) cancelAnimationFrame(rafId);
    video.style.opacity = '0';
    setTimeout(() => {
      video.currentTime = 0;
      startVideo();
    }, 100);
  });

  video.addEventListener('canplay', startVideo, { once: true });

  // Fallback si canplay ya disparó
  if (video.readyState >= 3) startVideo();

  // ——————————————————————————————
  // Animación de firma
  // ——————————————————————————————

  function runSignature() {
    const name = document.querySelector('.name');
    const flourishPath = document.getElementById('flourish-path');
    const subtitle = document.querySelector('.subtitle');

    if (flourishPath) {
      try {
        const len = flourishPath.getTotalLength();
        flourishPath.style.strokeDasharray = len;
        flourishPath.style.strokeDashoffset = len;
      } catch (_) {}
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        name.classList.add('visible');
        setTimeout(() => { if (flourishPath) flourishPath.classList.add('animate'); }, 700);
        setTimeout(() => { subtitle.classList.add('visible'); }, 2000);
      });
    });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(runSignature);
  } else {
    window.addEventListener('load', runSignature);
  }

})();
