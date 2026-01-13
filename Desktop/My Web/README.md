# Portfolio Web - Desarrollador Python

Sitio web profesional completo para publicitarse como desarrollador Python, con enfoque en sistemas a medida, automatización y desarrollo web.

## 🚀 Características

- ✅ **5 páginas completas**: Inicio, Servicios, Proyectos, Sobre mí, Contacto
- ✅ **Diseño responsive**: Mobile-first, totalmente adaptable
- ✅ **Tema claro/oscuro**: Con persistencia en localStorage
- ✅ **Accesibilidad**: WCAG 2.1 AA, navegación por teclado, ARIA labels
- ✅ **SEO optimizado**: Meta tags, OpenGraph, Twitter Cards, Schema.org, sitemap.xml
- ✅ **Formulario funcional**: EmailJS con fallback a mailto
- ✅ **Performance**: Optimizado para Core Web Vitals
- ✅ **Sin dependencias pesadas**: HTML5, CSS3, JavaScript vanilla

## 📁 Estructura del Proyecto

```
/
├── index.html              # Página principal
├── servicios.html          # Detalle de servicios
├── proyectos.html          # Portfolio de proyectos
├── sobre-mi.html           # Información personal
├── contacto.html           # Formulario de contacto
├── css/
│   └── styles.css         # Estilos principales
├── js/
│   └── main.js            # JavaScript principal
├── assets/
│   ├── img/               # Imágenes y placeholders
│   ├── icons/             # Iconos (agregar icon-192.png e icon-512.png)
│   └── docs/              # PDFs (CV, perfil técnico)
├── sitemap.xml            # Sitemap para SEO
├── robots.txt             # Configuración para crawlers
├── manifest.webmanifest   # PWA manifest
├── .env.example           # Ejemplo de variables de entorno
└── README.md              # Este archivo
```

## 🛠️ Instalación y Configuración

### Requisitos

- Navegador web moderno
- Editor de código (opcional)
- Servidor local (para desarrollo)

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   git clone <tu-repositorio>
   cd "My Web"
   ```

2. **Configurar EmailJS (Opcional pero recomendado)**

   - Crear cuenta en [EmailJS](https://www.emailjs.com/)
   - Crear un servicio de email (Gmail, Outlook, etc.)
   - Crear una plantilla de email con estos campos:
     - `from_name`: Nombre del remitente
     - `from_email`: Email del remitente
     - `phone`: Teléfono (opcional)
     - `subject`: Asunto
     - `message`: Mensaje
   - Obtener tu Public Key desde Account > API Keys
   - Copiar `.env.example` a `.env` y completar los valores
   - O editar directamente en `js/main.js` las variables `emailjsConfig`

3. **Personalizar contenido**

   - Reemplazar todos los placeholders `tu-email@ejemplo.com` con tu email real
   - Actualizar enlaces de WhatsApp: `https://wa.me/5491234567890` (reemplazar número)
   - Actualizar enlaces de LinkedIn e Instagram
   - Reemplazar PDFs placeholder en `assets/docs/` con tus documentos reales
   - Actualizar URLs en `sitemap.xml` con tu dominio real
   - Personalizar textos según tu perfil

