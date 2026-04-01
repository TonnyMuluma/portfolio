// main.js — contact form handler + skill bars + misc

// EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'xIE4FmFDD0PTVQHBH';
const EMAILJS_SERVICE_ID = 'service_2uqeinl';
const EMAILJS_TEMPLATE_ID = 'template_u1tww1m';

// Initialise EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Skill bar animation (triggered when bars scroll into view)
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const target = bar.getAttribute('data-width');
        bar.style.width = target + '%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillBarsSection = document.querySelector('.skills-bars');
if (skillBarsSection) barObserver.observe(skillBarsSection);

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');

    const templateParams = {
      from_name: document.getElementById('name').value,
      from_email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
    };

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#28c840';
        btn.style.borderColor = '#28c840';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          btn.disabled = false;
          btn.style.background = '';
          btn.style.borderColor = '';
        }, 3500);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        btn.innerHTML = '<i class="fas fa-times"></i> Failed. Try Again.';
        btn.style.background = '#e53e3e';
        btn.style.borderColor = '#e53e3e';
        btn.disabled = false;
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          btn.style.background = '';
          btn.style.borderColor = '';
        }, 3500);
      });
  });
}