// animations.js — scroll-triggered fade-in

// Add fade-up to key elements before observer runs
document.querySelectorAll('.section-title, .project-card, .skill-category').forEach(el => {
  if (!el.classList.contains('fade-up')) el.classList.add('fade-up');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-up, .stagger-children').forEach(el => {
  observer.observe(el);
});