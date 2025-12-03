/**
 * Google Analytics 4 - Configuración
 * Corporación Fuentes y Asociados
 */

(function() {
  'use strict';

  // ===== CONFIGURACIÓN =====
  // IMPORTANTE: Reemplazar 'G-XXXXXXXXXX' con tu ID de medición real de GA4
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
  
  // ===== INICIALIZAR GOOGLE ANALYTICS 4 =====
  function initGA4() {
    // Cargar el script de Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Configurar dataLayer y gtag
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      'send_page_view': true,
      'anonymize_ip': true, // Cumplir con GDPR
      'cookie_flags': 'SameSite=None;Secure'
    });

    console.log('✅ Google Analytics 4 inicializado');
  }

  // ===== TRACKING DE EVENTOS PERSONALIZADOS =====

  /**
   * Track de clicks en botones
   */
  function trackButtons() {
    document.querySelectorAll('.button, a.button, button.button').forEach(button => {
      button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();
        const buttonHref = this.getAttribute('href') || '';
        
        if (window.gtag) {
          gtag('event', 'button_click', {
            'event_category': 'engagement',
            'event_label': buttonText,
            'value': buttonHref
          });
        }
      });
    });
  }

  /**
   * Track de enlaces externos
   */
  function trackExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (link.hostname !== window.location.hostname) {
        link.addEventListener('click', function(e) {
          const url = this.href;
          
          if (window.gtag) {
            gtag('event', 'click', {
              'event_category': 'outbound',
              'event_label': url,
              'transport_type': 'beacon'
            });
          }
        });
      }
    });
  }

  /**
   * Track de emails clickeados
   */
  function trackEmailClicks() {
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const email = this.href.replace('mailto:', '');
        
        if (window.gtag) {
          gtag('event', 'email_click', {
            'event_category': 'contact',
            'event_label': email
          });
        }
      });
    });
  }

  /**
   * Track de teléfonos clickeados
   */
  function trackPhoneClicks() {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const phone = this.href.replace('tel:', '');
        
        if (window.gtag) {
          gtag('event', 'phone_click', {
            'event_category': 'contact',
            'event_label': phone
          });
        }
      });
    });
  }

  /**
   * Track de envío de formularios
   */
  function trackFormSubmissions() {
    const form = document.querySelector('#form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      if (window.gtag) {
        gtag('event', 'form_submit', {
          'event_category': 'engagement',
          'event_label': 'contact_form'
        });
      }
    });
  }

  /**
   * Track de scroll depth
   */
  function trackScrollDepth() {
    const milestones = [25, 50, 75, 100];
    const reached = new Set();
    
    function checkScroll() {
      const scrollPercentage = Math.round(
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100
      );
      
      milestones.forEach(milestone => {
        if (scrollPercentage >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          
          if (window.gtag) {
            gtag('event', 'scroll', {
              'event_category': 'engagement',
              'event_label': `${milestone}%`,
              'value': milestone
            });
          }
        }
      });
    }
    
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /**
   * Track de tiempo en página
   */
  function trackTimeOnPage() {
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      
      if (window.gtag && timeSpent > 5) {
        gtag('event', 'timing_complete', {
          'name': 'page_view',
          'value': timeSpent,
          'event_category': 'engagement'
        });
      }
    });
  }

  /**
   * Track de clicks en redes sociales
   */
  function trackSocialClicks() {
    document.querySelectorAll('.social-icons a').forEach(link => {
      link.addEventListener('click', function(e) {
        const socialNetwork = this.getAttribute('aria-label') || 'Unknown';
        
        if (window.gtag) {
          gtag('event', 'social_click', {
            'event_category': 'social_media',
            'event_label': socialNetwork
          });
        }
      });
    });
  }

  /**
   * Track de búsquedas
   */
  function trackSearches() {
    const searchForm = document.querySelector('#form-search');
    if (!searchForm) return;

    searchForm.addEventListener('submit', function(e) {
      const searchInput = this.querySelector('input[type="text"]');
      const searchTerm = searchInput ? searchInput.value : '';
      
      if (searchTerm && window.gtag) {
        gtag('event', 'search', {
          'search_term': searchTerm,
          'event_category': 'engagement'
        });
      }
    });
  }

  /**
   * Track de errores JavaScript
   */
  function trackErrors() {
    window.addEventListener('error', function(e) {
      if (window.gtag) {
        gtag('event', 'exception', {
          'description': e.message,
          'fatal': false
        });
      }
    });
  }

  /**
   * Track de clicks en servicios
   */
  function trackServiceClicks() {
    const serviceLinks = document.querySelectorAll('a[href*="asesoria"], a[href*="auditoria"], a[href*="outsourcing"]');
    
    serviceLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const serviceName = this.textContent.trim();
        
        if (window.gtag) {
          gtag('event', 'service_view', {
            'event_category': 'services',
            'event_label': serviceName
          });
        }
      });
    });
  }

  /**
   * Track de file downloads (si aplica)
   */
  function trackDownloads() {
    document.querySelectorAll('a[href$=".pdf"], a[href$=".doc"], a[href$=".docx"], a[href$=".zip"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const fileName = this.href.split('/').pop();
        
        if (window.gtag) {
          gtag('event', 'file_download', {
            'event_category': 'downloads',
            'event_label': fileName
          });
        }
      });
    });
  }

  // ===== ENHANCED ECOMMERCE (Opcional) =====
  // Si en el futuro agregas un sistema de cotizaciones o ventas

  function trackQuoteRequest(serviceType, value) {
    if (window.gtag) {
      gtag('event', 'generate_lead', {
        'value': value,
        'currency': 'PEN',
        'service_type': serviceType
      });
    }
  }

  // ===== TRACKING DE CONVERSIONES =====
  
  function trackConversion(conversionType) {
    if (window.gtag) {
      gtag('event', 'conversion', {
        'send_to': GA_MEASUREMENT_ID + '/conversion',
        'event_category': 'conversion',
        'event_label': conversionType
      });
    }
  }

  // ===== USER PROPERTIES =====
  
  function setUserProperties() {
    const userLanguage = navigator.language || 'unknown';
    const deviceType = /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
    
    if (window.gtag) {
      gtag('set', 'user_properties', {
        'preferred_language': userLanguage,
        'device_type': deviceType
      });
    }
  }

  // ===== INICIALIZACIÓN =====
  
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runInit);
    } else {
      runInit();
    }
  }

  function runInit() {
    console.log('📊 Inicializando Google Analytics 4...');
    
    initGA4();
    
    // Esperar a que GA4 esté listo
    setTimeout(() => {
      setUserProperties();
      trackButtons();
      trackExternalLinks();
      trackEmailClicks();
      trackPhoneClicks();
      trackFormSubmissions();
      trackScrollDepth();
      trackTimeOnPage();
      trackSocialClicks();
      trackSearches();
      trackErrors();
      trackServiceClicks();
      trackDownloads();
      
      console.log('✅ Tracking de eventos configurado');
    }, 1000);
  }

  // Iniciar
  init();

  // Exponer funciones globalmente si es necesario
  window.trackConversion = trackConversion;
  window.trackQuoteRequest = trackQuoteRequest;

})();

