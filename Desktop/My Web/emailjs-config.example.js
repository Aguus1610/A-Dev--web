/**
 * EmailJS Configuration Example
 * 
 * INSTRUCCIONES:
 * 1. Copiar este archivo y renombrarlo a emailjs-config.js
 * 2. Reemplazar los valores con tus credenciales de EmailJS
 * 3. NO subir emailjs-config.js a Git (agregar a .gitignore)
 * 4. En js/main.js, descomentar la línea que carga este archivo
 * 
 * O alternativamente, configurar directamente en js/main.js
 * las variables emailjsConfig (líneas ~90-95)
 */

window.EMAILJS_CONFIG = {
  serviceId: 'default_service',      // Reemplazar con tu Service ID
  templateId: 'template_xxxxx',     // Reemplazar con tu Template ID
  publicKey: 'your_public_key'       // Reemplazar con tu Public Key
};

/**
 * Cómo obtener estos valores:
 * 
 * 1. Crear cuenta en https://www.emailjs.com/
 * 2. Email Services > Add New Service
 *    - Seleccionar proveedor (Gmail, Outlook, etc.)
 *    - Conectar cuenta
 *    - Copiar Service ID
 * 
 * 3. Email Templates > Create New Template
 *    - Usar campos: {{from_name}}, {{from_email}}, {{phone}}, {{subject}}, {{message}}
 *    - Copiar Template ID
 * 
 * 4. Account > API Keys
 *    - Copiar Public Key
 */
