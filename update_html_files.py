#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para actualizar todos los archivos HTML del sitio web
Corporación Fuentes y Asociados
"""

import os
import re

# Lista de archivos a actualizar
archivos = [
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
]

def actualizar_archivo(ruta_archivo):
    """Actualiza un archivo HTML con las mejoras necesarias"""
    print(f"Actualizando: {ruta_archivo}")
    
    try:
        with open(ruta_archivo, 'r', encoding='utf-8') as f:
            contenido = f.read()
    except:
        with open(ruta_archivo, 'r', encoding='latin-1') as f:
            contenido = f.read()
    
    # Crear backup
    with open(ruta_archivo + '.bak', 'w', encoding='utf-8') as f:
        f.write(contenido)
    
    # Cambiar lang="en" a lang="es"
    contenido = contenido.replace('lang="en"', 'lang="es"')
    
    # Actualizar enlaces HTTP a HTTPS para Google Fonts
    contenido = contenido.replace('http://fonts.googleapis.com', 'https://fonts.googleapis.com')
    
    # Actualizar jQuery
    contenido = re.sub(
        r'<script src="js/jquery-1\.7\.min\.js"></script>',
        '<script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>',
        contenido
    )
    
    # Corregir "Siguemos" a "Síguenos"
    contenido = contenido.replace('Siguemos:', 'Síguenos:')
    contenido = contenido.replace('Siguenos:', 'Síguenos:')
    contenido = contenido.replace('Siguenos</h3>', 'Síguenos</h3>')
    
    # Agregar viewport si no existe
    if 'viewport' not in contenido:
        contenido = contenido.replace(
            '<meta charset="utf-8">',
            '<meta charset="utf-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">'
        )
    
    # Actualizar enlaces sociales en el header
    contenido = re.sub(
        r'<a href="#" class="icon-3"></a>',
        '<a href="https://www.facebook.com/corporacionfuentes" target="_blank" rel="noopener noreferrer" class="icon-3" aria-label="Facebook"></a>',
        contenido,
        count=1
    )
    
    contenido = re.sub(
        r'<a href="#" class="icon-2"></a>',
        '<a href="https://www.linkedin.com/company/corporacionfuentes" target="_blank" rel="noopener noreferrer" class="icon-2" aria-label="LinkedIn"></a>',
        contenido,
        count=1
    )
    
    contenido = re.sub(
        r'<a href="#" class="icon-1"></a>',
        '<a href="https://twitter.com/corpfuentes" target="_blank" rel="noopener noreferrer" class="icon-1" aria-label="Twitter"></a>',
        contenido,
        count=1
    )
    
    # Actualizar enlaces sociales en el footer (todos)
    contenido = contenido.replace(
        '<a href="#" class="icon-3"></a>',
        '<a href="https://www.facebook.com/corporacionfuentes" target="_blank" rel="noopener noreferrer" class="icon-3" aria-label="Facebook"></a>'
    )
    
    contenido = contenido.replace(
        '<a href="#" class="icon-2"></a>',
        '<a href="https://www.linkedin.com/company/corporacionfuentes" target="_blank" rel="noopener noreferrer" class="icon-2" aria-label="LinkedIn"></a>'
    )
    
    contenido = contenido.replace(
        '<a href="#" class="icon-1"></a>',
        '<a href="https://twitter.com/corpfuentes" target="_blank" rel="noopener noreferrer" class="icon-1" aria-label="Twitter"></a>'
    )
    
    # Mejorar alt del logo
    contenido = contenido.replace(
        '<img src="images/logo.png" alt="">',
        '<img src="images/logo.png" alt="Corporación Fuentes y Asociados - Logo">'
    )
    
    contenido = contenido.replace(
        '<img src="images/logo-footer.png" alt=""',
        '<img src="images/logo-footer.png" alt="Corporación Fuentes y Asociados"'
    )
    
    # Corregir errores ortográficos comunes
    contenido = contenido.replace(' area ', ' área ')
    contenido = contenido.replace(' en el area', ' en el área')
    contenido = contenido.replace('auditorias', 'auditorías')
    
    # Eliminar referencias a archivos que no existen
    contenido = contenido.replace(
        '<link rel="stylesheet" type="text/css" media="screen" href="css/grid_12.css">',
        ''
    )
    
    contenido = contenido.replace(
        '<script src="js/jquery.easing.1.3.js"></script>',
        ''
    )
    
    # Guardar archivo actualizado
    with open(ruta_archivo, 'w', encoding='utf-8') as f:
        f.write(contenido)
    
    print(f"✓ Completado: {ruta_archivo}")

def main():
    """Función principal"""
    print("=" * 60)
    print("Actualizando archivos HTML de Corporación Fuentes y Asociados")
    print("=" * 60)
    print()
    
    for archivo in archivos:
        if os.path.exists(archivo):
            actualizar_archivo(archivo)
        else:
            print(f"⚠ Archivo no encontrado: {archivo}")
    
    print()
    print("=" * 60)
    print("Actualización completada!")
    print("=" * 60)
    print()
    print("Los archivos originales fueron respaldados con extensión .bak")

if __name__ == "__main__":
    main()

