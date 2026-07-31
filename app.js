document.documentElement.classList.add("js");

const apps = Array.isArray(window.RADMIR_APPS) ? window.RADMIR_APPS : [];
const appList = document.querySelector("[data-app-list]");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const searchShell = document.querySelector("[data-search-shell]");
const searchInput = document.querySelector("[data-search]");
const catalogStatus = document.querySelector("[data-status]");
const emptyState = document.querySelector("[data-empty-state]");
const resetSearchButton = document.querySelector("[data-reset-search]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");

let activePlatform = "all";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalize(value) {
  return String(value).trim().toLocaleLowerCase("ru-RU").replaceAll("ё", "е");
}

function appWord(count) {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return "приложений";
  if (last === 1) return "приложение";
  if (last >= 2 && last <= 4) return "приложения";
  return "приложений";
}

function renderVisual(app) {
  if (app.visual === "algomotion") {
    return '<div class="algo-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>';
  }
  if (app.visual === "keyboard") {
    return '<div class="keyboard-mini" aria-hidden="true"><div class="keyboard-mini-row"><i>Й</i><i>Ц</i><i>У</i><i>К</i></div><div class="keyboard-mini-row"><i>Ф</i><i>Ы</i><i>В</i></div><div class="keyboard-mini-row"><i>123</i><i>RU · EN</i><i>⌫</i></div></div>';
  }
  if (app.visual === "password") {
    return '<div class="vault-mini" aria-hidden="true"><span></span><i>•••</i></div>';
  }
  return `<img src="${escapeHtml(app.icon || "")}" alt="">`;
}

function versionOptions(app) {
  if (app.versions.length <= 1) {
    return `<span class="version-static">Версия ${escapeHtml(app.versions[0].version)}</span>`;
  }
  const options = app.versions.map((item, index) => (
    `<option value="${escapeHtml(item.version)}"${index === 0 ? " selected" : ""}>${escapeHtml(item.version)}${index === 0 ? " — текущая" : " — предыдущая"}</option>`
  )).join("");
  return `<label class="version-control"><span>Выберите версию</span><select data-version-select aria-label="Версия ${escapeHtml(app.name)}">${options}</select></label>`;
}

function changeDetails(version, appName) {
  if (!version.changes) return "";
  return `
    <details class="change-details" data-change-details>
      <summary>Что изменилось в версии ${escapeHtml(version.version)}</summary>
      <div class="change-grid">
        <p><b>Добавлено</b><span data-change-added>${escapeHtml(version.changes.added)}</span></p>
        <p><b>Убрано</b><span data-change-removed>${escapeHtml(version.changes.removed)}</span></p>
      </div>
    </details>`;
}

function renderApps() {
  if (!appList) return;
  appList.innerHTML = apps.map((app, index) => {
    const current = app.versions[0];
    const features = app.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("");
    return `
      <article class="app-row reveal" data-product data-app-id="${escapeHtml(app.id)}" data-platform="${escapeHtml(app.platform)}" data-search-text="${escapeHtml([app.name, app.platformLabel, app.description, ...app.features].join(" "))}">
        <span class="app-index">${String(index + 1).padStart(2, "0")}</span>
        <div class="app-visual visual-${escapeHtml(app.visual)}">${renderVisual(app)}</div>
        <div class="app-info">
          <div class="app-kicker"><span>${escapeHtml(app.platformLabel)}</span><span class="app-badge${app.updated ? " updated" : app.new ? " new" : ""}" data-status-badge>${app.updated ? "Обновлено" : app.new ? "Новое" : escapeHtml(current.status)}</span></div>
          <h3>${escapeHtml(app.name)}</h3>
          <p class="app-description">${escapeHtml(app.description)}</p>
          <ul class="feature-list">${features}</ul>
          ${changeDetails(current, app.name)}
        </div>
        <div class="app-download">
          ${versionOptions(app)}
          <div class="file-meta"><span data-version-date>${escapeHtml(current.date)}</span><span data-version-size>${escapeHtml(current.size)}</span></div>
          <a class="download-button" data-version-download href="${escapeHtml(current.url)}">Скачать ${escapeHtml(app.fileType)} <span aria-hidden="true">↓</span></a>
        </div>
      </article>`;
  }).join("");
}

