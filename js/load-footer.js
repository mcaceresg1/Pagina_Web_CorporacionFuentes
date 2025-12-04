/**
 * CARGAR FOOTER DINÁMICAMENTE
 * Carga el footer compartido en todas las páginas
 */

$(document).ready(function(){
    // Cargar el footer desde includes/footer.html
    $('#footer-placeholder').load('includes/footer.html', function(response, status, xhr) {
        if (status == "error") {
            console.log("Error al cargar el footer: " + xhr.status + " " + xhr.statusText);
            // Fallback: si no se puede cargar, no hacer nada (el footer inline se mostrará)
        }
    });
});


