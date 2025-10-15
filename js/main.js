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



/* onst slides = document.querySelectorAll('.multimages-slide');
const prevBtn = document.querySelector('.multimages-prev');
const nextBtn = document.querySelector('.multimages-next');
let currentSlide = 0;

// Mostrar slide activo
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

// Botones manuales
nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

// Cambio automático cada 6 segundos
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 6000);
*/
 
// Carousel con cambio automático - VERSIÓN ACTUALIZADA
function initMultimagesCarousel() {
    const slides = document.querySelectorAll('.multimages-slide');
    const allDots = document.querySelectorAll('.multimages-dot');
    
    if (!slides.length || !allDots.length) return;

    let currentSlide = 0;
    let autoPlayInterval;

    // Función para mostrar slide específico
    function showSlide(index) {
        // Remover active de todos los slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Remover active de todos los dots
        allDots.forEach(dot => dot.classList.remove('active'));
        
        // Agregar active al slide actual
        slides[index].classList.add('active');
        
        // Agregar active a TODOS los dots del slide actual
        const currentSlideDots = document.querySelectorAll(`.multimages-slide:nth-child(${index + 1}) .multimages-dot`);
        currentSlideDots.forEach(dot => {
            if (parseInt(dot.getAttribute('data-slide')) === index) {
                dot.classList.add('active');
            }
        });
        
        currentSlide = index;
    }

    // Función para siguiente slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Iniciar autoplay
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    // Detener autoplay
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event listeners para los dots
    allDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            stopAutoPlay();
            showSlide(slideIndex);
            startAutoPlay();
        });
    });

    // Iniciar autoplay
    startAutoPlay();

    // Pausar autoplay cuando el mouse está sobre el carousel
    const carousel = document.getElementById('multimages-section');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
}

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

// Menú de login desplegable
function initLoginDropdown() {
    const dropdown = document.querySelector('.login-dropdown');
    if (!dropdown) return;

    const btn = dropdown.querySelector('.user-button');
    const menu = dropdown.querySelector('.login-menu');
    if (!btn || !menu) return;

    function close() {
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
    }

    function open() {
        dropdown.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (dropdown.classList.contains('open')) {
            close();
        } else {
            open();
        }
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            close();
        }
    });

    // Accesibilidad: cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });
}


// Navegación por puntos
function initDotsNavigation() {
    const dots = document.querySelectorAll('.dot');
    const sections = document.querySelectorAll('section[id]');
    
    // Función para actualizar el punto activo
    function updateActiveDot() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[index]) {
                    dots[index].classList.add('active');
                }
            }
        });
    }
    
    // Event listeners
    window.addEventListener('scroll', updateActiveDot);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            if (sections[index]) {
                sections[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Actualizar al cargar la página
    updateActiveDot();
}

// Scroll suave
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animaciones al hacer scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    const elementsToAnimate = document.querySelectorAll('.offer-card, .faq-item, .presentation-expert, .message');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// (Eliminado) Toggle de idioma

// Efecto de ondas animadas
function initWaves() {
    const canvas = document.querySelector('.waves-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function drawWaves() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const time = Date.now() * 0.001;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Crear múltiples ondas
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(39, 144, 125, ${0.1 - i * 0.03})`;
            ctx.lineWidth = 2;
            
            const radius = 50 + i * 100 + Math.sin(time + i) * 20;
            const x = centerX + Math.cos(time * 0.5 + i) * 100;
            const y = centerY + Math.sin(time * 0.3 + i) * 50;
            
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        animationId = requestAnimationFrame(drawWaves);
    }
    
    function startWaves() {
        resizeCanvas();
        drawWaves();
    }
    
    // Inicializar ondas
    startWaves();
    
    // Redimensionar al cambiar el tamaño de la ventana
    window.addEventListener('resize', function() {
        cancelAnimationFrame(animationId);
        startWaves();
    });
}

// Inicializar ondas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initWaves);

// Utilidades adicionales
const Utils = {
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Verificar si un elemento está en el viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Carrusel de imágenes
function initCarousel() {
    const carousel = document.querySelector('.carousel-wrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carousel || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Función para mostrar slide específico
    function showSlide(index) {
        // Remover clase active de todos los slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Agregar clase active al slide actual
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Función para siguiente slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
    }
    
    // Función para slide anterior
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }
    
    // Event listeners para botones
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });
    
    // Auto-play del carrusel (opcional)
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Iniciar auto-play
    startAutoPlay();
    
    // Pausar auto-play al hacer hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Pausar auto-play al hacer clic en controles
    if (nextBtn) nextBtn.addEventListener('click', stopAutoPlay);
    if (prevBtn) prevBtn.addEventListener('click', stopAutoPlay);
    
    // Reiniciar auto-play después de 3 segundos de inactividad
    let inactivityTimeout;
    function resetAutoPlay() {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(startAutoPlay, 3000);
    }
    
    // Event listeners para reiniciar auto-play
    if (nextBtn) nextBtn.addEventListener('click', resetAutoPlay);
    if (prevBtn) prevBtn.addEventListener('click', resetAutoPlay);
    indicators.forEach(indicator => {
        indicator.addEventListener('click', resetAutoPlay);
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            resetAutoPlay();
        }
    });
    
    // Inicializar con el primer slide
    showSlide(0);
}

// Exportar funciones para uso global si es necesario
window.UNIK = {
    initHamburgerMenu,
    initFAQ,
    initDotsNavigation,
    initSmoothScroll,
    initAnimations,
    initLoginDropdown,
    initCarousel,
    initWaves,
    Utils
};
