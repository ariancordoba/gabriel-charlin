(function () {
  var overlay = document.createElement('div');
  overlay.id = 'birthday-overlay';
  document.body.appendChild(overlay);

  // Canvas confetti
  var canvas = document.createElement('canvas');
  canvas.id = 'birthday-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  overlay.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  // Mensaje
  var msg = document.createElement('div');
  msg.id = 'birthday-msg';
  msg.innerHTML = '¡Feliz Cumpleaños<br>Gabriel!';
  overlay.appendChild(msg);

  var sub = document.createElement('div');
  sub.id = 'birthday-sub';
  sub.textContent = 'Tocá para continuar';
  overlay.appendChild(sub);

  // Globos
  var emojis = ['🎈', '🎈', '🎈', '🎉', '🎈', '🎈', '🎊', '🎈'];
  emojis.forEach(function (e, i) {
    var b = document.createElement('span');
    b.className = 'b-balloon';
    b.textContent = e;
    b.style.left = (4 + i * 12 + Math.random() * 6) + '%';
    b.style.animationDelay = (Math.random() * 1.8) + 's';
    b.style.animationDuration = (4.5 + Math.random() * 3) + 's';
    overlay.appendChild(b);
  });

  // Confetti pieces
  var colors = ['#FF6B6B','#FFD166','#06D6A0','#C8A96E','#EF476F','#118AB2','#ffffff','#FFE066'];
  var pieces = [];
  for (var i = 0; i < 160; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 300,
      w: 5 + Math.random() * 8,
      h: 3 + Math.random() * 5,
      color: colors[i % colors.length],
      speed: 1.8 + Math.random() * 2.8,
      drift: (Math.random() - 0.5) * 1.4,
      angle: Math.random() * Math.PI * 2,
      rot: (Math.random() - 0.5) * 0.12
    });
  }

  var rafId;
  var startTime = Date.now();
  var removed = false;

  function tick() {
    var elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dark backdrop fades in then out
    var backdropAlpha = Math.min(1, elapsed / 400) * 0.72;
    if (elapsed > 4200) backdropAlpha *= Math.max(0, 1 - (elapsed - 4200) / 800);
    ctx.fillStyle = 'rgba(10,9,8,' + backdropAlpha + ')';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Confetti alpha
    var confettiAlpha = elapsed > 4000 ? Math.max(0, 1 - (elapsed - 4000) / 700) : 1;

    pieces.forEach(function (p) {
      p.y += p.speed;
      p.x += p.drift;
      p.angle += p.rot;
      if (p.y > canvas.height + 10) { p.y = -12; p.x = Math.random() * canvas.width; }
      ctx.save();
      ctx.globalAlpha = confettiAlpha * 0.9;
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
    overlay.style.transition = 'opacity 0.6s ease';
    overlay.style.opacity = '0';
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 650);
  }

  overlay.addEventListener('click', dismiss);
  overlay.addEventListener('touchend', dismiss, { passive: true });
})();
