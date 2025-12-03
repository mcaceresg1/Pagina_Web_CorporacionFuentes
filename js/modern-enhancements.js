/**
 * MEJORAS MODERNAS - Corporación Fuentes y Asociados
 * JavaScript para funcionalidades interactivas modernas
 */

(function() {
  'use strict';

  // ===== CONFIGURACIÓN =====
  const config = {
    scrollTopThreshold: 300,
    observerThreshold: 0.1,
    debounceDelay: 150
  };

  // ===== UTILIDADES =====
  
  /**
   * Debounce function para optimizar eventos
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function
   */
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // ===== SCROLL TO TOP BUTTON =====
  
  function initScrollToTop() {
    // Crear botón si no existe
    let scrollBtn = document.querySelector('.scroll-to-top');
    if (!scrollBtn) {
      scrollBtn = document.createElement('button');
      scrollBtn.className = 'scroll-to-top';
      scrollBtn.innerHTML = '↑';
      scrollBtn.setAttribute('aria-label', 'Volver arriba');
      document.body.appendChild(scrollBtn);
    }

    // Mostrar/ocultar basado en scroll
    const toggleScrollButton = () => {
      if (window.pageYOffset > config.scrollTopThreshold) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    };

    // Event listeners
    window.addEventListener('scroll', throttle(toggleScrollButton, 100));
    
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== NAVEGACIÓN CON SCROLL =====
  
  function initStickyNav() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', throttle(handleScroll, 100));
  }

  // ===== ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER) =====
  
  function initScrollAnimations() {
    // Elementos a animar
    const animatedElements = document.querySelectorAll(
      '.block-1 > div, .block-2 > div, .block-3 > div, h2, h3'
    );

    if (!animatedElements.length) return;

    const observerOptions = {
      threshold: config.observerThreshold,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Añadir delay escalonado
          setTimeout(() => {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.style.opacity = '1';
          }, index * 100);
          
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  // ===== LAZY LOADING DE IMÁGENES =====
  
  function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
      // El navegador soporta lazy loading nativo
      return;
    }

    // Fallback para navegadores antiguos
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // ===== VALIDACIÓN DE FORMULARIO =====
  
  function initFormValidation() {
    const form = document.querySelector('#form');
    if (!form) return;

    // Validación en tiempo real
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });

      input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
          validateField(this);
        }
      });
    });

    // Envío del formulario
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      let isValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (isValid) {
        await handleFormSubmit(form);
      }
    });
  }

  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name');
    let error = '';

    // Limpiar error previo
    removeFieldError(field);

    // Validaciones
    if (field.hasAttribute('required') && !value) {
      error = 'Este campo es obligatorio';
    } else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Ingrese un email válido';
      }
    } else if (field.type === 'tel' && value) {
      const phoneRegex = /^[0-9]{6,}$/;
      if (!phoneRegex.test(value.replace(/[\s\-]/g, ''))) {
        error = 'Ingrese un teléfono válido';
      }
    }

    if (error) {
      showFieldError(field, error);
      return false;
    }

    return true;
  }

  function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#ef4444';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentElement.appendChild(errorDiv);
  }

  function removeFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';
    
    const errorDiv = field.parentElement.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  async function handleFormSubmit(form) {
    // Mostrar loader
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loader"></span> Enviando...';

    try {
      const formData = new FormData(form);
      
      const response = await fetch('validar.php', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        showAlert('success', '¡Mensaje enviado exitosamente! Nos contactaremos pronto.');
        form.reset();
      } else {
        showAlert('error', result.message || 'Ocurrió un error. Por favor intente nuevamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert('error', 'Error al enviar el formulario. Por favor intente nuevamente.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  function showAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '10000';
    alert.style.maxWidth = '400px';
    alert.style.animation = 'slideInRight 0.3s ease-out';
    
    document.body.appendChild(alert);

    setTimeout(() => {
      alert.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => alert.remove(), 300);
    }, 5000);
  }

  // ===== SMOOTH SCROLL PARA ENLACES INTERNOS =====
  
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ===== MEJORAR EXPERIENCIA DE BÚSQUEDA =====
  
  function initSearchEnhancements() {
    const searchInput = document.querySelector('#form-search input');
    if (!searchInput) return;

    // Placeholder animado
    const placeholders = [
      'Buscar servicios...',
      'Asesoría contable...',
      'Auditoría...',
      'Consultoría tributaria...'
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
      currentIndex = (currentIndex + 1) % placeholders.length;
      searchInput.placeholder = placeholders[currentIndex];
    }, 3000);
  }

  // ===== DETECCIÓN DE DISPOSITIVO TÁCTIL =====
  
  function detectTouchDevice() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.body.classList.add('touch-device');
    } else {
      document.body.classList.add('no-touch');
    }
  }

  // ===== PERFORMANCE MONITORING =====
  
  function logPerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = window.performance.timing;
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
          const connectTime = perfData.responseEnd - perfData.requestStart;
          
          console.log('📊 Performance Metrics:');
          console.log(`⏱️  Page Load Time: ${pageLoadTime}ms`);
          console.log(`🔌 Connection Time: ${connectTime}ms`);
        }, 0);
      });
    }
  }

  // ===== ANIMACIÓN DE NÚMEROS (COUNTER) =====
  
  function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-counter'));
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target;
              }
            };
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      });

      observer.observe(counter);
    });
  }

  // ===== INICIALIZACIÓN =====
  
  function init() {
    // Esperar a que el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runInit);
    } else {
      runInit();
    }
  }

  function runInit() {
    console.log('🚀 Iniciando mejoras modernas...');
    
    detectTouchDevice();
    initScrollToTop();
    initStickyNav();
    initScrollAnimations();
    initLazyLoading();
    initFormValidation();
    initSmoothScroll();
    initSearchEnhancements();
    initCounterAnimations();
    logPerformance();
    
    console.log('✅ Mejoras modernas cargadas');
  }

  // Iniciar
  init();

})();

// ===== ANIMACIONES CSS ADICIONALES =====
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateX(20px);
    }
  }
  
  input.error, textarea.error {
    animation: shake 0.3s ease-in-out;
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
`;
document.head.appendChild(style);