function updateCounts() {
  document.querySelectorAll("[data-app-count]").forEach((node) => { node.textContent = String(apps.length); });
  document.querySelectorAll("[data-count]").forEach((node) => {
    const platform = node.dataset.count;
    const count = platform === "all" ? apps.length : apps.filter((app) => app.platform === platform).length;
    node.textContent = String(count);
  });
}

function visibleProducts() {
  return [...document.querySelectorAll("[data-product]")];
}

function applyFilters() {
  const query = normalize(searchInput?.value || "");
  let visibleCount = 0;
  visibleProducts().forEach((product) => {
    const matchesPlatform = activePlatform === "all" || product.dataset.platform === activePlatform;
    const matchesSearch = !query || normalize(product.dataset.searchText || product.textContent).includes(query);
    const visible = matchesPlatform && matchesSearch;
    product.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  const platformText = activePlatform === "windows" ? "для Windows" : activePlatform === "android" ? "для Android" : "в каталоге";
  if (catalogStatus) catalogStatus.textContent = `Доступно ${visibleCount} ${appWord(visibleCount)} ${platformText}`;
  if (emptyState) emptyState.hidden = visibleCount !== 0;
}

function activatePlatform(button, focus = false) {
  activePlatform = button.dataset.filter;
  filterButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });
  applyFilters();
  if (focus) button.focus();
}

function initializeVersionSelectors() {
  document.querySelectorAll("[data-product]").forEach((row) => {
    const app = apps.find((item) => item.id === row.dataset.appId);
    const select = row.querySelector("[data-version-select]");
    if (!app || !select) return;

    select.addEventListener("change", () => {
      const selected = app.versions.find((item) => item.version === select.value) || app.versions[0];
      const download = row.querySelector("[data-version-download]");
      const size = row.querySelector("[data-version-size]");
      const date = row.querySelector("[data-version-date]");
      const summary = row.querySelector("[data-change-details] summary");
      const added = row.querySelector("[data-change-added]");
      const removed = row.querySelector("[data-change-removed]");

      if (download) download.href = selected.url;
      if (size) size.textContent = selected.size;
      if (date) date.textContent = selected.date;
      if (summary) summary.textContent = `Что изменилось в версии ${selected.version}`;
      if (added) added.textContent = selected.changes?.added || "Описание изменений не указано.";
      if (removed) removed.textContent = selected.changes?.removed || "—";
    });
  });
}

function initializeFilters() {
  filterButtons.forEach((button, index) => {
    button.addEventListener("click", () => activatePlatform(button));
    button.addEventListener("keydown", (event) => {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % filterButtons.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + filterButtons.length) % filterButtons.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = filterButtons.length - 1;
      else return;
      event.preventDefault();
      activatePlatform(filterButtons[next], true);
    });
  });
}

function closeMenu() {
  navigation?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function initializeMenu() {
  menuToggle?.addEventListener("click", () => {
    const open = !navigation?.classList.contains("open");
    navigation?.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
  navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
}

function initializeReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.07, rootMargin: "0px 0px -28px" });
  revealItems.forEach((item) => observer.observe(item));
}

renderApps();
updateCounts();
initializeVersionSelectors();
initializeFilters();
initializeMenu();
initializeReveal();
applyFilters();

if (searchShell) searchShell.hidden = apps.length < 6;
searchInput?.addEventListener("input", applyFilters);
resetSearchButton?.addEventListener("click", () => {
  if (searchInput) searchInput.value = "";
  const allButton = filterButtons.find((button) => button.dataset.filter === "all");
  if (allButton) activatePlatform(allButton);
});

document.addEventListener("keydown", (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === "k" && searchShell && !searchShell.hidden) {
    event.preventDefault();
    searchInput?.focus();
  }
  if (event.key === "Escape") closeMenu();
});

document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = String(new Date().getFullYear()); });
