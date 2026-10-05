/**
 * TRENDY LAB - Main JavaScript
 * Handles navigation, modals, dynamic WhatsApp links, and interactive elements.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Header Effect
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navigation Drawer
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    mobileMenu?.classList.remove('hidden');
    setTimeout(() => {
      mobileMenu?.classList.remove('opacity-0');
      mobileMenu?.classList.add('opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    mobileMenu?.classList.remove('opacity-100');
    mobileMenu?.classList.add('opacity-0');
    setTimeout(() => {
      mobileMenu?.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
  };

  mobileMenuBtn?.addEventListener('click', openMobileMenu);
  mobileMenuClose?.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // 3. Modal Management
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Close modals on overlay click or button click
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      closeModal(modalId);
    });
  });

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      openModal(modalId);
    });
  });

  // 4. Contact Form Handler (Redirection to Official WhatsApp)
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('cf-name');
    const emailInput = document.getElementById('cf-email');
    const topicInput = document.getElementById('cf-topic');
    const messageInput = document.getElementById('cf-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const topic = topicInput ? topicInput.value.trim() : 'Consulta general';
    const message = messageInput ? messageInput.value.trim() : '';

    const text = `¡Hola Trendy Lab! 👋 Mi nombre es ${name}.%0A%0A*Asunto:* ${topic}%0A*Email:* ${email}%0A*Mensaje:* ${message}%0A%0AQuedo atento/a para más información.`;
    const whatsappUrl = `https://wa.me/573042325470?text=${text}`;

    window.open(whatsappUrl, '_blank');
  });

  // 5. Direct WhatsApp Product Inquiries
  document.querySelectorAll('.wa-product-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const productName = button.getAttribute('data-product-name') || 'prendas y colecciones';
      const text = `¡Hola Trendy Lab! 👋 Me gustaría recibir más información y disponibilidad sobre la línea de *${productName}*.`;
      const whatsappUrl = `https://wa.me/573042325470?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    });
  });
});
