// ============================================================================
// MAIN APPLICATION - CÓDIGO LIMPIO Y OPTIMIZADO
// ============================================================================

class WebApp {
    constructor() {
        this.elements = {};
        this.isInitialized = false;
    }

    // Inicialización principal
    init() {
        if (this.isInitialized) return;
        
        this.cacheElements();
        this.bindEvents();
        this.initializeModules();
        this.isInitialized = true;
    }

    // Cache de elementos DOM
    cacheElements() {
        this.elements = {
            hamburger: document.querySelector('.hamburger'),
            navLinks: document.querySelector('.nav-links'),
            form: document.getElementById('contact-form'),
            hero: document.querySelector('.hero'),
            textarea: document.querySelector('textarea')
        };
    }

    // Event listeners optimizados
    bindEvents() {
        // Navegación hamburger
        if (this.elements.hamburger && this.elements.navLinks) {
            this.elements.hamburger.addEventListener('click', this.toggleMenu.bind(this));
            this.elements.navLinks.addEventListener('keydown', this.handleMenuKeydown.bind(this));
        }

        // Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleSmoothScroll.bind(this));
        });

        // Formulario
        if (this.elements.form) {
            this.elements.form.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Auto-resize textarea
        if (this.elements.textarea) {
            this.elements.textarea.addEventListener('input', this.autoResizeTextarea.bind(this));
            this.autoResizeTextarea();
        }

        // Efectos mouse throttled
        document.addEventListener('mousemove', this.throttle(this.handleMouseMove.bind(this), 16));
    }

    initializeModules() {
        this.cursor = new CustomCursor();
        this.effects = new VisualEffects();
        
        this.cursor.init();
        this.effects.init();
    }

    // Navegación
    toggleMenu() {
        const isExpanded = this.elements.hamburger.getAttribute('aria-expanded') === 'true';
        this.elements.hamburger.setAttribute('aria-expanded', !isExpanded);
        this.elements.navLinks.classList.toggle('active');
        this.elements.hamburger.classList.toggle('active');
    }

    handleMenuKeydown(e) {
        if (e.key === 'Escape') {
            this.elements.navLinks.classList.remove('active');
            this.elements.hamburger.setAttribute('aria-expanded', 'false');
            this.elements.hamburger.classList.remove('active');
        }
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const target = document.querySelector(e.currentTarget.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Formulario
    handleFormSubmit(e) {
        const nombre = this.elements.form.querySelector('#nombre').value.trim();
        const email = this.elements.form.querySelector('#email').value.trim();
        const mensaje = this.elements.form.querySelector('#mensaje').value.trim();
        
        if (!nombre || !email || !mensaje) {
            this.showMessage('Por favor, completa todos los campos', 'error');
            e.preventDefault();
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showMessage('Por favor, ingresa un email válido', 'error');
            e.preventDefault();
            return false;
        }

        const button = this.elements.form.querySelector('button[type="submit"]');
        button.innerHTML = '<span class="loading-spinner"></span> Enviando...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = 'Enviar Mensaje';
                button.disabled = false;
            }, 2000);
}

    isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

    autoResizeTextarea() {
        const textarea = this.elements.textarea;
        textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

    showMessage(text, type = 'info') {
        const message = document.createElement('div');
        message.className = `message message-${type}`;
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'error' ? '#ff4444' : 'var(--neon-color)'};
            color: ${type === 'error' ? 'white' : 'var(--bg-color)'};
            border-radius: 5px;
            z-index: 1000;
        `;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 3000);
    }

  handleMouseMove(e) {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    }

  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
    }
}

// ============================================================================
// CURSOR PERSONALIZADO
// ============================================================================

class CustomCursor {
    constructor() {
        this.cursor = null;
        this.isActive = false;
    }
  
  init() {
        // No inicializar en dispositivos móviles
        if (window.innerWidth <= 768) return;
        
        if (this.cursor) return;

        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor active';
        document.body.appendChild(this.cursor);

        this.bindEvents();
        this.isActive = true;
        
        // Cursor personalizado inicializado correctamente
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            if (!this.isActive) return;
            
            requestAnimationFrame(() => {
                this.cursor.style.left = (e.clientX - 10) + 'px';
                this.cursor.style.top = (e.clientY - 10) + 'px';
      });
    });

        const interactiveElements = 'a, button, .tech-badge, .service-card, input, textarea, .logo a';
        document.querySelectorAll(interactiveElements).forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.cursor.style.background = 'var(--neon-color)';
            });
            
            elem.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.background = 'rgba(97, 218, 251, 0.4)';
            });
        });

        // Ocultar cursor al salir de la ventana
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });
    }
}

// ============================================================================
// EFECTOS VISUALES
// ============================================================================

class VisualEffects {
    constructor() {
        this.observer = null;
    }

    init() {
        this.initScrollAnimations();
        this.init3DCardEffects();
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px"
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    this.observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.glass-effect, .service-card, .project-card').forEach(element => {
            this.observer.observe(element);
        });
    }

    init3DCardEffects() {
        const cards = document.querySelectorAll('.service-card, .process-card');
        
        cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
                const rotateX = ((y - centerY) / 25).toFixed(2);
                const rotateY = ((centerX - x) / 25).toFixed(2);
        
        requestAnimationFrame(() => {
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                        translateZ(5px)
            `;
        });
    });
    
    card.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});
    }
}

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

