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
class CarruselFullscreen {
    constructor() {
        this.carrusel = document.getElementById('carrusel-fullscreen');
        this.slides = document.querySelectorAll('.carrusel-fs-slide');
        this.dots = document.querySelectorAll('.carrusel-fs-dot');
        this.currentSlide = 0;
        this.isAnimating = false;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        console.log('Inicializando carrusel...');
        console.log('Slides encontrados:', this.slides.length);
        console.log('Dots encontrados:', this.dots.length);
        
        // Inicializar primer slide
        this.showSlide(this.currentSlide);
        
        // Event listeners para dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log('Click en dot:', index);
                this.goToSlide(index);
            });
        });
        
        // Iniciar auto-play
        this.startAutoPlay();
        
        // Event listeners para pausar auto-play al interactuar
        this.carrusel.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.carrusel.addEventListener('mouseleave', () => this.startAutoPlay());
    }
    
    showSlide(index) {
        console.log('Mostrando slide:', index);
        
        // Ocultar todos los slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remover active de todos los dots
        this.dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar slide actual
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    goToSlide(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        
        console.log('Cambiando al slide:', index);
        this.isAnimating = true;
        
        // Ocultar slide actual
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Mostrar nuevo slide
        this.slides[index].classList.add('active');
        this.dots[index].classList.add('active');
        
        this.currentSlide = index;
        
        // Resetear flag de animación después de la transición
        setTimeout(() => {
            this.isAnimating = false;
        }, 600);
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    startAutoPlay() {
        // Limpiar intervalo existente
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
        
        // Iniciar nuevo intervalo
        this.autoPlayInterval = setInterval(() => {
            if (!this.isAnimating) {
                this.nextSlide();
            }
        }, 5000); // Cambia cada 5 segundos
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Inicializar carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando carrusel...');
    new CarruselFullscreen();
});

// Fallback en caso de que el DOM ya esté cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CarruselFullscreen());
} else {
    new CarruselFullscreen();
}
// Funcionalidad para tarjetas PFAQ
document.addEventListener('DOMContentLoaded', function() {
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
});



// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initMultimagesCarousel();
});
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
