/**
 * SAFEN CYBERSECURITY - Main JavaScript
 * Handles smooth scrolling, animations, and form validation
 */

(function() {
  'use strict';

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip empty hash or just #
        if (href === '#' || href === '') {
          return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without jumping
          if (history.pushState) {
            history.pushState(null, null, href);
          }
          
          // Update active nav link
          updateActiveNavLink(href);
        }
      });
    });
  }

  // ============================================
  // Update Active Navigation Link
  // ============================================
  
  function updateActiveNavLink(activeHash) {
    const navLinks = document.querySelectorAll('.navlinks .btn');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === activeHash) {
        link.classList.add('active');
      }
    });
  }

  // ============================================
  // Intersection Observer for Scroll Animations
  // ============================================
  
  function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all sections immediately
      const sections = document.querySelectorAll('section');
      sections.forEach(section => section.classList.add('visible'));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Animate cards with stagger effect
          if (entry.target.querySelector('.grid-3')) {
            animateCards(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // ============================================
  // Animate Cards with Stagger Effect
  // ============================================
  
  function animateCards(section) {
    const cards = section.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }

  // ============================================
  // Form Validation
  // ============================================
  
  function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = {
      nome: {
        input: document.getElementById('nome'),
        error: document.getElementById('nome-error'),
        validate: (value) => {
          if (!value.trim()) {
            return 'Por favor, informe seu nome.';
          }
          if (value.trim().length < 2) {
            return 'O nome deve ter pelo menos 2 caracteres.';
          }
          return '';
        }
      },
      email: {
        input: document.getElementById('email'),
        error: document.getElementById('email-error'),
        validate: (value) => {
          if (!value.trim()) {
            return 'Por favor, informe seu e-mail.';
          }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            return 'Por favor, informe um e-mail válido.';
          }
          // Check for corporate email (basic check)
          const corporateDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
          const domain = value.split('@')[1]?.toLowerCase();
          if (corporateDomains.includes(domain)) {
            return 'Por favor, use seu e-mail corporativo.';
          }
          return '';
        }
      },
      mensagem: {
        input: document.getElementById('mensagem'),
        error: document.getElementById('mensagem-error'),
        validate: (value) => {
          if (!value.trim()) {
            return 'Por favor, descreva seu ambiente de TI e desafios.';
          }
          if (value.trim().length < 10) {
            return 'A mensagem deve ter pelo menos 10 caracteres.';
          }
          return '';
        }
      }
    };

    // Real-time validation on input
    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      
      field.input.addEventListener('blur', () => {
        validateField(field);
      });
      
      field.input.addEventListener('input', () => {
        // Clear error on input if field is valid
        if (field.input.validity.valid && field.input.value.trim()) {
          clearFieldError(field);
        }
      });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      
      // Validate all fields
      Object.keys(fields).forEach(fieldName => {
        const field = fields[fieldName];
        const error = validateField(field);
        if (error) {
          isValid = false;
        }
      });
      
      if (isValid) {
        submitForm(form, fields);
      } else {
        // Focus first invalid field
        const firstInvalid = Object.values(fields).find(field => {
          return validateField(field);
        });
        if (firstInvalid) {
          firstInvalid.input.focus();
        }
      }
    });

    function validateField(field) {
      const value = field.input.value;
      const errorMessage = field.validate(value);
      
      if (errorMessage) {
        showFieldError(field, errorMessage);
        field.input.setAttribute('aria-invalid', 'true');
        return errorMessage;
      } else {
        clearFieldError(field);
        field.input.setAttribute('aria-invalid', 'false');
        return '';
      }
    }

    function showFieldError(field, message) {
      field.error.textContent = message;
      field.error.classList.add('show');
      field.input.classList.add('error');
    }

    function clearFieldError(field) {
      field.error.textContent = '';
      field.error.classList.remove('show');
      field.input.classList.remove('error');
    }

    function submitForm(form, fields) {
      const submitButton = form.querySelector('button[type="submit"]');
      const successMessage = document.getElementById('form-success');
      
      // Disable form and show loading state
      submitButton.disabled = true;
      submitButton.classList.add('loading');
      
      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Success state
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        
        successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
        successMessage.classList.add('show');
        
        // Reset form
        form.reset();
        Object.keys(fields).forEach(fieldName => {
          clearFieldError(fields[fieldName]);
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          successMessage.classList.remove('show');
        }, 5000);
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 1500);
    }
  }

  // ============================================
  // Active Section Detection on Scroll
  // ============================================
  
  function initActiveSectionDetection() {
    if (!('IntersectionObserver' in window)) return;

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navlinks .btn[href^="#"]');
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          updateActiveNavLink('#' + id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // ============================================
  // Lazy Loading for Images
  // ============================================
  
  function initLazyLoading() {
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        img.src = img.dataset.src || img.src;
      });
    } else {
      // Fallback for browsers without native lazy loading
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      const lazyImages = document.querySelectorAll('img.lazy');
      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  // ============================================
  // Performance: Reduce Motion for Users
  // ============================================
  
  function respectReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      // Disable animations
      const style = document.createElement('style');
      style.textContent = `
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ============================================
  // Initialize Everything
  // ============================================
  
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Initialize all features
    respectReducedMotion();
    initSmoothScroll();
    initScrollAnimations();
    initFormValidation();
    initActiveSectionDetection();
    initLazyLoading();
    
    // Show hero immediately (no animation delay)
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.opacity = '1';
    }
  }

  // Start initialization
  init();

})();
