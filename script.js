/* ==========================================================================
   Julio Cárdenas — Portafolio
   script.js · galería (intacta) + tema + scrollspy + reveal
   ========================================================================== */

function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Funcionalidad de la galería de proyectos
let currentImageIndexes = [1, 1, 1, 1]; // Array para mantener el índice actual de cada proyecto
let currentModalProject = -1; // Proyecto actual en el modal

let lastFocusedBeforeModal = null; // Elemento con foco antes de abrir el modal

// Función para mostrar una imagen específica
function showImage(projectIndex, imageIndex) {
  const gallery = document.querySelectorAll('.project-gallery')[projectIndex];
  const images = gallery.querySelectorAll('.project-img');
  const dots = gallery.querySelectorAll('.dot');

  // Ocultar todas las imágenes
  images.forEach(img => img.classList.remove('active'));

  // Desactivar todos los puntos y resetear el roving tabindex
  dots.forEach(function (dot) {
    dot.classList.remove('active');
    dot.tabIndex = -1;
    dot.removeAttribute('aria-current');
  });

  // Mostrar la imagen actual
  if (images[imageIndex - 1]) {
    images[imageIndex - 1].classList.add('active');
  }

  // Activar el punto correspondiente (focusable en el orden de tab)
  if (dots[imageIndex - 1]) {
    dots[imageIndex - 1].classList.add('active');
    dots[imageIndex - 1].setAttribute('aria-current', 'true');
    dots[imageIndex - 1].tabIndex = 0;
  }

  currentImageIndexes[projectIndex] = imageIndex;

  // Actualizar etiqueta accesible del contenedor (imagen actual)
  const gc = gallery.querySelector('.gallery-container');
  if (gc) gc.setAttribute('aria-label', 'Abrir imagen ' + imageIndex + ' de ' + images.length + ' en pantalla completa');
}

// Función para cambiar imagen (siguiente/anterior)
function changeImage(projectIndex, direction) {
  const gallery = document.querySelectorAll('.project-gallery')[projectIndex];
  const images = gallery.querySelectorAll('.project-img');
  const totalImages = images.length;

  if (totalImages <= 1) return; // No hacer nada si solo hay una imagen

  let newIndex = currentImageIndexes[projectIndex] + direction;

  // Hacer el carrusel circular
  if (newIndex > totalImages) {
    newIndex = 1;
  } else if (newIndex < 1) {
    newIndex = totalImages;
  }

  showImage(projectIndex, newIndex);
}

// Función para ir directamente a una imagen específica
function currentImage(projectIndex, imageIndex) {
  showImage(projectIndex, imageIndex);
}

// Funcionalidad del Modal
function openImageModal(projectIndex, imageIndex) {
  const gallery = document.querySelectorAll('.project-gallery')[projectIndex];
  const images = gallery.querySelectorAll('.project-img');
  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const modalInfo = document.getElementById('modalInfo');

  if (images[imageIndex - 1]) {
    const wasOpen = modal.classList.contains('show');
    currentModalProject = projectIndex;
    modalImage.src = images[imageIndex - 1].src;
    modalImage.alt = images[imageIndex - 1].alt;

    // Información del proyecto
    const projectTitles = ['Serotonina', 'Restaurante Juls', 'JobJuls', 'Viajando por Colombia'];
    modalInfo.textContent = `${projectTitles[projectIndex]} - Imagen ${imageIndex} de ${images.length}`;

    // Al abrir por primera vez: bloquear scroll, capturar el foco y moverlo al modal
    if (!wasOpen) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevenir scroll
      lastFocusedBeforeModal = document.activeElement;
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) closeBtn.focus();
    }
  }
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto'; // Restaurar scroll
  currentModalProject = -1;
  if (lastFocusedBeforeModal) {
    lastFocusedBeforeModal.focus();
    lastFocusedBeforeModal = null;
  }
}

function changeModalImage(direction) {
  if (currentModalProject === -1) return;

  const gallery = document.querySelectorAll('.project-gallery')[currentModalProject];
  const images = gallery.querySelectorAll('.project-img');
  const totalImages = images.length;

  if (totalImages <= 1) return;

  let newIndex = currentImageIndexes[currentModalProject] + direction;

  // Hacer el carrusel circular
  if (newIndex > totalImages) {
    newIndex = 1;
  } else if (newIndex < 1) {
    newIndex = totalImages;
  }

  // Actualizar la galería principal
  showImage(currentModalProject, newIndex);

  // Actualizar el modal
  openImageModal(currentModalProject, newIndex);
}

