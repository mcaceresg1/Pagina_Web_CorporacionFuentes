/**
 * MANEJO DE COOKIES GDPR
 * Banner de consentimiento de cookies
 */

(function() {
  'use strict';

  // Verificar si ya aceptó las cookies
  function hasAcceptedCookies() {
    return localStorage.getItem('cookies-accepted') === 'true';
  }

  // Mostrar banner
  function showCookieBanner() {
    if (hasAcceptedCookies()) {
      return;
    }

    // Crear banner si no existe
    let banner = document.getElementById('cookie-banner');
    if (!banner) {
      banner = createCookieBanner();
      document.body.appendChild(banner);
    }

    setTimeout(() => {
      banner.classList.add('show');
    }, 1000);
  }

  // Crear HTML del banner
  function createCookieBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.innerHTML = `
      <div class="cookie-content">
        <div class="cookie-text">
          <h4>🍪 Uso de Cookies</h4>
          <p>Utilizamos cookies para mejorar su experiencia en nuestro sitio web y analizar el tráfico. Al continuar navegando, acepta nuestro uso de cookies.</p>
        </div>
        <div class="cookie-buttons">
          <button class="cookie-btn cookie-accept" onclick="acceptCookies()">Aceptar</button>
          <button class="cookie-btn cookie-decline" onclick="declineCookies()">Rechazar</button>
        </div>
      </div>
    `;
    return banner;
  }

  // Aceptar cookies
  window.acceptCookies = function() {
    localStorage.setItem('cookies-accepted', 'true');
    hideCookieBanner();
    
    // Activar Google Analytics si está configurado
    if (window.gtag) {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  // Rechazar cookies
  window.declineCookies = function() {
    localStorage.setItem('cookies-accepted', 'false');
    hideCookieBanner();
    
    // Desactivar Google Analytics
    if (window.gtag) {
      gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  // Ocultar banner
  function hideCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 500);
    }
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showCookieBanner);
  } else {
    showCookieBanner();
  }

})();

