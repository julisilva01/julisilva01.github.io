/* Hero particle network: vanilla JS, no dependencies. */
(function () {
  var canvas = document.getElementById('hero-canvas');
  if (!canvas || !canvas.getContext) return;
  var hero = canvas.closest('.hero'), ctx = canvas.getContext('2d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var W = 0, H = 0, dpr = 1, pts = [], LINK = 140, mouse = { x: -9999, y: -9999, on: false };
  var running = false, visible = true, raf = 0, last = 0;

  function build() {
    var r = hero.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    LINK = W < 600 ? 110 : 140;
    var n = Math.round(Math.min(W < 600 ? 45 : 110, (W * H) / 9000));
    pts = [];
    for (var i = 0; i < n; i++) {
      var amber = Math.random() < 0.1;
      pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        r: amber ? 2.2 : 1 + Math.random() * 1.3, amber: amber
      });
    }
  }

  function step(dt) {
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      if (mouse.on) { // gentle attraction toward the cursor
        var dx = mouse.x - p.x, dy = mouse.y - p.y, d2 = dx * dx + dy * dy;
        if (d2 < 40000 && d2 > 1) { var f = 0.012 / Math.sqrt(d2); p.vx += dx * f; p.vy += dy * f; }
      }
      var sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (sp > 0.9) { p.vx *= 0.9 / sp; p.vy *= 0.9 / sp; }
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var ox = mouse.on ? (mouse.x / W - 0.5) * -14 : 0, oy = mouse.on ? (mouse.y / H - 0.5) * -10 : 0; // parallax
    ctx.lineWidth = 0.8;
    for (var i = 0; i < pts.length; i++) {
      var a = pts[i];
      for (var j = i + 1; j < pts.length; j++) {
        var b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          var o = (1 - Math.sqrt(d2) / LINK) * 0.45;
          ctx.strokeStyle = (a.amber || b.amber) ? 'rgba(245,165,36,' + o * 0.8 + ')' : 'rgba(160,200,255,' + o + ')';
          ctx.beginPath(); ctx.moveTo(a.x + ox, a.y + oy); ctx.lineTo(b.x + ox, b.y + oy); ctx.stroke();
        }
      }
      if (mouse.on) {
        var mx = a.x - mouse.x, my = a.y - mouse.y, md = mx * mx + my * my;
        if (md < 32400) {
          ctx.strokeStyle = 'rgba(200,225,255,' + (1 - Math.sqrt(md) / 180) * 0.35 + ')';
          ctx.beginPath(); ctx.moveTo(a.x + ox, a.y + oy); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    }
    for (var k = 0; k < pts.length; k++) {
      var p = pts[k];
      ctx.fillStyle = p.amber ? 'rgba(245,165,36,.85)' : 'rgba(220,235,255,.75)';
      ctx.beginPath(); ctx.arc(p.x + ox, p.y + oy, p.r, 0, 6.2832); ctx.fill();
    }
  }

  function loop(t) {
    var dt = last ? Math.min((t - last) / 16.67, 3) : 1; last = t;
    step(dt); draw();
    raf = requestAnimationFrame(loop);
  }
  function start() { if (!running && visible && !document.hidden && !reduce.matches) { running = true; last = 0; raf = requestAnimationFrame(loop); } }
  function stop() { running = false; cancelAnimationFrame(raf); }
  function refresh() { stop(); build(); draw(); start(); }

  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(refresh, 150); });
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; visible ? start() : stop(); }).observe(hero);
  }
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    hero.addEventListener('mousemove', function (e) { var r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true; });
    hero.addEventListener('mouseleave', function () { mouse.on = false; });
  }
  if (reduce.addEventListener) reduce.addEventListener('change', refresh);
  refresh(); // reduced motion: static frame only
})();
