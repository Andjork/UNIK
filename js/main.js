// Tu código JavaScript existente aquí



// Funcionalidad específica para la sección de video
document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.video-container video');
    
    // Asegurar que el video se reproduzca automáticamente
    video.play().catch(function(error) {
        console.log('Reproducción automática prevenida:', error);
        // Aquí puedes agregar un botón de reproducción si es necesario
    });
    
    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', function() {
        // El CSS ya maneja el responsive, pero puedes agregar lógica adicional aquí
        console.log('Ventana redimensionada - video se adapta automáticamente');
    });
});

// Carrusel Pantalla Completa
// Datos para el carrusel
const carouselData = [
    { title: "Tu próximo logro comienza hoy" },
    { title: "Desarrolla tus habilidades profesionales" },
    { title: "Aprende con los mejores expertos" }
];

let currentIndex = 0;
const slides = document.querySelectorAll('.carrusel-fs-slide');
const dots = document.querySelectorAll('.carrusel-fs-dot');
const titleElement = document.getElementById('dynamicTitle');
let isAnimating = false;

function changeSlide(index) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;
    
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[index];
    const currentImage = currentSlide.querySelector('.carrusel-fs-imagen');
    
    // Cambiar título inmediatamente
    titleElement.textContent = carouselData[index].title;
    
    // Actualizar dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    // ⭐⭐ ENFOQUE COMPLETAMENTE NUEVO ⭐⭐
    
    // 1. MOSTRAR NUEVA IMAGEN INMEDIATAMENTE
    nextSlide.classList.add('active');
    nextSlide.style.display = 'block';
    nextSlide.style.opacity = '1';
    nextSlide.style.zIndex = '2';
    
    // 2. IMAGEN ACTUAL ENCIMA
    currentSlide.style.display = 'block';
    currentSlide.style.opacity = '1';
    currentSlide.style.zIndex = '3';
    
    // 3. CREAR CONTENEDOR DE TILES INDEPENDIENTE
    const tilesContainer = document.createElement('div');
    tilesContainer.className = 'tiles-container';
    tilesContainer.style.position = 'absolute';
    tilesContainer.style.top = '0';
    tilesContainer.style.left = '0';
    tilesContainer.style.width = '100%';
    tilesContainer.style.height = '100%';
    tilesContainer.style.zIndex = '4'; // Encima de todo
    
    // Agregar tilesContainer al carrusel-container (no al slide)
    const carruselContainer = document.querySelector('.carrusel-container');
    carruselContainer.appendChild(tilesContainer);
    
    const img = currentImage;
    const imgAspectRatio = img.naturalWidth / img.naturalHeight;
    
    let cols, rows;
    if (imgAspectRatio > 1.5) {
        cols = 12;
        rows = 8;
    } else if (imgAspectRatio > 1) {
        cols = 10;
        rows = 8;
    } else if (imgAspectRatio < 0.7) {
        cols = 8;
        rows = 12;
    } else if (imgAspectRatio < 1) {
        cols = 8;
        rows = 10;
    } else {
        cols = 8;
        rows = 8;
    }
    
    tilesContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    tilesContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    
    const totalTiles = cols * rows;
    let tilesAnimated = 0;
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            
            const bgPosX = (col / cols) * 100;
            const bgPosY = (row / rows) * 100;
            
            // TILES usan la imagen ACTUAL
            tile.style.backgroundImage = `url('${currentImage.src}')`;
            tile.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
            tile.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;
            
            const delay = (row * 0.12) + (col * 0.06);
            
            tilesContainer.appendChild(tile);
            
            setTimeout(() => {
                tile.style.opacity = '0';
                tile.style.transform = 'scale(0) rotate(45deg)';
                
                tilesAnimated++;
                
                // Cuando terminan los tiles, limpiar
                if (tilesAnimated === totalTiles) {
                    setTimeout(() => {
                        // Remover tiles container
                        tilesContainer.remove();
                        
                        // Ocultar imagen actual
                        currentSlide.style.display = 'none';
                        currentSlide.style.opacity = '0';
                        currentSlide.style.zIndex = '1';
                        currentSlide.classList.remove('active');
                        
                        currentIndex = index;
                        isAnimating = false;
                        
                        console.log('Cambio completado: Imagen', index, 'visible');
                    }, 400);
                }
            }, delay * 1000);
        }
    }
    
    console.log('Efecto iniciado: Nueva imagen', index, 'debería ser visible');
}

// Event listeners para los dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        changeSlide(index);
    });
});

// Cambio automático
function autoSlide() {
    if (!isAnimating) {
        let nextIndex = (currentIndex + 1) % slides.length;
        changeSlide(nextIndex);
    }
}

// Inicializar
slides[0].classList.add('active');
slides[0].style.display = 'block';
slides[0].style.opacity = '1';
slides[0].style.zIndex = '3';

