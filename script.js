// ============================
// Typed text animation
// ============================
const typedEl = document.getElementById('typedText');
const phrases = [
  'AI / ML Developer',
  'Web3 Builder',
  'Full‑Stack Developer',
  'XAI Researcher',
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
let pauseAfterTyping = false;

function type() {
  const current = phrases[phraseIndex];

  if (!deleting && !pauseAfterTyping) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      pauseAfterTyping = true;
      setTimeout(() => {
        pauseAfterTyping = false;
        deleting = true;
        type();
      }, 1800);
      return;
    }
  } else if (deleting) {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = deleting ? 50 : 90;
  setTimeout(type, speed);
}

type();

// ============================
// Navbar scroll effect
// ============================
const navbar = document.getElementById('navbar');

function handleScroll() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  highlightNav();
}

window.addEventListener('scroll', handleScroll, { passive: true });

// ============================
// Active nav link highlight
// ============================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNav() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ============================
// Mobile nav toggle
// ============================
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const isOpen = navMenu.classList.contains('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============================
// Scroll-reveal animation
// ============================
const revealEls = document.querySelectorAll(
  '.skill-card, .project-card, .contact-card, .about-grid, .about-facts li'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => observer.observe(el));

// ============================
// Footer year
// ============================
document.getElementById('year').textContent = new Date().getFullYear();
