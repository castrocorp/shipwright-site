// ============================================
// Shipwright — Main JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initPipelineAnimation();
  initCodeCopy();
  initMobileNav();
});

// --- Scroll Reveal ---
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// --- Pipeline Steps Animation ---
function initPipelineAnimation() {
  const steps = document.querySelectorAll('.pipeline-step');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pipeline = entry.target.closest('.pipeline');
        if (!pipeline) return;

        pipeline.querySelectorAll('.pipeline-step').forEach((step, i) => {
          setTimeout(() => step.classList.add('visible'), i * 120);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  if (steps.length > 0) {
    observer.observe(steps[0]);
  }
}

// --- Copy Code Block ---
function initCodeCopy() {
  document.querySelectorAll('.code-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const block = btn.closest('.code-block');
      const code = block.querySelector('code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = original, 1500);
      });
    });
  });
}

// --- Mobile Nav ---
function initMobileNav() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const links = document.querySelector('.nav-links');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('nav-open');
    toggle.textContent = links.classList.contains('nav-open') ? '\u2715' : '\u2630';
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('nav-open');
      toggle.textContent = '\u2630';
    });
  });
}
