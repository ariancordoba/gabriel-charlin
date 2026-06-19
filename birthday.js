(function () {
  // Marca body para que main.js espere
  document.body.classList.add('birthday-active');

  var overlay = document.createElement('div');
  overlay.id = 'birthday-overlay';
  document.body.appendChild(overlay);

  // Canvas confetti — responsivo
  var canvas = document.createElement('canvas');
  canvas.id = 'birthday-canvas';
  overlay.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  // Mensaje
  var msg = document.createElement('div');
  msg.id = 'birthday-msg';
  msg.innerHTML = '¡Feliz Cumpleaños<br>Gabriel!';
  overlay.appendChild(msg);

  var sub = document.createElement('div');
  sub.id = 'birthday-sub';
  sub.textContent = 'Tocá para continuar';
  overlay.appendChild(sub);

  // Globos — distribuidos uniformemente
  var emojis = ['🎈', '🎉', '🎈', '🎈', '🎊', '🎈', '🎉', '🎈'];
  emojis.forEach(function (e, i) {
    var b = document.createElement('span');
    b.className = 'b-balloon';
    b.textContent = e;
    var slot = (i / emojis.length) * 92 + 4;
    b.style.left = (slot + (Math.random() * 5 - 2.5)) + '%';
    b.style.animationDelay   = (i * 0.18 + Math.random() * 0.4) + 's';
    b.style.animationDuration = (4.5 + Math.random() * 2.5) + 's';
    overlay.appendChild(b);
  });

  // Confetti pieces
  var colors = ['#FF6B6B','#FFD166','#06D6A0','#C8A96E','#EF476F','#118AB2','#ffffff','#FFE066'];
  var pieces = [];
  for (var i = 0; i < 180; i++) {
    pieces.push({
      x:     Math.random() * window.innerWidth,
      y:    -20 - Math.random() * 350,
      w:     5 + Math.random() * 8,
      h:     3 + Math.random() * 5,
      color: colors[i % colors.length],
      speed: 1.8 + Math.random() * 2.8,
      drift: (Math.random() - 0.5) * 1.4,
      angle: Math.random() * Math.PI * 2,
      rot:   (Math.random() - 0.5) * 0.12
    });
  }

  var rafId;
  var startTime = Date.now();
  var removed = false;

  function tick() {
    var w = canvas.width;
    var h = canvas.height;
    var elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, w, h);

    // Backdrop: fade in → hold → fade out
    var backdropAlpha = Math.min(1, elapsed / 400) * 0.75;
    if (elapsed > 4200) backdropAlpha *= Math.max(0, 1 - (elapsed - 4200) / 800);
    ctx.fillStyle = 'rgba(10,9,8,' + backdropAlpha + ')';
    ctx.fillRect(0, 0, w, h);

    // Confetti
    var ca = elapsed > 4000 ? Math.max(0, 1 - (elapsed - 4000) / 700) : 1;
    pieces.forEach(function (p) {
      p.y += p.speed;
      p.x += p.drift;
      p.angle += p.rot;
      if (p.y > h + 10) { p.y = -12; p.x = Math.random() * w; }
      ctx.save();
      ctx.globalAlpha = ca * 0.9;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (elapsed < 5200 && !removed) {
      rafId = requestAnimationFrame(tick);
    } else {
      dismiss();
    }
  }

  rafId = requestAnimationFrame(tick);

  function dismiss() {
    if (removed) return;
    removed = true;
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resizeCanvas);

    // Desbloquea la animación del hero
    document.body.classList.remove('birthday-active');
    document.dispatchEvent(new CustomEvent('birthdayDismissed'));

    overlay.style.transition = 'opacity 0.6s ease';
    overlay.style.opacity = '0';
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 650);
  }

  overlay.addEventListener('click', dismiss);
  overlay.addEventListener('touchend', dismiss, { passive: true });
})();