// ===== INSTRUCCIONES DE USO =====
/*

1. OBTENER ID DE GOOGLE ANALYTICS 4:
   - Ve a https://analytics.google.com
   - Crea una propiedad GA4 si no tienes una
   - Copia tu ID de medición (formato: G-XXXXXXXXXX)
   - Reemplaza 'G-XXXXXXXXXX' en la línea 11 de este archivo

2. INCLUIR EN TUS PÁGINAS HTML:
   <script src="js/analytics.js" defer></script>

3. EVENTOS PERSONALIZADOS DISPONIBLES:
   - button_click: Clicks en botones
   - outbound: Enlaces externos
   - email_click: Clicks en emails
   - phone_click: Clicks en teléfonos
   - form_submit: Envíos de formularios
   - scroll: Profundidad de scroll (25%, 50%, 75%, 100%)
   - social_click: Clicks en redes sociales
   - search: Búsquedas realizadas
   - service_view: Visualización de servicios
   - file_download: Descargas de archivos

4. TRACKING MANUAL DE CONVERSIONES:
   window.trackConversion('tipo_conversion');

5. TRACKING DE COTIZACIONES:
   window.trackQuoteRequest('tipo_servicio', valor);

6. VER DATOS:
   - Accede a https://analytics.google.com
   - Selecciona tu propiedad
   - Ve a Informes > Tiempo real (para ver datos en vivo)
   - Ve a Informes > Eventos (para ver eventos personalizados)

7. CUMPLIMIENTO GDPR/PRIVACIDAD:
   - Este script tiene anonymize_ip activado
   - Considera agregar un banner de cookies
   - Actualiza tu política de privacidad

*/

