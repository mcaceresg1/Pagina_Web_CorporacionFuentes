# 🖼️ GUÍA DE OPTIMIZACIÓN DE IMÁGENES

## Corporación Fuentes y Asociados

---

## 📋 ESTADO ACTUAL

Tu sitio web tiene **50+ imágenes** en la carpeta `/images/` que necesitan optimización para mejorar la velocidad de carga.

### Tipos de imágenes encontradas:
- 📸 **JPG**: Fotos y banners (slider-1.jpg, slider-2.jpg, etc.)
- 🎨 **PNG**: Logos, iconos, elementos de diseño
- 🔧 **GIF**: Elementos pequeños (borders, markers)

---

## 🎯 OBJETIVOS

1. **Reducir peso** de las imágenes en 60-80%
2. **Convertir** a formatos modernos (WebP)
3. **Crear versiones** responsive (múltiples tamaños)
4. **Mejorar** tiempo de carga de la página

---

## 🛠️ HERRAMIENTAS RECOMENDADAS

### **Opción 1: Herramientas Online (Fácil)**

#### TinyPNG / TinyJPG
- 🔗 URL: https://tinypng.com
- ✅ Gratuito hasta 20 imágenes por vez
- ✅ Muy fácil de usar (arrastra y suelta)
- ✅ Excelente compresión sin pérdida visible de calidad

**Cómo usar:**
1. Ve a https://tinypng.com
2. Arrastra tus imágenes JPG/PNG
3. Espera a que se compriman
4. Descarga las imágenes optimizadas
5. Reemplaza las originales en `/images/`

#### Squoosh
- 🔗 URL: https://squoosh.app
- ✅ Gratuito, sin límites
- ✅ Control total sobre la compresión
- ✅ Puede convertir a WebP
- ✅ Funciona 100% en el navegador (privacidad)

**Cómo usar:**
1. Ve a https://squoosh.app
2. Arrastra una imagen
3. Selecciona el formato de salida (WebP recomendado)
4. Ajusta la calidad (80-85% es ideal)
5. Descarga y reemplaza

### **Opción 2: Herramientas Desktop (Profesional)**

#### ImageOptim (Mac) - GRATIS
- 🔗 URL: https://imageoptim.com
- ✅ Optimización por lotes
- ✅ Elimina metadatos innecesarios
- ✅ Muy fácil de usar

#### FileOptimizer (Windows) - GRATIS
- 🔗 URL: https://nikkhokkho.sourceforge.io/static.php?page=FileOptimizer
- ✅ Soporta muchos formatos
- ✅ Optimización por lotes

### **Opción 3: Línea de Comandos (Avanzado)**

#### Node.js + imagemin
```bash
# Instalar globalmente
npm install -g imagemin-cli imagemin-mozjpeg imagemin-pngquant imagemin-webp

# Optimizar JPG
imagemin images/*.jpg --out-dir=images/optimized --plugin=mozjpeg

# Optimizar PNG
imagemin images/*.png --out-dir=images/optimized --plugin=pngquant

# Convertir a WebP
imagemin images/*.{jpg,png} --out-dir=images/webp --plugin=webp
```

---

## 📝 PLAN DE ACCIÓN PASO A PASO

### **Paso 1: Backup**
```bash
# Crear backup de la carpeta images
cp -r images images_backup
```

### **Paso 2: Priorizar imágenes por impacto**

#### 🔴 **ALTA PRIORIDAD** (optimizar primero):
- `slider-1.jpg, slider-2.jpg, slider-3.jpg` - Aparecen en la página principal
- `logo.png, logo-footer.png` - Se cargan en todas las páginas
- `banner-*.jpg` - Imágenes grandes

#### 🟡 **MEDIA PRIORIDAD**:
- `page1-img*.jpg, page2-img*.jpg` - Contenido interno
- Iconos PNG grandes

#### 🟢 **BAJA PRIORIDAD**:
- `icon-*.png` - Ya son pequeños
- `marker.gif, border-1.gif` - Elementos pequeños

### **Paso 3: Optimizar**

#### Para el Slider (Prioridad Alta):
```
Original: slider-1.jpg (probablemente 500KB - 2MB)
Objetivo: slider-1.jpg (100-200KB)
WebP: slider-1.webp (50-100KB)

Pasos:
1. Redimensionar si es necesario (máximo 1920px de ancho)
2. Comprimir con TinyJPG (calidad 80-85%)
3. Convertir a WebP con Squoosh
4. Guardar ambas versiones
```

#### Para el Logo:
```
Original: logo.png
Objetivo: Mantener PNG (necesita transparencia)
Comprimir: TinyPNG

Si es muy grande:
- Crear versión @1x (tamaño normal)
- Crear versión @2x (para retina displays)
```

### **Paso 4: Implementar WebP con Fallback**

Actualiza el HTML para usar WebP con fallback a JPG:

