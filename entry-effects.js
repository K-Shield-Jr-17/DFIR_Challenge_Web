(() => {
  const key = 'trace.visual-effects';
  const button = document.querySelector('#effects-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let explicitPreference = false;
  let enabled = !reducedMotion.matches;
  try {
    const saved = localStorage.getItem(key);
    if (saved === 'on' || saved === 'off') { enabled = saved === 'on'; explicitPreference = true; }
  } catch { /* The switch still works when browser storage is unavailable. */ }
  function apply() {
    document.body.classList.toggle('effects-enabled', enabled);
    button.setAttribute('aria-checked', String(enabled));
    button.querySelector('.effects-state').textContent = enabled ? 'ON' : 'OFF';
  }
  button.addEventListener('click', () => {
    enabled = !enabled;
    explicitPreference = true;
    apply();
    try { localStorage.setItem(key, enabled ? 'on' : 'off'); } catch {}
  });
  reducedMotion.addEventListener('change', () => {
    if (!explicitPreference) { enabled = !reducedMotion.matches; apply(); }
  });
  apply();
  button.hidden = false;
})();
