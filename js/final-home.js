const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
menuButton?.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});
mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  header.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
}));
document.querySelector('[data-scroll-film]')?.addEventListener('click', () => document.querySelector('#film')?.scrollIntoView({ behavior: 'smooth' }));
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 24), { passive: true });