const app = new WebApp();

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', () => {
        app.init();
        initHamburgerMenu();
        initLogoClick();
        initScrollAnimations();
        initEnhancedVisualEffects();
        formHandler.init();
    });
} else {
    app.init();
    initHamburgerMenu();
    initLogoClick();
    initScrollAnimations();
    initEnhancedVisualEffects();
    formHandler.init();
}

// ============================================================================
// LOGO CLICK HANDLER
// ============================================================================

function initLogoClick() {
    const logoLink = document.querySelector('.logo a');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            // Logo navigation handled
            // Asegurar que el click funcione
            window.location.href = this.href;
        });
    }
}

// ============================================================================
// MENÚ HAMBURGER RESPONSIVE
// ============================================================================

function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', (e) => {
        // Menu toggle handled
        const isActive = hamburger.classList.contains('active');
        
        if (isActive) {
            // Cerrar menú
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        } else {
            // Abrir menú
            hamburger.classList.add('active');
            navLinks.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
        }
    });
    
    // Cerrar menú al hacer click en un enlace
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', (e) => {
        const isClickInsideNav = navLinks.contains(e.target) || hamburger.contains(e.target);
        
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Cerrar menú al redimensionar la ventana (para evitar problemas responsive)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

// CSS para animaciones
const styles = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .reveal {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.6s ease;
    }
    
    .loading-spinner {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border: 2px solid var(--neon-color);
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

// Inyectar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// ============================================================================
// ANIMACIONES EN SCROLL (INTERSECTION OBSERVER)
// ============================================================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                // Una vez animado, no volver a observar para mejor performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos los elementos con clase animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ============================================================================
// EFECTOS VISUALES MEJORADOS
// ============================================================================

function initEnhancedVisualEffects() {
    // Parallax effect para el hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (hero.style) {
                hero.style.transform = `translateY(${parallax}px)`;
            }
        }, 16));
    }

    // Enhanced hover effects para tech badges
    document.querySelectorAll('.tech-badge').forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = '';
        });
    });

    // Efecto de typing para títulos
    const glitchTitle = document.querySelector('.glitch');
    if (glitchTitle) {
        // Añadir efecto de aparición gradual
        glitchTitle.style.opacity = '0';
        setTimeout(() => {
            glitchTitle.style.opacity = '1';
            glitchTitle.style.animation = 'glitch 2s infinite, fadeIn 1s ease forwards';
        }, 500);
    }
}

// ============================================================================
// FORM HANDLER AVANZADO
// ============================================================================

