(() => {
  const key = 'trace.color-theme';
  const root = document.documentElement;
  let theme = 'dark';
  try { const saved = localStorage.getItem(key); if (saved === 'light' || saved === 'dark') theme = saved; } catch {}
  root.dataset.theme = theme;
  let button;
  function update() {
    root.dataset.theme = theme;
    if (!button) return;
    button.textContent = theme === 'dark' ? '☾ 블랙' : '☼ 화이트';
    button.setAttribute('aria-pressed', String(theme === 'dark'));
    button.setAttribute('aria-label', '블랙 모드');
    button.title = theme === 'dark' ? '화이트 모드로 변경' : '블랙 모드로 변경';
  }
  document.addEventListener('DOMContentLoaded', () => {
    button = document.createElement('button');
    button.type = 'button'; button.className = 'theme-toggle';
    button.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark'; update();
      try { localStorage.setItem(key, theme); } catch {}
    });
    const header = document.querySelector('.entry-header, .top-right');
    if (header) header.append(button);
    update();
  });
  window.addEventListener('storage', event => {
    if (event.key === key) { theme = event.newValue === 'light' ? 'light' : 'dark'; update(); }
  });
})();
