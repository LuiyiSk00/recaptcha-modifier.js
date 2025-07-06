// Solo correr si está en popup
if (window.name !== 'recaptchaPopupWindow') return;

const testSiteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

// Detecta y reemplaza sitekey
const els = document.querySelectorAll('.g-recaptcha[data-sitekey]');
els.forEach(el => {
  el.setAttribute('data-sitekey', testSiteKey);

  if (typeof grecaptcha !== 'undefined') {
    const widgetId = grecaptcha.render(el, {
      sitekey: testSiteKey,
      callback: (token) => {
        window.opener.postMessage({
          type: 'recaptcha-token',
          token
        }, '*');
        console.log('[Popup] 🎯 Token enviado al padre:', token);
        setTimeout(() => window.close(), 1000);
      }
    });
    if (el.getAttribute('data-size') === 'invisible') {
      grecaptcha.execute(widgetId);
    }
  }
});