class FormHandler {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.formStatus = document.getElementById('form-status');
        this.charCount = document.getElementById('char-count');
        this.messageField = document.getElementById('mensaje');
        this.isSubmitting = false;
    }

    init() {
        if (!this.form) return;
        
        // FormHandler initialized successfully
        this.setupEventListeners();
        this.setupCharCounter();
        this.setupFormMetadata();
        this.setupRealTimeValidation();
    }

    setupEventListeners() {
        // Manejo del envío del formulario
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Validación en tiempo real
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearValidation(input));
        });
    }

    setupCharCounter() {
        if (!this.messageField || !this.charCount) return;
        
        this.messageField.addEventListener('input', () => {
            const count = this.messageField.value.length;
            const max = this.messageField.maxLength;
            
            this.charCount.textContent = count;
            
            const counter = this.charCount.parentElement;
            counter.classList.remove('warning', 'danger');
            
            if (count > max * 0.8) {
                counter.classList.add('warning');
            }
            if (count > max * 0.95) {
                counter.classList.add('danger');
            }
        });
    }

    setupFormMetadata() {
        // Agregar fecha de envío
        const fechaEnvio = document.getElementById('fecha-envio');
        if (fechaEnvio) {
            fechaEnvio.value = new Date().toLocaleString('es-AR', {
                timeZone: 'America/Argentina/Buenos_Aires',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        // Agregar información del navegador
        const userAgent = document.getElementById('user-agent');
        if (userAgent) {
            const browser = this.getBrowserInfo();
            userAgent.value = `${browser.name} ${browser.version} (${navigator.platform})`;
        }
    }

    getBrowserInfo() {
        const ua = navigator.userAgent;
        let browser = { name: 'Unknown', version: '0' };

        if (ua.indexOf('Firefox') > -1) {
            browser.name = 'Firefox';
            browser.version = ua.match(/Firefox\/([0-9.]+)/)[1];
        } else if (ua.indexOf('Chrome') > -1) {
            browser.name = 'Chrome';
            browser.version = ua.match(/Chrome\/([0-9.]+)/)[1];
        } else if (ua.indexOf('Safari') > -1) {
            browser.name = 'Safari';
            browser.version = ua.match(/Version\/([0-9.]+)/)[1];
        } else if (ua.indexOf('Edge') > -1) {
            browser.name = 'Edge';
            browser.version = ua.match(/Edge\/([0-9.]+)/)[1];
        }

        return browser;
    }

    setupRealTimeValidation() {
        // Email validation
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('input', () => {
                if (emailField.value.length > 0) {
                    this.validateEmail(emailField);
                } else {
                    this.clearValidation(emailField);
                }
            });
        }

        // Name validation
        const nameField = document.getElementById('nombre');
        if (nameField) {
            nameField.addEventListener('input', () => {
                if (nameField.value.length > 0) {
                    this.validateName(nameField);
                } else {
                    this.clearValidation(nameField);
                }
            });
        }

        // Select validation
        const selectFields = this.form.querySelectorAll('select');
        selectFields.forEach(select => {
            select.addEventListener('change', () => {
                this.validateField(select);
            });
        });

        // Textarea validation
        const textareaField = document.getElementById('mensaje');
        if (textareaField) {
            textareaField.addEventListener('input', () => {
                if (textareaField.value.length > 0) {
                    this.validateTextarea(textareaField);
                } else {
                    this.clearValidation(textareaField);
                }
            });
        }
    }

    validateField(field) {
        const validationDiv = document.getElementById(`${field.id}-validation`);
        if (!validationDiv) return;

        let isValid = true;

        switch (field.type) {
            case 'email':
                isValid = this.validateEmail(field);
                break;
            case 'text':
                if (field.id === 'nombre') {
                    isValid = this.validateName(field);
                }
                break;
            case 'select-one':
                isValid = this.validateSelect(field);
                break;
            case 'textarea':
                isValid = this.validateTextarea(field);
                break;
        }

        return isValid;
    }

    validateEmail(field) {
        const validationDiv = document.getElementById(`${field.id}-validation`);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!field.value.trim()) {
            this.showValidation(validationDiv, 'error', 'El email es requerido');
            return false;
        }
        
        if (!emailRegex.test(field.value)) {
            this.showValidation(validationDiv, 'error', 'Por favor ingresa un email válido');
            return false;
        }
        
        this.showValidation(validationDiv, 'success', 'Email válido');
        return true;
    }

    validateName(field) {
        const validationDiv = document.getElementById(`${field.id}-validation`);
        
        if (!field.value.trim()) {
            this.showValidation(validationDiv, 'error', 'El nombre es requerido');
            return false;
        }
        
        if (field.value.trim().length < 2) {
            this.showValidation(validationDiv, 'error', 'El nombre debe tener al menos 2 caracteres');
            return false;
        }
        
        this.showValidation(validationDiv, 'success', 'Nombre válido');
        return true;
    }

    validateSelect(field) {
        const validationDiv = document.getElementById(`${field.id}-validation`);
        
        if (!field.value) {
            this.showValidation(validationDiv, 'error', 'Por favor selecciona una opción');
            return false;
        }
        
        this.showValidation(validationDiv, 'success', 'Selección válida');
        return true;
    }

    validateTextarea(field) {
        const validationDiv = document.getElementById(`${field.id}-validation`);
        
        if (!field.value.trim()) {
            this.showValidation(validationDiv, 'error', 'La descripción es requerida');
            return false;
        }
        
        if (field.value.trim().length < 20) {
            this.showValidation(validationDiv, 'error', 'La descripción debe tener al menos 20 caracteres');
            return false;
        }
        
        this.showValidation(validationDiv, 'success', 'Descripción válida');
        return true;
    }

    showValidation(element, type, message) {
        if (!element) return;
        
        element.className = `form-validation validation-${type}`;
        element.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
            ${message}
        `;
    }

    clearValidation(field) {
        const validationDiv = document.getElementById(`${field.id}-validation`);
        if (validationDiv) {
            validationDiv.className = 'form-validation';
            validationDiv.innerHTML = '';
        }
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showFormStatus(type, message) {
        this.formStatus.className = `form-status ${type}`;
        this.formStatus.innerHTML = message;
    }

    setSubmitState(isLoading) {
        this.isSubmitting = isLoading;
        this.submitBtn.disabled = isLoading;
        
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'flex';
            this.showFormStatus('loading', '<i class="fas fa-paper-plane"></i> Enviando tu mensaje...');
        } else {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        
        // Form submission process initiated
        
        // Validar formulario
        if (!this.validateForm()) {
            this.showFormStatus('error', '<i class="fas fa-exclamation-triangle"></i> Por favor corrige los errores antes de enviar');
            return;
        }
        
        // Actualizar metadatos antes del envío
        this.setupFormMetadata();
        
        // Estado de carga
        this.setSubmitState(true);
        
        // Simular delay para mejor UX (FormSubmit a veces es muy rápido)
        setTimeout(() => {
            this.form.submit();
        }, 1000);
    }
}

// Instancia global del FormHandler
const formHandler = new FormHandler();

// ============================================================================
// INICIALIZACIÓN MEJORADA
// ============================================================================

// Exportar app para debugging (opcional)
window.WebApp = app;
