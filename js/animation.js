const canvas = document.getElementById('universe');
const ctx = canvas.getContext('2d', { alpha: false });

let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
});

/* =========================
   ICON CONFIG
========================= */

const ICONS = [
  { name: 'kubernetes', src: './img/Kubernetes.png', size: 54 },
  { name: 'docker', src: './img/919853.png', size: 54 },
  { name: 'java', src: './img/java.png', size: 54 },
  { name: 'python', src: './img/Python-Emblem.png', size: 54 },
  { name: 'nginx', src: './img/nginx.webp', size: 54 },
  { name: 'prometheus', src: './img/prometheus.webp', size: 54 },
  { name: 'opentelemetry', src: './img/opentelemetry.png', size: 54 },
  { name: 'datadog', src: './img/datadog.svg', size: 54 },
  { name: 'grafana', src: './img/grafana.png', size: 54 },
  { name: 'jaeger', src: './img/jaeger.png', size: 54 },
  { name: 'victoria', src: './img/victoria.webp', size: 54 },
  { name: 'clickhouse', src: './img/clickhouse.svg', size: 54 }

];

const images = {};
ICONS.forEach(ic => {
  const img = new Image();
  img.src = ic.src;
  images[ic.name] = { img, size: ic.size };
});

/* =========================
   HELPERS
========================= */

const rand = (a, b) => Math.random() * (b - a) + a;

/* =========================
   STARS
========================= */

const stars = Array.from({ length: 150 }, () => ({
  x: rand(0, W),
  y: rand(0, H),
  r: rand(0.3, 1.8),
  hue: Math.random() > 0.6 ? 210 : 35,
  alpha: rand(0.2, 0.9)
}));

/* =========================
   NODES
========================= */

const NODE_COUNT = 28;
const nodes = [];

for (let i = 0; i < NODE_COUNT; i++) {
  const icon = ICONS[i % ICONS.length];

  nodes.push({
    x: rand(-W, W * 1.2),
    y: rand(H * 0.12, H * 0.88),
    vx: rand(0.12, 0.45),
    icon: icon.name,
    size: icon.size * rand(0.9, 1.3),
    phase: Math.random() * Math.PI * 2
  });
}

/* =========================
   CONSTANTS
========================= */

const MAX_CONN = 250;
const YELLOW_CONN = 200;

let time = 0;

/* =========================
   DRAW LOOP
========================= */

function draw() {
  time += 0.016;

  /* Background */
  ctx.fillStyle = '#031028';
  ctx.fillRect(0, 0, W, H);

  const bg = ctx.createRadialGradient(
    W * 0.2, H * 0.3, 50,
    W * 0.2, H * 0.3, W
  );
  bg.addColorStop(0, 'rgba(40,80,160,0.12)');
  bg.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  /* Stars */
  for (const s of stars) {
    const a = s.alpha * (0.6 + 0.4 * Math.sin(time * 2 + s.x * 0.002));
    ctx.beginPath();
    ctx.fillStyle = `hsla(${s.hue},90%,80%,${a})`;
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }

  /* Move nodes */
  for (const n of nodes) {
    n.x += n.vx;
    n.y += Math.sin(time + n.phase) * 0.25;

    if (n.x - n.size > W) {
      n.x = -n.size - rand(50, 300);
    }
  }

  /* =========================
     BLUE / ORANGE CONNECTIONS
  ========================= */

  ctx.lineWidth = 1.2;

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];

      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d = Math.hypot(dx, dy);

      if (d < MAX_CONN) {
        const alpha = 1 - d / MAX_CONN;

        const grd = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        grd.addColorStop(0, `rgba(64,200,255,${0.15 * alpha})`);
        grd.addColorStop(1, `rgba(255,150,60,${0.1 * alpha})`);

        ctx.strokeStyle = grd;
        ctx.shadowBlur = 6 * alpha;
        ctx.shadowColor = 'rgba(203, 255, 80, 0.94)';

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  /* =========================
     YELLOW ICON LINKS
  ========================= */

  ctx.lineWidth = 0.9;

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];

      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d = Math.hypot(dx, dy);

      if (d < YELLOW_CONN) {
        const pulse = 0.6 + 0.4 * Math.sin(time * 2 + i);
        const alpha = (1 - d / YELLOW_CONN) * pulse;

        ctx.strokeStyle = `rgba(255,215,0,${0.35 * alpha})`;
        ctx.shadowBlur = 12 * alpha;
        ctx.shadowColor = 'rgba(253, 200, 86, 0.93)';

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  /* =========================
     DRAW ICONS
  ========================= */

  ctx.shadowBlur = 0;

  for (const n of nodes) {
    const data = images[n.icon];

    if (data && data.img.complete) {
      const s = n.size;

      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.shadowBlur = 18;
      ctx.shadowColor = 'rgba(80,200,255,0.2)';
      ctx.drawImage(data.img, -s / 2, -s / 2, s, s);
      ctx.restore();
    }
  }

  requestAnimationFrame(draw);
}

/* =========================
   START SAFE
========================= */

function start() {
  const ready = Object.values(images).every(v => v.img.complete);
  if (!ready) return setTimeout(start, 100);
  requestAnimationFrame(draw);
}

start();
