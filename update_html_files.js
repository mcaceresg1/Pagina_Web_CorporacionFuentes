#!/usr/bin/env node
/**
 * Script para actualizar todos los archivos HTML del sitio web
 * Corporación Fuentes y Asociados
 */

const fs = require('fs');
const path = require('path');

// Lista de archivos a actualizar
const archivos = [
    'constituya_empresa.html',
    'asesoria_tributaria.html',
    'outsourcing_profesional.html',
    'asesoria_laboral_planillas.html',
    'auditoria_contable.html',
    'clientes.html',
    'Default.html',
    'implementacion_sistemas_informacion.html',
    'asesoria_contable.html',
    'quienes_somos.html'
];

function actualizarArchivo(rutaArchivo) {
    console.log(`Actualizando: ${rutaArchivo}`);
    
    try {
        let contenido = fs.readFileSync(rutaArchivo, 'utf-8');
        
        // Crear backup
        fs.writeFileSync(rutaArchivo + '.bak', contenido, 'utf-8');
        
        // Cambiar lang="en" a lang="es"
        contenido = contenido.replace(/lang="en"/g, 'lang="es"');
        
        // Actualizar enlaces HTTP a HTTPS para Google Fonts
        contenido = contenido.replace(/http:\/\/fonts\.googleapis\.com/g, 'https://fonts.googleapis.com');
        
        // Actualizar jQuery
        contenido = contenido.replace(
            /<script src="js\/jquery-1\.7\.min\.js"><\/script>/g,
            '<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>'
        );
        
        // Corregir "Siguemos" a "Síguenos"
        contenido = contenido.replace(/Siguemos:/g, 'Síguenos:');
        contenido = contenido.replace(/Siguenos:/g, 'Síguenos:');
        contenido = contenido.replace(/Siguenos<\/h3>/g, 'Síguenos</h3>');
        
        // Agregar viewport si no existe
        if (!contenido.includes('viewport')) {
            contenido = contenido.replace(
                '<meta charset="utf-8">',
                '<meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">'
            );
        }
        
        // Actualizar enlaces sociales - usar replace all
        contenido = contenido.replace(
            /<a href="#" class="icon-3"><\/a>/g,
            '<a href="https://www.facebook.com/corporacionfuentes" target="_blank" rel="noopener noreferrer" class="icon-3" aria-label="Facebook"></a>'
        );
        
        contenido = contenido.replace(
            /<a href="#" class="icon-2"><\/a>/g,
            '<a href="https://www.linkedin.com/company/corporacionfuentes" target="_blank" rel="noopener noreferrer" class="icon-2" aria-label="LinkedIn"></a>'
        );
        
        contenido = contenido.replace(
            /<a href="#" class="icon-1"><\/a>/g,
            '<a href="https://twitter.com/corpfuentes" target="_blank" rel="noopener noreferrer" class="icon-1" aria-label="Twitter"></a>'
        );
        
        // Mejorar alt del logo
        contenido = contenido.replace(
            /<img src="images\/logo\.png" alt="">/g,
            '<img src="images/logo.png" alt="Corporación Fuentes y Asociados - Logo">'
        );
        
        contenido = contenido.replace(
            /<img src="images\/logo-footer\.png" alt=""/g,
            '<img src="images/logo-footer.png" alt="Corporación Fuentes y Asociados"'
        );
        
        // Corregir errores ortográficos comunes
        contenido = contenido.replace(/ area /g, ' área ');
        contenido = contenido.replace(/ en el area/g, ' en el área');
        contenido = contenido.replace(/auditorias/g, 'auditorías');
        
        // Eliminar referencias a archivos que no existen
        contenido = contenido.replace(
            /<link rel="stylesheet" type="text\/css" media="screen" href="css\/grid_12\.css">\s*/g,
            ''
        );
        
        contenido = contenido.replace(
            /<script src="js\/jquery\.easing\.1\.3\.js"><\/script>\s*/g,
            ''
        );
        
        // Guardar archivo actualizado
        fs.writeFileSync(rutaArchivo, contenido, 'utf-8');
        
        console.log(`✓ Completado: ${rutaArchivo}`);
        return true;
    } catch (error) {
        console.error(`✗ Error en ${rutaArchivo}:`, error.message);
        return false;
    }
}

function main() {
    console.log('='.repeat(60));
    console.log('Actualizando archivos HTML de Corporación Fuentes y Asociados');
    console.log('='.repeat(60));
    console.log();
    
    let exitosos = 0;
    let fallidos = 0;
    
    for (const archivo of archivos) {
        if (fs.existsSync(archivo)) {
            if (actualizarArchivo(archivo)) {
                exitosos++;
            } else {
                fallidos++;
            }
        } else {
            console.log(`⚠ Archivo no encontrado: ${archivo}`);
            fallidos++;
        }
    }
    
    console.log();
    console.log('='.repeat(60));
    console.log('Actualización completada!');
    console.log(`✓ Exitosos: ${exitosos}`);
    console.log(`✗ Fallidos: ${fallidos}`);
    console.log('='.repeat(60));
    console.log();
    console.log('Los archivos originales fueron respaldados con extensión .bak');
}

main();

