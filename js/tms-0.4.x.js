/**
 * Simple Slider - Reemplazo para TMS
 * Corporación Fuentes y Asociados
 */

(function($) {
  'use strict';
  
  $.fn._TMS = function(options) {
    return this.each(function() {
      const slider = $(this);
      const items = slider.find('.items li');
      
      if (items.length === 0) return;
      
      const settings = $.extend({
        show: 0,
        slideshow: 7000,
        duration: 1000,
        preset: 'fade'
      }, options);
      
      let currentIndex = settings.show;
      let interval;
      
      // Ocultar todos excepto el primero
      items.hide().eq(currentIndex).show();
      
      // Función para mostrar slide
      function showSlide(index) {
        items.eq(currentIndex).fadeOut(settings.duration);
        currentIndex = index;
        items.eq(currentIndex).fadeIn(settings.duration);
      }
      
      // Función para siguiente slide
      function nextSlide() {
        const next = (currentIndex + 1) % items.length;
        showSlide(next);
      }
      
      // Auto-play
      if (settings.slideshow) {
        interval = setInterval(nextSlide, settings.slideshow);
        
        // Pausar en hover si está configurado
        if (settings.pauseOnHover) {
          slider.hover(
            function() { clearInterval(interval); },
            function() { interval = setInterval(nextSlide, settings.slideshow); }
          );
        }
      }
      
      // Paginación si está configurada
      if (settings.pagination) {
        const pagination = $('<div class="pagination"></div>');
        
        for (let i = 0; i < items.length; i++) {
          const dot = $('<span></span>')
            .addClass(i === currentIndex ? 'active' : '')
            .on('click', function() {
              clearInterval(interval);
              showSlide(i);
              pagination.find('span').removeClass('active');
              $(this).addClass('active');
              if (settings.slideshow) {
                interval = setInterval(nextSlide, settings.slideshow);
              }
            });
          pagination.append(dot);
        }
        
        slider.append(pagination);
        
        // Actualizar paginación en cada cambio
        const originalShowSlide = showSlide;
        showSlide = function(index) {
          originalShowSlide(index);
          pagination.find('span').removeClass('active').eq(index).addClass('active');
        };
      }
    });
  };
  
})(jQuery);

