const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const toast = document.querySelector('[data-toast]');

const setHeaderState = () => header?.classList.toggle('scrolled', window.scrollY > 16);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelector('[data-year]').textContent = new Date().getFullYear();

document.querySelectorAll('[data-copy-hash]').forEach((button) => {
  button.addEventListener('click', async () => {
    const hash = button.closest('.hash-row')?.querySelector('code')?.textContent?.trim();
    if (!hash) return;
    try {
      await navigator.clipboard.writeText(hash);
      button.textContent = 'Готово';
      toast?.classList.add('visible');
      window.setTimeout(() => {
        button.textContent = 'Копировать';
        toast?.classList.remove('visible');
      }, 1800);
    } catch {
      button.textContent = 'Выделите вручную';
    }
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1, rootMargin: '0px 0px -40px' });
  revealItems.forEach((item) => observer.observe(item));
}

