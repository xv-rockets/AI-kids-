// Smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Form submission → Formspree (or any endpoint that accepts FormData + JSON Accept header)
const form = document.getElementById('applyForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const action = form.getAttribute('action');

  // Demo mode: if endpoint is still a placeholder, just show success state.
  if (action.includes('YOUR_FORM_ID')) {
    showSuccess();
    console.warn('[PROMPT] Form action is a placeholder — replace YOUR_FORM_ID in index.html');
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.style.opacity = '0.6';

  try {
    const res = await fetch(action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      showSuccess();
    } else {
      alert('Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.');
      btn.disabled = false;
      btn.style.opacity = '1';
    }
  } catch (err) {
    alert('Не удалось отправить. Проверьте подключение к интернету.');
    btn.disabled = false;
    btn.style.opacity = '1';
  }
});

function showSuccess() {
  form.hidden = true;
  success.hidden = false;
  success.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
