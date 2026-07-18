document.documentElement.classList.add('js');

const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');
const searchInput = document.querySelector('[data-search]');
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const products = [...document.querySelectorAll('[data-product]')];
const catalogStatus = document.querySelector('[data-status]');
const emptyState = document.querySelector('[data-empty-state]');
const resetSearchButton = document.querySelector('[data-reset-search]');

let activePlatform = 'all';

function normalize(value) {
  return value.trim().toLocaleLowerCase('ru-RU').replace(/ё/g, 'е');
}

function appWord(count) {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return 'приложений';
  if (last === 1) return 'приложение';
  if (last >= 2 && last <= 4) return 'приложения';
  return 'приложений';
}

function updateCounts() {
  document.querySelectorAll('[data-count]').forEach((counter) => {
    const platform = counter.dataset.count;
    const count = platform === 'all'
      ? products.length
      : products.filter((product) => product.dataset.platform === platform).length;
    counter.textContent = String(count);
  });
}

function applyFilters() {
  const query = normalize(searchInput?.value || '');
  let visibleCount = 0;

  products.forEach((product) => {
    const matchesPlatform = activePlatform === 'all' || product.dataset.platform === activePlatform;
    const matchesSearch = !query || normalize(product.dataset.searchText || product.textContent).includes(query);
    const isVisible = matchesPlatform && matchesSearch;
    product.hidden = !isVisible;
    if (isVisible) {
      visibleCount += 1;
      product.classList.add('visible');
    }
  });

  if (catalogStatus) {
    const platformLabel = activePlatform === 'windows' ? 'для Windows' : activePlatform === 'android' ? 'для Android' : 'в каталоге';
    catalogStatus.textContent = query
      ? `Найдено ${visibleCount} ${appWord(visibleCount)} ${platformLabel}`
      : `Доступно ${visibleCount} ${appWord(visibleCount)} ${platformLabel}`;
  }

  if (emptyState) emptyState.hidden = visibleCount !== 0;
}

function activatePlatform(button, moveFocus = false) {
  activePlatform = button.dataset.filter;
  filterButtons.forEach((item) => {
    const isActive = item === button;
    item.classList.toggle('active', isActive);
    item.setAttribute('aria-selected', String(isActive));
    item.tabIndex = isActive ? 0 : -1;
  });
  applyFilters();
  if (moveFocus) button.focus();
}

filterButtons.forEach((button, index) => {
  button.addEventListener('click', () => activatePlatform(button));
  button.addEventListener('keydown', (event) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % filterButtons.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + filterButtons.length) % filterButtons.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = filterButtons.length - 1;
    else return;

    event.preventDefault();
    activatePlatform(filterButtons[nextIndex], true);
  });
});

searchInput?.addEventListener('input', applyFilters);

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === 'k') {
    event.preventDefault();
    searchInput?.focus();
  }
  if (event.key === 'Escape') {
    if (document.activeElement === searchInput && searchInput.value) {
      searchInput.value = '';
      applyFilters();
    } else {
      closeMenu();
    }
  }
});

resetSearchButton?.addEventListener('click', () => {
  if (searchInput) searchInput.value = '';
  const allButton = filterButtons.find((button) => button.dataset.filter === 'all');
  if (allButton) activatePlatform(allButton);
  searchInput?.focus();
});

function closeMenu() {
  navigation?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

menuToggle?.addEventListener('click', () => {
  const willOpen = !navigation?.classList.contains('open');
  navigation?.classList.toggle('open', willOpen);
  menuToggle.setAttribute('aria-expanded', String(willOpen));
  document.body.classList.toggle('menu-open', willOpen);
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

document.querySelectorAll('[data-version-select]').forEach((select) => {
  const card = select.closest('[data-product]');
  const download = card?.querySelector('[data-version-download]');
  const size = card?.querySelector('[data-version-size]');
  const label = card?.querySelector('[data-version-label]');

  select.addEventListener('change', () => {
    const option = select.selectedOptions[0];
    if (download) download.href = option.value;
    if (size) size.textContent = option.dataset.size || '';
    if (label) label.textContent = `Test · v${option.dataset.version || select.value}`;
  });
});

updateCounts();
applyFilters();