4. **Agregar iconos PWA (Opcional)**

   - Generar iconos de 192x192 y 512x512 píxeles
   - Guardarlos como `assets/icons/icon-192.png` e `icon-512.png`
   - O usar un generador online como [RealFaviconGenerator](https://realfavicongenerator.net/)

## 🚀 Desarrollo Local

### Opción 1: Live Server (VS Code)

1. Instalar extensión "Live Server" en VS Code
2. Click derecho en `index.html` > "Open with Live Server"

### Opción 2: Python HTTP Server

```bash
# Python 3
python -m http.server 8000

# Acceder en http://localhost:8000
```

### Opción 3: Node.js http-server

```bash
# Instalar globalmente
npm install -g http-server

# Ejecutar
http-server -p 8000
```

## 📤 Despliegue

### GitHub Pages

1. Subir el proyecto a un repositorio de GitHub
2. Ir a Settings > Pages
3. Seleccionar branch `main` y carpeta `/ (root)`
4. Guardar y esperar el despliegue
5. Tu sitio estará en `https://tu-usuario.github.io/nombre-repo`

### Netlify

1. Crear cuenta en [Netlify](https://www.netlify.com/)
2. Arrastrar la carpeta del proyecto o conectar con GitHub
3. Configurar variables de entorno (si usas EmailJS):
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`
4. Desplegar

### Vercel

1. Crear cuenta en [Vercel](https://vercel.com/)
2. Importar proyecto desde GitHub
3. Configurar variables de entorno (si usas EmailJS)
4. Desplegar

## ⚙️ Configuración de EmailJS

### Paso a Paso

1. **Crear cuenta y servicio**
   - Registrarse en [EmailJS](https://www.emailjs.com/)
   - Ir a Email Services > Add New Service
   - Seleccionar proveedor (Gmail recomendado)
   - Conectar cuenta

2. **Crear plantilla**
   - Ir a Email Templates > Create New Template
   - Usar estos campos:
     ```
     De: {{from_name}} <{{from_email}}>
     Asunto: {{subject}}
     
     Nombre: {{from_name}}
     Email: {{from_email}}
     Teléfono: {{phone}}
     
     Mensaje:
     {{message}}
     ```

3. **Obtener IDs**
   - Service ID: Desde Email Services
   - Template ID: Desde Email Templates
   - Public Key: Desde Account > API Keys

4. **Configurar en el proyecto**
   - Editar `js/main.js` línea ~90-95
   - O usar variables de entorno en producción

## 📝 Checklist Post-Edición

Antes de publicar, asegurate de:

- [ ] Reemplazar `tu-email@ejemplo.com` en todos los archivos HTML
- [ ] Actualizar número de WhatsApp en todos los enlaces
- [ ] Actualizar enlaces de LinkedIn e Instagram
- [ ] Reemplazar PDFs placeholder con documentos reales
- [ ] Actualizar URLs en `sitemap.xml` con tu dominio
- [ ] Configurar EmailJS o dejar fallback mailto funcionando
- [ ] Agregar iconos PWA (192x192 y 512x512)
- [ ] Revisar y personalizar textos según tu perfil
- [ ] Probar formulario de contacto
- [ ] Probar tema claro/oscuro
- [ ] Probar navegación móvil
- [ ] Verificar enlaces externos (GitHub, etc.)
- [ ] Revisar accesibilidad con herramientas como WAVE
- [ ] Probar en diferentes navegadores
- [ ] Verificar responsive en móvil, tablet y desktop

## 🔒 Seguridad

- **No exponer claves**: Las claves de EmailJS deben estar en variables de entorno en producción
- **Headers recomendados**: Para despliegue estático, configurar en tu servidor:
  ```
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  ```

## 📱 PWA (Progressive Web App)

El sitio incluye `manifest.webmanifest` para funcionar como PWA. Para habilitarlo completamente:

1. Agregar iconos en `assets/icons/`
2. Configurar service worker (opcional, para offline)
3. Probar instalación en dispositivos móviles

## 🎨 Personalización

### Colores

Editar variables CSS en `css/styles.css` (líneas 5-30):

```css
:root {
  --color-primary: #2563eb;
  --color-primary-dark: #1e40af;
  /* ... */
}
```

### Tipografía

La fuente principal es "Josefin Sans" de Google Fonts. Para cambiar:

1. Editar link en `<head>` de cada HTML
2. Actualizar `--font-primary` en CSS

### Contenido

- Todos los textos están en español y son editables directamente en los HTML
- Los proyectos en `proyectos.html` pueden reemplazarse con proyectos reales
- Los testimonios pueden reemplazarse con testimonios reales

## 🐛 Solución de Problemas

### El formulario no envía emails

- Verificar configuración de EmailJS
- Revisar consola del navegador para errores
- Verificar que los IDs sean correctos
- El fallback mailto debería funcionar siempre

### El tema no persiste

- Verificar que localStorage esté habilitado
- Limpiar caché del navegador
- Verificar consola para errores de JavaScript

### Los estilos no se cargan

- Verificar rutas de archivos CSS
- Verificar que el servidor esté corriendo
- Revisar consola para errores 404

## 📄 Licencia

Este proyecto es de uso personal. Puedes modificarlo y usarlo libremente.

## 👤 Autor

**Agustín**
- GitHub: [@Aguus1610](https://github.com/Aguus1610)
- Email: tu-email@ejemplo.com (reemplazar)

## 🙏 Agradecimientos

- [EmailJS](https://www.emailjs.com/) por el servicio de emails
- [Google Fonts](https://fonts.google.com/) por la tipografía Josefin Sans
- Comunidad de desarrolladores por las mejores prácticas

---

**Nota**: Este proyecto está listo para producción pero requiere personalización de contenido antes de publicar.
