(function () {
  'use strict';

  const TOTAL = 62;

  // ——————————————————————————————
  // Gallery generation
  // ——————————————————————————————

  const gallery = document.getElementById('gallery');
  const imagePaths = [];

  for (let i = 1; i <= TOTAL; i++) {
    const n = String(i).padStart(2, '0');
    const src = `images/${n}.jpg`;
    imagePaths.push(src);

    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.dataset.index = String(i - 1);

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Obra ${i}`;
    img.loading = i <= 6 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.width = 1050;
    img.height = 1400;

    div.appendChild(img);
    gallery.appendChild(div);
  }

  // ——————————————————————————————
  // Lightbox
  // ——————————————————————————————

  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = ((index % TOTAL) + TOTAL) % TOTAL;
    lbImg.src = imagePaths[currentIndex];
    lbImg.alt = `Obra ${currentIndex + 1}`;
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
    lbImg.alt = `Obra ${currentIndex + 1}`;
  }

  gallery.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    openLightbox(parseInt(item.dataset.index, 10));
  });

  lbClose.addEventListener('click', closeLightbox);

  lbPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    navigate(-1);
  });

  lbNext.addEventListener('click', (e) => {
    e.stopPropagation();
    navigate(1);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Touch swipe for lightbox
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
  }, { passive: true });

  // ——————————————————————————————
  // Signature animation
  // ——————————————————————————————

  function runSignature() {
    const name = document.querySelector('.name');
    const flourishPath = document.getElementById('flourish-path');
    const subtitle = document.querySelector('.subtitle');

    // Compute real path length
    if (flourishPath) {
      try {
        const len = flourishPath.getTotalLength();
        flourishPath.style.strokeDasharray = len;
        flourishPath.style.strokeDashoffset = len;
      } catch (_) {}
    }

    // Double rAF ensures styles are applied before triggering animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Reveal name left → right
        name.classList.add('visible');

        // Flourish draws in after name starts
        setTimeout(() => {
          if (flourishPath) flourishPath.classList.add('animate');
        }, 700);

        // Subtitle fades up last
        setTimeout(() => {
          subtitle.classList.add('visible');
        }, 2000);
      });
    });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(runSignature);
  } else {
    window.addEventListener('load', runSignature);
  }

})();