// Ocultar otros slides
for (let i = 1; i < slides.length; i++) {
    slides[i].classList.remove('active');
    slides[i].style.display = 'none';
    slides[i].style.opacity = '0';
    slides[i].style.zIndex = '1';
}

// Iniciar cambio automático
setTimeout(() => {
    setInterval(autoSlide, 6000);
}, 3000);

// Inicializar carrusel cuando el DOM esté listo
/* document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando carrusel...');
    new CarruselFullscreen();
}); */

// Fallback en caso de que el DOM ya esté cargado
/* if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CarruselFullscreen());
} else {
    new CarruselFullscreen();
} */
// Funcionalidad para tarjetas PFAQ
/* document.addEventListener('DOMContentLoaded', function() {
  const pfaqCards = document.querySelectorAll('.pfaq-card');
  
  pfaqCards.forEach(card => {
    const toggleBtn = card.querySelector('.pfaq-toggle');
    const cardContent = card.querySelector('.pfaq-card-content');
    
    cardContent.addEventListener('click', function() {
      // Cerrar otras tarjetas abiertas
      pfaqCards.forEach(otherCard => {
        if (otherCard !== card && otherCard.classList.contains('active')) {
          otherCard.classList.remove('active');
        }
      });
      
      // Alternar tarjeta actual
      card.classList.toggle('active');
    });
    
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      cardContent.click();
    });
  });
}); */



// Inicializar cuando el DOM esté listo
/* document.addEventListener('DOMContentLoaded', function() {
    initMultimagesCarousel();
}); */
// cambio entre secciones del mooc

// Tabs para sección MOOC
function initMuestraTabs() {
    const tabBtns = document.querySelectorAll('.muestra-tab-sec-mooc');
    const tabContents = document.querySelectorAll('.muestra-content');
    
    if (!tabBtns.length || !tabContents.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Quitar 'active' de todos los botones
            tabBtns.forEach(b => b.classList.remove('active'));
            // Agregar 'active' solo al botón clickeado
            this.classList.add('active');
            
            // Obtener el tab target
            const tabId = this.getAttribute('data-tab');
            const targetContent = document.getElementById(`muestra-${tabId}`);
            
            // Ocultar todos los contenidos
            tabContents.forEach(tc => {
                tc.classList.remove('active');
            });
            
            // Mostrar el contenido correspondiente
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initMuestraTabs();
});

// Funcionalidades principales del micrositio UNIK


document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initHamburgerMenu();
    initFAQ();
    initDotsNavigation();
    initSmoothScroll();
    initAnimations();
    initLoginDropdown();
    initCarousel();
    initMoocTabs();
});

// Tabs MOOC/Acerca del MOOC
function initMoocTabs() {
    const tabBtns = document.querySelectorAll('.mooc-tab-btn');
    const tabContents = document.querySelectorAll('.mooc-tab-content');
    if (!tabBtns.length || !tabContents.length) return;

        // MOOC Tabs NUEVA SECCIÓN (cuatro botones sincronizados)
        function initMoocTabsNueva() {
            const tabBtnIds = [
                'mooc-tab-btn-main',
                'acerca-mooc-tab-btn-main',
                'mooc-tab-btn-main-2',
                'acerca-mooc-tab-btn-main-2'
            ];
            const tabBtns = tabBtnIds.map(id => document.getElementById(id));
            const tabContents = [
                document.getElementById('mooc-info'),
                document.getElementById('acerca-mooc')
            ];
            if (tabBtns.some(b => !b) || tabContents.some(tc => !tc)) return;

            function activateTab(idx) {
                // idx: 0 o 2 = MOOC, 1 o 3 = Acerca del MOOC
                const tabIdx = idx % 2;
                tabBtns.forEach((b, i) => {
                    if (i % 2 === tabIdx) {
                        b.classList.add('active');
                    } else {
                        b.classList.remove('active');
                    }
                });
                tabContents.forEach((tc, i) => {
                    if (i === tabIdx) {
                        tc.classList.add('active');
                        tc.style.display = '';
                    } else {
                        tc.classList.remove('active');
                        tc.style.display = 'none';
                    }
                });
            }
            tabBtns.forEach((btn, idx) => {
                btn.addEventListener('click', function() {
                    activateTab(idx);
                });
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            initMoocTabsNueva();
        });

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Quitar 'active' de todos los botones
            tabBtns.forEach(b => b.classList.remove('active'));
            // Agregar 'active' solo al botón clickeado
            this.classList.add('active');
            // Ocultar todos los contenidos
            tabContents.forEach(tc => {
                tc.classList.remove('active');
                tc.style.display = 'none';
            });
            // Mostrar el contenido correspondiente
            const tab = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tab);
            if (tabContent) {
                tabContent.classList.add('active');
                tabContent.style.display = '';
            }
        });
    });
}

// Menú hamburguesa
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu-principal');
    const body = document.body;

    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });

        // Cerrar menú al hacer clic en un enlace
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
}
