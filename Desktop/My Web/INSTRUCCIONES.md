# Instrucciones Rápidas de Configuración

## 🚀 Inicio Rápido

1. **Abrir el proyecto**
   - Abrir `index.html` en tu navegador o usar Live Server

2. **Personalizar datos de contacto** (IMPORTANTE)
   - Buscar y reemplazar `tu-email@ejemplo.com` en todos los archivos HTML
   - Buscar y reemplazar `5491234567890` en enlaces de WhatsApp
   - Actualizar enlaces de LinkedIn e Instagram

3. **Configurar EmailJS** (Opcional pero recomendado)
   - Ver sección "Configuración de EmailJS" en README.md
   - O dejar el fallback mailto funcionando

4. **Reemplazar PDFs**
   - Reemplazar `assets/docs/cv.pdf` con tu CV real
   - Reemplazar `assets/docs/perfil-tecnico.pdf` con tu perfil técnico

5. **Actualizar URLs**
   - Editar `sitemap.xml` con tu dominio real
   - Actualizar URLs en meta tags OpenGraph de cada HTML

## 📝 Checklist Pre-Despliegue

- [ ] Email actualizado en todos los archivos
- [ ] WhatsApp actualizado
- [ ] LinkedIn actualizado
- [ ] Instagram actualizado
- [ ] PDFs reemplazados
- [ ] URLs en sitemap.xml actualizadas
- [ ] EmailJS configurado o mailto funcionando
- [ ] Probar formulario de contacto
- [ ] Probar tema claro/oscuro
- [ ] Probar navegación móvil
- [ ] Verificar enlaces externos

## 🔧 Configuración Rápida de EmailJS

1. Ir a https://www.emailjs.com/
2. Crear cuenta gratuita
3. Agregar servicio de email (Gmail recomendado)
4. Crear plantilla con campos: `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{subject}}`, `{{message}}`
5. Copiar Service ID, Template ID y Public Key
6. Editar `js/main.js` líneas 90-95 y reemplazar valores

## 📱 Probar Localmente

```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js
npx http-server -p 8000

# Opción 3: VS Code Live Server
# Click derecho en index.html > Open with Live Server
```

## 🌐 Desplegar

### GitHub Pages
1. Subir a repositorio GitHub
2. Settings > Pages > Seleccionar branch main
3. Listo en `https://tu-usuario.github.io/repo`

### Netlify
1. Arrastrar carpeta a netlify.com
2. Configurar variables de entorno (si usas EmailJS)
3. Desplegar

## ⚠️ Importante

- **NO subir** archivos `.env` o `emailjs-config.js` a Git
- Reemplazar TODOS los placeholders antes de publicar
- Probar en diferentes navegadores y dispositivos
- Verificar accesibilidad con herramientas como WAVE

## 📞 Soporte

Si tenés dudas, revisar README.md completo o contactar.
