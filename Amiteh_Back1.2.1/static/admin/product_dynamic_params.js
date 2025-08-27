// static/admin/product_dynamic_params.js
(function () {
  const PARAM_COUNT = 7;

  function qs(sel) { return document.querySelector(sel); }
  function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

  function getFieldRow(input) {
    if (!input) return null;
    // Django admin wraps fields differently across versions/themes.
    // Try a few likely ancestors:
    return (
      input.closest('.form-row') ||                   // classic
      input.closest('.form-group') ||                 // bootstrap-like
      input.closest(`[class*="field-"]`) ||           // modern per-field wrapper
      input.parentElement
    );
  }

  function setParamVisible(paramName, visible, labelText) {
    const input = qs(`#id_${paramName}`);
    if (!input) return;
    const row = getFieldRow(input);
    if (!row) return;

    // Show/hide row
    row.style.display = visible ? "" : "none";
    input.hidden = !visible;

    // Update the label text if provided
    if (visible && labelText) {
      const lbl = row.querySelector(`label[for="id_${paramName}"]`) || row.querySelector("label");
      if (lbl) lbl.textContent = labelText;
    }
  }

  function hideAllParams() {
    for (let i = 1; i <= PARAM_COUNT; i++) {
      setParamVisible(`parameter${i}`, false);
    }
  }

  function applyLabelsMap(labelsMap) {
    // labelsMap is { "1": "Bandwidth", "2": "Sample Rate", ... }
    hideAllParams();
    if (!labelsMap) return;
    Object.entries(labelsMap).forEach(([idx, lbl]) => {
      if (!lbl) return;
      const name = `parameter${idx}`;
      setParamVisible(name, true, lbl);
    });
  }

  // Build base URL for fetch: works for /add/ and /<id>/change/
  function getAdminBasePath() {
    // Prefer form action (more stable); fall back to pathname
    const form = qs('form');
    const action = form ? form.getAttribute('action') : window.location.pathname;
    // Remove trailing "add/" or "change/"
    return action.replace(/(add|change)\/?$/, '');
  }

  function fetchLabels(pk) {
    if (!pk) return Promise.resolve({ labels: {} });
    const base = getAdminBasePath();
    const url = `${base}category-labels/${pk}/`;
    return fetch(url, { credentials: 'same-origin' })  // same-origin cookie (csrf not needed for GET)
      .then(r => r.ok ? r.json() : { labels: {} })
      .catch(() => ({ labels: {} }));
  }

  function init() {
    const categorySelect = qs('#id_category');
    if (!categorySelect) return;

    // On initial load, if a category is already selected, fetch labels
    const initial = categorySelect.value;
    if (initial) {
      fetchLabels(initial).then(data => applyLabelsMap(data.labels));
    } else {
      hideAllParams();
    }

    // On change, fetch and apply
    categorySelect.addEventListener('change', () => {
      const val = categorySelect.value;
      if (!val) {
        hideAllParams();
        return;
      }
      fetchLabels(val).then(data => applyLabelsMap(data.labels));
    });
  }

  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
