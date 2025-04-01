const intro = document.getElementById('intro-screen');
const mainSite = document.getElementById('main-site');
const bgMusic = document.getElementById('bg-music');

intro.addEventListener('click', () => {
  intro.style.display = 'none';
  mainSite.classList.add('show');
  document.body.classList.add('cursor-active'); // Activate custom cursor
  bgMusic.volume = 0.5;
  bgMusic.play();
});

const particles = [];

document.addEventListener('mousemove', (e) => {
  if (!document.body.classList.contains('cursor-active')) return;

  for (let i = 0; i < 5; i++) { // Emit multiple per move for burst effect
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 6 + 4;
    const colors = ['#00fff7', '#ff00e0', '#8e00ff', '#00ff94', '#fffa00'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const x = e.clientX;
    const y = e.clientY;

    const velX = (Math.random() - 0.5) * 4; // Horizontal burst
    const velY = Math.random() * -4 - 1;    // Upward burst

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.background = color;
    particle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
    particle.style.filter = 'blur(1px)';
    particle.style.position = 'fixed';

    document.body.appendChild(particle);

    particles.push({
      el: particle,
      x,
      y,
      velX,
      velY,
      alpha: 1,
      life: 0
    });
  }
});

// Animate particles
function animateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.velX;
    p.y += p.velY;
    p.velY += 0.15; // gravity
    p.life += 1;
    p.alpha -= 0.02;

    p.el.style.left = `${p.x}px`;
    p.el.style.top = `${p.y}px`;
    p.el.style.opacity = p.alpha;

    if (p.alpha <= 0 || p.life > 60) {
      p.el.remove();
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();
