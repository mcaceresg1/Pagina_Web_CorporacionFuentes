/**
 * SLIDER SIMPLE Y CONFIABLE
 * No depende de plugins externos
 */

(function() {
  'use strict';

  let currentSlide = 0;
  let slides = [];
  let sliderInterval;

  function initSlider() {
    slides = document.querySelectorAll('.slider .items li');
    
    if (slides.length === 0) {
      console.log('No hay slides para mostrar');
      return;
    }

    console.log(`Slider inicializado con ${slides.length} imágenes`);

    // Ocultar todos los slides excepto el primero
    slides.forEach((slide, index) => {
      if (index === 0) {
        slide.style.opacity = '1';
        slide.style.zIndex = '2';
      } else {
        slide.style.opacity = '0';
        slide.style.zIndex = '1';
      }
    });

    // Iniciar rotación automática cada 7 segundos
    startAutoSlide();

    // Crear paginación si no existe
    createPagination();
  }

  function showSlide(index) {
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }

    // Ocultar slide actual
    slides[currentSlide].style.opacity = '0';
    slides[currentSlide].style.zIndex = '1';

    // Mostrar nuevo slide
    currentSlide = index;
    slides[currentSlide].style.opacity = '1';
    slides[currentSlide].style.zIndex = '2';

    // Actualizar paginación
    updatePagination();

    console.log(`Mostrando slide ${currentSlide + 1} de ${slides.length}`);
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function goToSlide(index) {
    showSlide(index);
    // Reiniciar el intervalo
    stopAutoSlide();
    startAutoSlide();
  }

  function startAutoSlide() {
    sliderInterval = setInterval(() => {
      nextSlide();
    }, 7000); // 7 segundos
  }

  function stopAutoSlide() {
    if (sliderInterval) {
      clearInterval(sliderInterval);
    }
  }

  function createPagination() {
    const sliderContainer = document.querySelector('.slider');
    if (!sliderContainer || slides.length === 0) return;

    // Buscar paginación existente
    let pagination = sliderContainer.querySelector('.pagination');
    
    if (!pagination) {
      pagination = document.createElement('div');
      pagination.className = 'pagination';
      sliderContainer.appendChild(pagination);
    }

    // Limpiar paginación
    pagination.innerHTML = '';

    // Crear puntos
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = index === 0 ? 'active' : '';
      dot.addEventListener('click', () => goToSlide(index));
      pagination.appendChild(dot);
    });
  }

  function updatePagination() {
    const dots = document.querySelectorAll('.pagination span');
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Pausar al pasar el mouse
  document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopAutoSlide);
      sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Esperar un poco para que jQuery y TMS se carguen si están
    setTimeout(initSlider, 500);
  });

})();

