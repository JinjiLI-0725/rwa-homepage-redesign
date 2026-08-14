const header = document.querySelector('.header');
const menu = document.querySelector('.menu');
menu?.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menu.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.mobile-nav a').forEach((link) => link.addEventListener('click', () => header.classList.remove('menu-open')));
document.querySelector('[data-film]')?.addEventListener('click', () => document.querySelector('#film')?.scrollIntoView({behavior:'smooth'}));
const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('shown'); reveal.unobserve(entry.target); }
}), {threshold:.12});
document.querySelectorAll('.reveal').forEach((element) => reveal.observe(element));
window.addEventListener('scroll', () => header.classList.toggle('compact', window.scrollY > 25), {passive:true});