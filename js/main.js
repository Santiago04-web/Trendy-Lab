/**
 * TRENDY LAB - Main JavaScript
 * Interactivity: Navigation, Modal handling, Dynamic WhatsApp orders & Inquiry forms.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Detection
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Navigation
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-link');

  const openDrawer = () => {
    mobileMenu?.classList.remove('hidden');
    setTimeout(() => {
      mobileMenu?.classList.remove('opacity-0');
      mobileMenu?.classList.add('opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileMenu?.classList.remove('opacity-100');
    mobileMenu?.classList.add('opacity-0');
    setTimeout(() => {
      mobileMenu?.classList.add('hidden');
    }, 300);
    document.body.style.overflow = '';
  };

  menuBtn?.addEventListener('click', openDrawer);
  menuClose?.addEventListener('click', closeDrawer);
  navLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 3. Modal Management
  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-open-modal');
      if (targetId) openModal(targetId);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-close-modal');
      if (targetId) closeModal(targetId);
    });
  });

  document.querySelectorAll('.modal-layer').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // 4. WhatsApp Product Buttons
  document.querySelectorAll('.btn-buy-wa').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.getAttribute('data-product') || 'Prendas de vestir';
      const msg = `¡Hola Trendy Lab! 👋 Estoy interesado/a en la línea de *${product}*. ¿Me podrían dar información de tallas y disponibilidad?`;
      const url = `https://wa.me/573042325470?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    });
  });

  // 5. Contact & Order Form
  const form = document.getElementById('contact-order-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name')?.value.trim() || '';
    const city = document.getElementById('form-city')?.value.trim() || '';
    const category = document.getElementById('form-category')?.value || 'Prendas de vestir';
    const message = document.getElementById('form-message')?.value.trim() || '';

    const text = `¡Hola Trendy Lab! 👋 Mi nombre es ${name}.%0A%0A*Ciudad de destino:* ${city}%0A*Línea de interés:* ${category}%0A*Detalle del pedido / Consulta:* ${message}%0A%0AQuedo atento/a para coordinar mi compra.`;
    const whatsappUrl = `https://wa.me/573042325470?text=${text}`;
    window.open(whatsappUrl, '_blank');
  });
});
