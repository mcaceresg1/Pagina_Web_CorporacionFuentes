/**
 * BUSCADOR FUNCIONAL
 * Implementación de búsqueda en el sitio
 */

(function() {
  'use strict';

  // Páginas del sitio para búsqueda
  const pages = [
    { title: 'Inicio', url: 'index.html', keywords: 'inicio home corporación fuentes asociados' },
    { title: 'Nosotros', url: 'nosotros.html', keywords: 'nosotros quiénes somos historia misión visión valores equipo' },
    { title: 'Servicios', url: 'servicios.html', keywords: 'servicios asesoría contable tributaria laboral auditoría' },
    { title: 'Asesoría Contable', url: 'asesoria_contable.html', keywords: 'contable contabilidad registros libros estados financieros' },
    { title: 'Auditoría Contable', url: 'auditoria_contable.html', keywords: 'auditoría auditoria verificación análisis procedimientos' },
    { title: 'Asesoría Tributaria', url: 'asesoria_tributaria.html', keywords: 'tributaria tributos impuestos sunat declaraciones' },
    { title: 'Asesoría Laboral', url: 'asesoria_laboral_planillas.html', keywords: 'laboral planillas recursos humanos cts gratificaciones' },
    { title: 'Asesoría Legal', url: 'asesoria_legal.html', keywords: 'legal constitución sociedades ruc licencias' },
    { title: 'Implementación de Sistemas', url: 'implementacion_sistemas_informacion.html', keywords: 'sistemas información contasis trace erp software' },
    { title: 'Outsourcing', url: 'outsourcing_profesional.html', keywords: 'outsourcing tercerización externalización servicios' },
    { title: 'Clientes', url: 'clientes.html', keywords: 'clientes casos éxito testimonios' },
    { title: 'Contacto', url: 'contacto.html', keywords: 'contacto teléfono email dirección ubicación' },
    { title: 'Constituya su Empresa', url: 'constituya_empresa.html', keywords: 'constituir empresa constitución asesoría empresarial' }
  ];

  // Función de búsqueda
  function performSearch(query) {
    if (!query || query.trim() === '' || query === 'Type here...') {
      return [];
    }

    query = query.toLowerCase().trim();
    const results = [];

    pages.forEach(page => {
      const searchText = `${page.title} ${page.keywords}`.toLowerCase();
      if (searchText.includes(query)) {
        results.push(page);
      }
    });

    return results;
  }

  // Mostrar resultados
  function showResults(results, query) {
    if (results.length === 0) {
      alert(`No se encontraron resultados para: "${query}"\n\nIntenta con:\n• Servicios\n• Contable\n• Auditoría\n• Contacto`);
      return;
    }

    if (results.length === 1) {
      // Si hay solo un resultado, ir directamente
      window.location.href = results[0].url;
      return;
    }

    // Si hay múltiples resultados, mostrar el primero
    window.location.href = results[0].url;
  }

  // Event listener cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    const searchForms = document.querySelectorAll('#form-search');
    
    searchForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const input = this.querySelector('input[type="text"]');
        const query = input.value;
        
        const results = performSearch(query);
        showResults(results, query);
      });
    });
  });

})();

