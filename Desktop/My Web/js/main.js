/**
 * Main JavaScript File
 * Funcionalidades: tema claro/oscuro, navegación móvil, formulario EmailJS, filtros, etc.
 */

(function() {
  'use strict';

  // ============================================
  // INICIALIZACIÓN
  // ============================================

  document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initNavigation();
    initContactForm();
    initProjectFilters();
    initBackToTop();
    initCurrentYear();
    initSkipLink();
    initParallax();
  });

  // ============================================
  // TEMA CLARO/OSCURO
  // ============================================

  function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Obtener tema guardado o detectar preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemPreference;
    
    // Aplicar tema inicial
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Listener para cambios en preferencia del sistema (solo si no hay tema guardado)
    if (!savedTheme) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        const newTheme = e.matches ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
      });
    }
    
    // Toggle manual
    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Anunciar cambio para lectores de pantalla
        announceThemeChange(newTheme);
      });
    }
  }

  function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    
    if (theme === 'dark') {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
      themeToggle.setAttribute('aria-label', 'Cambiar a tema claro');
    } else {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
      themeToggle.setAttribute('aria-label', 'Cambiar a tema oscuro');
    }
  }

  function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Tema cambiado a ${theme === 'dark' ? 'oscuro' : 'claro'}`;
    document.body.appendChild(announcement);
    
    setTimeout(function() {
      document.body.removeChild(announcement);
    }, 1000);
  }

  // ============================================
  // NAVEGACIÓN MÓVIL
  // ============================================

  function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) return;
    
    // Función para cerrar el menú
    function closeMenu() {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = ''; // Restaurar scroll
    }
    
    // Función para abrir el menú
    function openMenu() {
      navToggle.setAttribute('aria-expanded', 'true');
      navMenu.setAttribute('aria-expanded', 'true');
      if (window.innerWidth < 768) {
        document.body.style.overflow = 'hidden'; // Prevenir scroll cuando el menú está abierto
      }
    }
    
    // Toggle menú móvil
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    
    // Cerrar menú al hacer clic en un enlace (usando delegación de eventos)
    navMenu.addEventListener('click', function(e) {
      if (e.target.classList.contains('nav__link')) {
        closeMenu();
      }
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
      if (navToggle.getAttribute('aria-expanded') === 'true') {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
          closeMenu();
        }
      }
    });
    
    // Cerrar menú con Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        navToggle.focus();
      }
    });
    
    // Cerrar menú al redimensionar ventana si es grande
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });
    
    // Header sticky con sombra y efecto en hero
    const header = document.getElementById('header');
    const heroSection = document.getElementById('hero-section');
    
    if (header) {
      window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 10) {
          header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
          header.style.backdropFilter = 'blur(20px) saturate(180%)';
        } else {
          header.style.boxShadow = 'none';
          header.style.backdropFilter = 'blur(10px) saturate(180%)';
        }
        
        // Ocultar fondo del hero al hacer scroll
        if (heroSection) {
          if (currentScroll > 100) {
            heroSection.classList.add('scrolled');
          } else {
            heroSection.classList.remove('scrolled');
          }
        }
      });
    }
  }

  // ============================================
  // FORMULARIO DE CONTACTO (EmailJS)
  // ============================================

  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Inicializar EmailJS (si está disponible)
    if (typeof emailjs !== 'undefined') {
      // Configurar EmailJS con credenciales
      const emailjsConfig = {
        serviceId: 'service_5tetwmp',
        templateId: 'template_ddtz01q',
        publicKey: 'SHCCKv__9-9XVNQDv'
      };
      
      // Permitir override desde variables de entorno si están disponibles (útil para producción)
      if (window.EMAILJS_SERVICE_ID) {
        emailjsConfig.serviceId = window.EMAILJS_SERVICE_ID;
      }
      if (window.EMAILJS_TEMPLATE_ID) {
        emailjsConfig.templateId = window.EMAILJS_TEMPLATE_ID;
      }
      if (window.EMAILJS_PUBLIC_KEY) {
        emailjsConfig.publicKey = window.EMAILJS_PUBLIC_KEY;
      }
      
      // Inicializar EmailJS
      emailjs.init(emailjsConfig.publicKey);
      
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm(contactForm)) {
          return;
        }
        
        const submitBtn = contactForm.querySelector('#submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const formMessage = document.getElementById('form-message');
        
        // Mostrar loader
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        
        // Preparar datos del formulario
        const formData = {
          from_name: contactForm.querySelector('#name').value,
          from_email: contactForm.querySelector('#email').value,
          phone: contactForm.querySelector('#phone').value || 'No proporcionado',
          subject: contactForm.querySelector('#subject').value,
          message: contactForm.querySelector('#message').value
        };
        
        // Enviar email
        emailjs.send(
          emailjsConfig.serviceId,
          emailjsConfig.templateId,
          formData
        )
        .then(function() {
          // Éxito
          formMessage.textContent = '¡Mensaje enviado con éxito! Te responderé pronto.';
          formMessage.className = 'form-message success';
          contactForm.reset();
          submitBtn.disabled = false;
          btnText.style.display = 'inline';
          btnLoader.style.display = 'none';
          
          // Scroll a mensaje
          formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        })
        .catch(function(error) {
          // Error
          console.error('Error al enviar email:', error);
          formMessage.textContent = 'Hubo un error al enviar el mensaje. Por favor, intentá nuevamente o contactame directamente por email.';
          formMessage.className = 'form-message error';
          submitBtn.disabled = false;
          btnText.style.display = 'inline';
          btnLoader.style.display = 'none';
          
          // Fallback a mailto
          showMailtoFallback(formData);
        });
      });
    } else {
      // Fallback: usar mailto si EmailJS no está disponible
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm(contactForm)) {
          return;
        }
        
        const formData = {
          name: contactForm.querySelector('#name').value,
          email: contactForm.querySelector('#email').value,
          phone: contactForm.querySelector('#phone').value,
          subject: contactForm.querySelector('#subject').value,
          message: contactForm.querySelector('#message').value
        };
        
        showMailtoFallback(formData);
      });
    }
    
    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(function(input) {
      input.addEventListener('blur', function() {
        validateField(input);
      });
      
      input.addEventListener('input', function() {
        if (input.classList.contains('invalid')) {
          validateField(input);
        }
      });
    });
  }

  function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(function(input) {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    // Validar checkbox de privacidad
    const privacyCheckbox = form.querySelector('#privacy');
    if (privacyCheckbox && !privacyCheckbox.checked) {
      const errorElement = document.getElementById('privacy-error');
      if (errorElement) {
        errorElement.textContent = 'Debés aceptar la política de privacidad';
      }
      isValid = false;
    }
    
    return isValid;
  }

  function validateField(field) {
    const errorElement = document.getElementById(field.id + '-error');
    let isValid = true;
    let errorMessage = '';
    
    // Remover clase invalid
    field.classList.remove('invalid');
    
    // Validar campo requerido
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = 'Este campo es obligatorio';
    }
    
    // Validar email
    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        errorMessage = 'Ingresá un email válido';
      }
    }
    
    // Validar teléfono (opcional, pero si tiene valor debe ser válido)
    if (field.type === 'tel' && field.value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(field.value)) {
        isValid = false;
        errorMessage = 'Ingresá un teléfono válido';
      }
    }
    
    // Mostrar error
    if (errorElement) {
      if (!isValid) {
        errorElement.textContent = errorMessage;
        field.classList.add('invalid');
        field.setAttribute('aria-invalid', 'true');
      } else {
        errorElement.textContent = '';
        field.removeAttribute('aria-invalid');
      }
    }
    
    return isValid;
  }

  function showMailtoFallback(formData) {
    const subject = encodeURIComponent(formData.subject || 'Consulta desde web');
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Teléfono: ${formData.phone || 'No proporcionado'}\n\n` +
      `Mensaje:\n${formData.message}`
    );
    
    const mailtoLink = `mailto:adm201364@gmail.com?subject=${subject}&body=${body}`;
    
    // Mostrar mensaje informativo
    const formMessage = document.getElementById('form-message');
    if (formMessage) {
      formMessage.innerHTML = `
        <p>EmailJS no está configurado. Redirigiendo a tu cliente de email...</p>
        <p><small>Si no se abre automáticamente, <a href="${mailtoLink}">hacé clic aquí</a></small></p>
      `;
      formMessage.className = 'form-message';
    }
    
    // Abrir mailto después de un breve delay
    setTimeout(function() {
      window.location.href = mailtoLink;
    }, 1000);
  }

  // ============================================
  // FILTROS DE PROYECTOS
  // ============================================

  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const filter = button.getAttribute('data-filter');
        
        // Actualizar botones activos
        filterButtons.forEach(function(btn) {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        
        // Filtrar proyectos
        projectCards.forEach(function(card) {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            // Animación de entrada
            setTimeout(function() {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(function() {
              card.style.display = 'none';
            }, 300);
          }
        });
        
        // Anunciar cambio para lectores de pantalla
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Mostrando proyectos: ${filter === 'all' ? 'todos' : filter}`;
        document.body.appendChild(announcement);
        
        setTimeout(function() {
          document.body.removeChild(announcement);
        }, 1000);
      });
    });
  }

  // ============================================
  // BOTÓN BACK TO TOP
  // ============================================

  function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
        backToTopBtn.style.opacity = '1';
      } else {
        backToTopBtn.style.opacity = '0';
        setTimeout(function() {
          if (window.pageYOffset <= 300) {
            backToTopBtn.style.display = 'none';
          }
        }, 300);
      }
    });
    
    // Scroll suave al hacer clic
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Enfocar el contenido principal para accesibilidad
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus();
      }
    });
    
    // Inicialmente oculto
    backToTopBtn.style.display = 'none';
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.transition = 'opacity 0.3s ease';
  }

  // ============================================
  // AÑO ACTUAL EN FOOTER
  // ============================================

  function initCurrentYear() {
    const yearElements = document.querySelectorAll('#current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(function(element) {
      element.textContent = currentYear;
    });
  }

  // ============================================
  // SKIP LINK
  // ============================================

  function initSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    if (!skipLink) return;
    
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(skipLink.getAttribute('href'));
      
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Remover tabindex después de un momento
        setTimeout(function() {
          target.removeAttribute('tabindex');
        }, 1000);
      }
    });
  }

  // ============================================
  // EFECTO PARALLAX
  // ============================================

  function initParallax() {
    // Verificar si el usuario prefiere movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return; // No aplicar parallax si el usuario prefiere movimiento reducido
    }

    // Elementos con efecto parallax
    const parallaxElements = [];
    let ticking = false;

    // Función para calcular el parallax
    function updateParallax() {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;

      parallaxElements.forEach(function(element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;
        const elementCenter = elementTop + elementHeight / 2;
        
        // Calcular si el elemento está en el viewport
        const viewportCenter = scrollY + windowHeight / 2;
        const distanceFromCenter = viewportCenter - elementCenter;
        
        // Aplicar parallax solo si está cerca del viewport
        if (rect.bottom >= 0 && rect.top <= windowHeight) {
          const speed = element.dataset.parallaxSpeed || 0.5;
          const offset = distanceFromCenter * speed;
          
          // Aplicar transformación
          if (element.classList.contains('parallax-bg')) {
            element.style.transform = `translateY(${offset}px)`;
          } else if (element.classList.contains('parallax-element')) {
            element.style.transform = `translateY(${offset * 0.3}px)`;
          }
        }
      });

      ticking = false;
    }

    // Función optimizada con requestAnimationFrame
    function requestTick() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    // Inicializar elementos parallax
    function initParallaxElements() {
      // Hero background con parallax
      const heroBackground = document.querySelector('.hero__background');
      if (heroBackground) {
        heroBackground.dataset.parallaxSpeed = '0.5';
        heroBackground.classList.add('parallax-bg');
        parallaxElements.push(heroBackground);
      }

      // Fondos parallax de secciones
      const parallaxBackgrounds = document.querySelectorAll('.section--parallax');
      parallaxBackgrounds.forEach(function(section) {
        // Crear un elemento wrapper para el fondo parallax
        let bgWrapper = section.querySelector('.parallax-bg-wrapper');
        if (!bgWrapper) {
          bgWrapper = document.createElement('div');
          bgWrapper.className = 'parallax-bg-wrapper';
          bgWrapper.style.cssText = 'position: absolute; top: -20%; left: 0; right: 0; bottom: -20%; width: 100%; height: 140%; z-index: 0; pointer-events: none;';
          bgWrapper.style.backgroundImage = window.getComputedStyle(section).backgroundImage;
          bgWrapper.style.backgroundSize = 'cover';
          bgWrapper.style.backgroundPosition = 'center';
          bgWrapper.style.backgroundRepeat = 'no-repeat';
          section.insertBefore(bgWrapper, section.firstChild);
        }
        bgWrapper.dataset.parallaxSpeed = '0.4';
        bgWrapper.classList.add('parallax-bg');
        parallaxElements.push(bgWrapper);
      });

      // Elementos individuales con parallax
      const parallaxItems = document.querySelectorAll('[data-parallax]');
      parallaxItems.forEach(function(item) {
        item.classList.add('parallax-element');
        if (!item.dataset.parallaxSpeed) {
          item.dataset.parallaxSpeed = '0.3';
        }
        parallaxElements.push(item);
      });

      // Logo en hero con parallax suave
      const heroLogo = document.querySelector('.hero__logo .logo-image');
      if (heroLogo) {
        heroLogo.dataset.parallaxSpeed = '0.15';
        heroLogo.classList.add('parallax-element');
        parallaxElements.push(heroLogo);
      }

      // Logos en secciones con parallax más suave
      const sectionLogos = document.querySelectorAll('.section__logo .logo-image');
      sectionLogos.forEach(function(logo) {
        logo.dataset.parallaxSpeed = '0.1';
        logo.classList.add('parallax-element');
        parallaxElements.push(logo);
      });

      // Partículas con parallax variable
      const particles = document.querySelectorAll('.particle');
      particles.forEach(function(particle, index) {
        const speed = 0.05 + (index % 5) * 0.02;
        particle.dataset.parallaxSpeed = speed.toString();
        particle.classList.add('parallax-element');
        parallaxElements.push(particle);
      });

      // Cards con parallax sutil
      const cards = document.querySelectorAll('.service-card, .project-card');
      cards.forEach(function(card, index) {
        if (index % 2 === 0) {
          card.dataset.parallax = 'true';
          card.dataset.parallaxSpeed = '0.05';
          card.classList.add('parallax-element');
          parallaxElements.push(card);
        }
      });
    }

    // Inicializar
    initParallaxElements();

    // Escuchar eventos de scroll
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick);

    // Ejecutar una vez al cargar
    updateParallax();
  }

  // ============================================
  // UTILIDADES ADICIONALES
  // ============================================

  // Prevenir envío de formularios con Enter en campos no apropiados
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON' && e.target.type !== 'submit') {
      const form = e.target.closest('form');
      if (form && form.querySelector('button[type="submit"]')) {
        e.preventDefault();
        form.querySelector('button[type="submit"]').click();
      }
    }
  });

  // Lazy loading para imágenes (si se agregan en el futuro)
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(function(img) {
      imageObserver.observe(img);
    });
  }

  // Manejo de errores globales
  window.addEventListener('error', function(e) {
    console.error('Error:', e.error);
    // Aquí podrías enviar errores a un servicio de logging si es necesario
  });

})();