```html
<!-- ANTES -->
<img src="images/slider-1.jpg" alt="...">

<!-- DESPUÉS -->
<picture>
  <source srcset="images/slider-1.webp" type="image/webp">
  <img src="images/slider-1.jpg" alt="..." loading="lazy">
</picture>
```

### **Paso 5: Imágenes Responsive**

Crear múltiples tamaños para diferentes dispositivos:

```bash
# Tamaños recomendados para sliders:
- slider-1-sm.jpg   (800px)  - Móviles
- slider-1-md.jpg   (1200px) - Tablets
- slider-1-lg.jpg   (1920px) - Desktop
```

Luego usar en HTML:

```html
<picture>
  <source 
    srcset="images/slider-1-sm.webp 800w,
            images/slider-1-md.webp 1200w,
            images/slider-1-lg.webp 1920w" 
    type="image/webp">
  <img 
    srcset="images/slider-1-sm.jpg 800w,
            images/slider-1-md.jpg 1200w,
            images/slider-1-lg.jpg 1920w"
    sizes="(max-width: 768px) 800px,
           (max-width: 1024px) 1200px,
           1920px"
    src="images/slider-1.jpg" 
    alt="..."
    loading="lazy">
</picture>
```

---

## 📊 RESULTADOS ESPERADOS

### Antes de Optimizar:
```
Total de imágenes: ~10-20 MB
Tiempo de carga: ~5-8 segundos
PageSpeed Score: 40-60
```

### Después de Optimizar:
```
Total de imágenes: ~2-4 MB (reducción del 70-80%)
Tiempo de carga: ~1-2 segundos
PageSpeed Score: 80-95
```

---

## ✅ CHECKLIST

### Imágenes Prioritarias:
- [ ] slider-1.jpg optimizado + WebP
- [ ] slider-2.jpg optimizado + WebP
- [ ] slider-3.jpg optimizado + WebP
- [ ] logo.png optimizado
- [ ] logo-footer.png optimizado
- [ ] banner-*.jpg optimizados + WebP

### Imágenes Secundarias:
- [ ] page1-img*.jpg optimizados
- [ ] page2-img*.jpg optimizados
- [ ] page3-img*.png optimizados
- [ ] page4-img*.jpg optimizados

### Implementación:
- [ ] Crear versiones WebP
- [ ] Actualizar HTML con `<picture>` tags
- [ ] Agregar `loading="lazy"` a todas las imágenes
- [ ] Crear versiones responsive (opcional)
- [ ] Probar en diferentes dispositivos
- [ ] Medir mejora con PageSpeed Insights

---

## 🔧 SCRIPT DE AUTOMATIZACIÓN (Opcional)

Si prefieres automatizar, puedes usar este script Node.js:

```javascript
// optimize-images.js
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');

async function optimizeImages() {
  // Optimizar JPG
  await imagemin(['images/*.jpg'], {
    destination: 'images',
    plugins: [
      imageminMozjpeg({ quality: 85 })
    ]
  });

  // Optimizar PNG
  await imagemin(['images/*.png'], {
    destination: 'images',
    plugins: [
      imageminPngquant({ quality: [0.8, 0.9] })
    ]
  });

  // Crear versiones WebP
  await imagemin(['images/*.{jpg,png}'], {
    destination: 'images',
    plugins: [
      imageminWebp({ quality: 85 })
    ]
  });

  console.log('✅ Imágenes optimizadas!');
}

optimizeImages();
```

Para usar:
```bash
npm install imagemin imagemin-mozjpeg imagemin-pngquant imagemin-webp
node optimize-images.js
```

---

## 📈 MEDIR RESULTADOS

### Antes y Después:
1. **Google PageSpeed Insights**
   - 🔗 https://pagespeed.web.dev
   - Analiza tu sitio antes y después

2. **WebPageTest**
   - 🔗 https://www.webpagetest.org
   - Prueba detallada de velocidad

3. **GTmetrix**
   - 🔗 https://gtmetrix.com
   - Análisis completo de rendimiento

---

## 💡 TIPS ADICIONALES

1. **SVG para Logos**: Si es posible, convierte el logo a SVG
2. **Sprites**: Combina iconos pequeños en un sprite sheet
3. **CDN**: Considera usar un CDN para servir imágenes
4. **Cache**: Configura cache de navegador para imágenes
5. **Preload**: Usa `<link rel="preload">` para imágenes críticas

```html
<!-- Preload de imagen del slider -->
<link rel="preload" as="image" href="images/slider-1.webp">
```

---

## 🆘 AYUDA

Si tienes dudas o necesitas ayuda:
1. Revisa la documentación de cada herramienta
2. Busca tutoriales en YouTube
3. Consulta con un desarrollador web

---

**¡Con estas optimizaciones, tu sitio web cargará mucho más rápido!** ⚡

*Última actualización: Diciembre 2025*

