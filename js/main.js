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

function createTiles(imageUrl) {
    const tilesContainer = document.createElement('div');
    tilesContainer.className = 'tiles-container';
    tilesContainer.style.position = 'absolute';
    tilesContainer.style.top = '0';
    tilesContainer.style.left = '0';
    tilesContainer.style.width = '100%';
    tilesContainer.style.height = '100%';
    tilesContainer.style.zIndex = '10';
    tilesContainer.style.display = 'grid';
    tilesContainer.style.gridTemplateColumns = 'repeat(10, 1fr)';
    tilesContainer.style.gridTemplateRows = 'repeat(6, 1fr)';
    
    const columns = 10;
    const rows = 6;

    for (let i = 0; i < columns * rows; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        
        const col = i % columns;
        const row = Math.floor(i / columns);
        
        tile.style.backgroundImage = `url('${imageUrl}')`;
        tile.style.backgroundSize = `${columns * 100}% ${rows * 100}%`;
        tile.style.backgroundPosition = `${col * (100 / (columns - 1))}% ${row * (100 / (rows - 1))}%`;
        tile.style.opacity = '1';
        tile.style.transform = 'scale(1)';
        tile.style.transition = 'all 0.5s ease';
        
        tilesContainer.appendChild(tile);
    }
    
    document.querySelector('.carrusel-container').appendChild(tilesContainer);
    return tilesContainer;
}

function animateTiles(tilesContainer, callback) {
    const tiles = tilesContainer.querySelectorAll('.tile');
    
    tiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.style.opacity = '0';
            tile.style.transform = 'scale(0.3) rotate(20deg)';
        }, index * 25);
    });

    setTimeout(() => {
        tilesContainer.remove();
        callback();
    }, 1600);
}

function changeSlide(index) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;
    
    const currentSlide = slides[currentIndex];
    const nextSlide = slides[index];
    const currentImage = currentSlide.querySelector('.carrusel-fs-imagen');
    const nextImage = nextSlide.querySelector('.carrusel-fs-imagen');
    
    // Cambiar título inmediatamente
    titleElement.textContent = carouselData[index].title;
    
    // Actualizar dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    // ⭐⭐ LÓGICA CORRECTA BASADA EN TU CÓDIGO ⭐⭐
    
    // 1. Crear tiles con la imagen ACTUAL
    const tilesContainer = createTiles(currentImage.src);
    
    // 2. MOSTRAR NUEVA IMAGEN INMEDIATAMENTE
    currentSlide.classList.remove('active');
    currentSlide.style.opacity = '0';
    nextSlide.classList.add('active');
    nextSlide.style.opacity = '1';
    
    console.log('🔄 Imagen cambiada - Nueva imagen visible AHORA');
    
    // 3. Animar tiles
    animateTiles(tilesContainer, () => {
        // Limpieza después de la animación
        currentIndex = index;
        isAnimating = false;
        console.log('✅ Animación completada');
    });
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
slides[0].style.opacity = '1';

for (let i = 1; i < slides.length; i++) {
    slides[i].classList.remove('active');
    slides[i].style.opacity = '0';
}

// Iniciar cambio automático
setTimeout(() => {
    setInterval(autoSlide, 5000);
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