// Inicializar las galerías cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
  // Inicializar cada galería
  const galleries = document.querySelectorAll('.project-gallery');

  galleries.forEach((gallery, projectIndex) => {
    const images = gallery.querySelectorAll('.project-img');
    const dots = gallery.querySelectorAll('.dot');
    const prevBtn = gallery.querySelector('.prev-btn');
    const nextBtn = gallery.querySelector('.next-btn');
    const galleryContainer = gallery.querySelector('.gallery-container');

    // Si solo hay una imagen, ocultar la navegación
    if (images.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      dots.forEach(dot => dot.style.display = 'none');
    }

    // Agregar event listener para abrir modal al hacer click en la imagen
    if (galleryContainer) {
      galleryContainer.addEventListener('click', function (e) {
        openImageModal(projectIndex, currentImageIndexes[projectIndex]);
      });
    }

    // Contenedor de la galería operable por teclado: abre el modal con Enter/Espacio
    if (galleryContainer) {
      galleryContainer.tabIndex = 0;
      galleryContainer.setAttribute('role', 'button');
      galleryContainer.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openImageModal(projectIndex, currentImageIndexes[projectIndex]);
        }
      });
    }

    // Puntos operables por teclado con roving tabindex (1 solo stop de tab por galería)
    const dotsContainer = gallery.querySelector('.gallery-dots');
    if (dotsContainer) dotsContainer.setAttribute('role', 'tablist');
    dots.forEach(function (dot, i) {
      if (dot.style.display === 'none') return; // puntos ocultos en galerías de 1 imagen
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Imagen ' + (i + 1) + ' de ' + images.length);
      dot.tabIndex = (i + 1 === currentImageIndexes[projectIndex]) ? 0 : -1;
      dot.addEventListener('keydown', function (e) {
        let total = dots.length;
        let idx = i;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); idx = (i + 1) % total; }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); idx = (i - 1 + total) % total; }
        else if (e.key === 'Home') { e.preventDefault(); idx = 0; }
        else if (e.key === 'End') { e.preventDefault(); idx = total - 1; }
        else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); currentImage(projectIndex, i + 1); return; }
        else return;
        currentImage(projectIndex, idx + 1);
        if (dots[idx]) dots[idx].focus();
      });
    });

    // Mostrar la primera imagen
    showImage(projectIndex, 1);
  });

  // Event listeners para el modal
  const modal = document.getElementById('imageModal');
  const closeBtn = document.querySelector('.modal-close');
  const prevModalBtn = document.querySelector('.modal-prev');
  const nextModalBtn = document.querySelector('.modal-next');

  // Cerrar modal
  if (closeBtn) {
    closeBtn.addEventListener('click', closeImageModal);
  }

  // Cerrar modal al hacer click fuera de la imagen
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeImageModal();
      }
    });
  }

  // Navegación del modal
  if (prevModalBtn) {
    prevModalBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      changeModalImage(-1);
    });
  }

  if (nextModalBtn) {
    nextModalBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      changeModalImage(1);
    });
  }

  // Navegación con teclado para el modal
  document.addEventListener('keydown', function (event) {
    if (currentModalProject !== -1) {

      // Trap de foco: mantener la navegación por teclado dentro del modal
      if (event.key === 'Tab') {
        const focusable = [modal.querySelector('.modal-close'), modal.querySelector('.modal-prev'), modal.querySelector('.modal-next')].filter(Boolean);
        if (focusable.length) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
        return;
      }
      switch (event.key) {
        case 'Escape':
          closeImageModal();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          changeModalImage(-1);
          break;
        case 'ArrowRight':
          event.preventDefault();
          changeModalImage(1);
          break;
      }
      return;
    }

    // Navegación normal de la galería
    const focusedGallery = document.querySelector('.project-gallery:hover');
    if (!focusedGallery) return;

    const galleries = Array.from(document.querySelectorAll('.project-gallery'));
    const projectIndex = galleries.indexOf(focusedGallery);

    if (projectIndex === -1) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        changeImage(projectIndex, -1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        changeImage(projectIndex, 1);
        break;
    }
  });

  /* ----------------------------------------------------------------------
     Toggle de tema claro/oscuro
     ---------------------------------------------------------------------- */
  const toggleBtns = document.querySelectorAll('.theme-toggle');
  function syncToggle() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    toggleBtns.forEach(b => b.setAttribute('aria-pressed', String(dark)));
  }
  toggleBtns.forEach(btn => btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    syncToggle();
  }));
  syncToggle();

  /* ----------------------------------------------------------------------
     Scrollspy
     ---------------------------------------------------------------------- */
  const sections = [...document.querySelectorAll('section[id]')];
  const navAnchors = [...document.querySelectorAll('#desktop-nav .nav-links a, #hamburger-nav .menu-links a')];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const id = en.target.id;
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => spy.observe(s));

  /* ----------------------------------------------------------------------
     Reveal on scroll
     ---------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  /* ----------------------------------------------------------------------
     Año dinámico del footer
     ---------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
