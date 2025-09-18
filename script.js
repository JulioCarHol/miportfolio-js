function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Funcionalidad de la galería de proyectos
let currentImageIndexes = [1, 1, 1, 1]; // Array para mantener el índice actual de cada proyecto
let currentModalProject = -1; // Proyecto actual en el modal

// Función para mostrar una imagen específica
function showImage(projectIndex, imageIndex) {
  const gallery = document.querySelectorAll('.project-gallery')[projectIndex];
  const images = gallery.querySelectorAll('.project-img');
  const dots = gallery.querySelectorAll('.dot');
  
  // Ocultar todas las imágenes
  images.forEach(img => img.classList.remove('active'));
  
  // Desactivar todos los puntos
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Mostrar la imagen actual
  if (images[imageIndex - 1]) {
    images[imageIndex - 1].classList.add('active');
  }
  
  // Activar el punto correspondiente
  if (dots[imageIndex - 1]) {
    dots[imageIndex - 1].classList.add('active');
  }
  
  currentImageIndexes[projectIndex] = imageIndex;
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
    currentModalProject = projectIndex;
    modalImage.src = images[imageIndex - 1].src;
    modalImage.alt = images[imageIndex - 1].alt;
    
    // Información del proyecto
    const projectTitles = ['Serotonina', 'Restaurante Juls', 'JobJuls', 'Viajando por Colombia'];
    modalInfo.textContent = `${projectTitles[projectIndex]} - Imagen ${imageIndex} de ${images.length}`;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  }
}

function closeImageModal() {
  const modal = document.getElementById('imageModal');
  modal.classList.remove('show');
  document.body.style.overflow = 'auto'; // Restaurar scroll
  currentModalProject = -1;
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
document.addEventListener('DOMContentLoaded', function() {
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
      galleryContainer.addEventListener('click', function(e) {
        openImageModal(projectIndex, currentImageIndexes[projectIndex]);
      });
    }
    
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
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeImageModal();
      }
    });
  }
  
  // Navegación del modal
  if (prevModalBtn) {
    prevModalBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      changeModalImage(-1);
    });
  }
  
  if (nextModalBtn) {
    nextModalBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      changeModalImage(1);
    });
  }
  
  // Navegación con teclado para el modal
  document.addEventListener('keydown', function(event) {
    if (currentModalProject !== -1) {
      switch(event.key) {
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
    
    switch(event.key) {
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
});
