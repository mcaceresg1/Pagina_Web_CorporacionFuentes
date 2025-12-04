/**
 * PAGE LOADER
 * Muestra spinner mientras carga la página
 */

(function() {
  'use strict';

  // Crear loader HTML
  const loaderHTML = `
    <div class="page-loader" id="page-loader">
      <div class="loader-container">
        <div class="spinner"></div>
        <div class="loader-text">Cargando...</div>
      </div>
    </div>
  `;

  // Agregar loader al inicio del body
  document.addEventListener('DOMContentLoaded', function() {
    // Ocultar loader cuando todo esté cargado
    window.addEventListener('load', function() {
      const loader = document.getElementById('page-loader');
      if (loader) {
        setTimeout(() => {
          loader.classList.add('hidden');
          setTimeout(() => loader.remove(), 500);
        }, 300);
      }
    });
  });

  // Agregar loader al HTML si aún no existe
  if (document.readyState === 'loading') {
    document.write(loaderHTML);
  }

})();

