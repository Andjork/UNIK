// Tu código JavaScript existente aquí

// Sección Cursos Ofertas 
// Funcionalidad de toggle entre estados
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('curso-oferta-btn-toggle')) {
        const button = e.target;
        const action = button.getAttribute('data-action');
        const card = button.closest('.curso-oferta-card');
        
        if (action === 'expand') {
            // Cerrar otras tarjetas expandidas
            document.querySelectorAll('.curso-oferta-card[data-card-state="expanded"]').forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.setAttribute('data-card-state', 'compact');
                }
            });
            // Expandir esta tarjeta
            card.setAttribute('data-card-state', 'expanded');
            
        } else if (action === 'compact') {
            card.setAttribute('data-card-state', 'compact');
        }
    }
});

document.addEventListener('click', (e) => {
    // Si se hace clic en el botón de expandir/contraer
    if (e.target.classList.contains('curso-oferta-btn-toggle')) {
        const button = e.target;
        const action = button.getAttribute('data-action');
        const card = button.closest('.curso-oferta-card');
        
        if (action === 'expand') {
            // Cerrar otras tarjetas expandidas
            document.querySelectorAll('.curso-oferta-card[data-card-state="expanded"]').forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.setAttribute('data-card-state', 'compact');
                }
            });
            // Expandir esta tarjeta
            card.setAttribute('data-card-state', 'expanded');
            
        } else if (action === 'compact') {
            card.setAttribute('data-card-state', 'compact');
        }
    }
    
    // NUEVO: Contrae tarjeta al hacer clic fuera 
    else {
        const expandedCard = document.querySelector('.curso-oferta-card[data-card-state="expanded"]');
        const clickedInsideCard = e.target.closest('.curso-oferta-card-expanded') || 
                                 e.target.closest('.curso-oferta-card[data-card-state="expanded"]');
        
        // Si hay una tarjeta expandida y se hizo clic FUERA de ella
        if (expandedCard && !clickedInsideCard) {
            expandedCard.setAttribute('data-card-state', 'compact');
        }
    }
});


// Carrusel con navegación mejorada
const carousel = document.getElementById('cursosOfertasCarousel');
const prevBtn = document.getElementById('cursosOfertasPrevBtn');
const nextBtn = document.getElementById('cursosOfertasNextBtn');

const cardWidth = 350;
const gap = 25;
const scrollAmount = cardWidth + gap;

// Función para actualizar visibilidad de botones
function updateCarouselButtons() {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const currentScroll = carousel.scrollLeft;
    
    prevBtn.style.opacity = currentScroll > 0 ? '1' : '0.5';
    prevBtn.style.pointerEvents = currentScroll > 0 ? 'auto' : 'none';
    
    nextBtn.style.opacity = currentScroll < maxScroll - 10 ? '1' : '0.5';
    nextBtn.style.pointerEvents = currentScroll < maxScroll - 10 ? 'auto' : 'none';
}

prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

// Actualizar botones al hacer scroll
carousel.addEventListener('scroll', updateCarouselButtons);

// Inicializar
window.addEventListener('load', () => {
    updateCarouselButtons();
});

// Recalcular en resize
window.addEventListener('resize', updateCarouselButtons);


// js/cursos-ofertas.js - VERSIÓN CON PUNTOS FUNCIONALES
class CursosOfertasCarousel {
    constructor() {
        this.carousel = document.getElementById('cursosOfertasCarousel');
        this.prevBtn = document.getElementById('cursosOfertasPrevBtn');
        this.nextBtn = document.getElementById('cursosOfertasNextBtn');
        this.dotsContainer = document.getElementById('cursosOfertasDots');
        this.carouselContainer = this.carousel?.parentElement;
        
        if (!this.carousel || !this.prevBtn || !this.nextBtn || !this.carouselContainer) {
            console.error('❌ Elementos del carrusel no encontrados');
            return;
        }

        this.cards = Array.from(this.carousel.querySelectorAll('.curso-oferta-card'));
        this.currentSlide = 0; // Usamos slide-based en lugar de position-based
        this.cardsPerView = this.calculateCardsPerView();
        this.cardWidth = this.calculateCardWidth();
        this.gap = 25;
        
        console.log('📊 Configuración:', {
            totalCards: this.cards.length,
            cardsPerView: this.cardsPerView,
            totalSlides: Math.ceil(this.cards.length / this.cardsPerView)
        });

        this.init();
    }

    init() {
        this.setupCarouselStyles();
        this.updateCardsLayout();
        this.createDots();
        this.setupEventListeners();
        this.setupCardToggles();
        this.setupResizeHandler();
        this.updateNavigation();
        this.updateCarousel();
    }

    setupCarouselStyles() {
        this.carouselContainer.style.overflow = 'hidden';
        this.carouselContainer.style.position = 'relative';
        
        this.carousel.style.display = 'flex';
        this.carousel.style.transition = 'transform 0.5s ease';
        this.carousel.style.willChange = 'transform';
        this.carousel.style.gap = `${this.gap}px`;
    }

    calculateCardsPerView() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }

    calculateCardWidth() {
        const containerWidth = this.carouselContainer.clientWidth;
        return (containerWidth - ((this.cardsPerView - 1) * this.gap)) / this.cardsPerView;
    }

    updateCardsLayout() {
        const cardWidth = this.calculateCardWidth();
        
        this.cards.forEach(card => {
            card.style.flex = `0 0 ${cardWidth}px`;
            card.style.minWidth = `${cardWidth}px`;
        });
    }

    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        
        // Calcular número de slides
        const totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
        
        console.log('🔘 Creando puntos:', {
            totalSlides: totalSlides,
            cardsLength: this.cards.length,
            cardsPerView: this.cardsPerView
        });
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = `cursos-oferta-dot ${i === 0 ? 'active' : ''}`;
            dot.type = 'button';
            dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
            dot.setAttribute('data-slide', i);
            
            // Crear span visual para el punto
            const dotVisual = document.createElement('span');
            dotVisual.style.display = 'block';
            dotVisual.style.width = '10px';
            dotVisual.style.height = '10px';
            dotVisual.style.borderRadius = '50%';
            dotVisual.style.backgroundColor = i === 0 ? '#007bff' : '#ddd';
            dotVisual.style.transition = 'background-color 0.3s ease';
            
            dot.appendChild(dotVisual);
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSlide(i);
            });
            
            this.dotsContainer.appendChild(dot);
        }
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.prevSlide();
        });
        
        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.nextSlide();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    setupCardToggles() {
        this.cards.forEach(card => {
            const toggleBtn = card.querySelector('.curso-oferta-btn-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    this.toggleCard(card);
                });
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.curso-oferta-card')) {
                this.collapseAllCards();
            }
        });
    }

    setupResizeHandler() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    handleResize() {
        const newCardsPerView = this.calculateCardsPerView();
        
        if (newCardsPerView !== this.cardsPerView) {
            this.cardsPerView = newCardsPerView;
            this.cardWidth = this.calculateCardWidth();
            
            // Recalcular slide actual para evitar desbordamiento
            const totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
            this.currentSlide = Math.min(this.currentSlide, totalSlides - 1);
            
            this.updateCardsLayout();
            this.createDots();
            this.updateCarousel();
            this.updateNavigation();
        }
    }

    toggleCard(card) {
        const isExpanded = card.getAttribute('data-card-state') === 'expanded';
        
        if (isExpanded) {
            this.collapseCard(card);
        } else {
            this.collapseAllCards();
            this.expandCard(card);
        }
    }

    expandCard(card) {
        card.setAttribute('data-card-state', 'expanded');
        const toggleBtn = card.querySelector('.curso-oferta-btn-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = 'Volver';
            toggleBtn.setAttribute('data-action', 'compact');
        }
    }

    collapseCard(card) {
        card.setAttribute('data-card-state', 'compact');
        const toggleBtn = card.querySelector('.curso-oferta-btn-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = 'Conoce más';
            toggleBtn.setAttribute('data-action', 'expand');
        }
    }

    collapseAllCards() {
        this.cards.forEach(card => this.collapseCard(card));
    }

    calculateMaxSlide() {
        return Math.max(0, Math.ceil(this.cards.length / this.cardsPerView) - 1);
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateCarousel();
            this.updateNavigation();
        }
    }

    nextSlide() {
        const maxSlide = this.calculateMaxSlide();
        if (this.currentSlide < maxSlide) {
            this.currentSlide++;
            this.updateCarousel();
            this.updateNavigation();
        }
    }

    goToSlide(slideIndex) {
        const maxSlide = this.calculateMaxSlide();
        if (slideIndex >= 0 && slideIndex <= maxSlide) {
            this.currentSlide = slideIndex;
            console.log('🎯 Yendo al slide:', slideIndex);
            this.updateCarousel();
            this.updateNavigation();
        }
    }

    updateCarousel() {
        console.log('🔄 Actualizando carrusel al slide:', this.currentSlide);
        
        // Calcular desplazamiento basado en slides completos
        const scrollAmount = this.currentSlide * (this.cardWidth + this.gap) * this.cardsPerView;
        
        console.log('📏 Desplazamiento:', {
            slide: this.currentSlide,
            cardWidth: this.cardWidth,
            cardsPerView: this.cardsPerView,
            scrollAmount: scrollAmount
        });
        
        this.carousel.style.transform = `translateX(-${scrollAmount}px)`;
        this.updateDots();
        this.collapseAllCards();
    }

    updateNavigation() {
        const maxSlide = this.calculateMaxSlide();
        
        this.prevBtn.style.opacity = this.currentSlide > 0 ? '1' : '0.5';
        this.prevBtn.style.pointerEvents = this.currentSlide > 0 ? 'auto' : 'none';
        
        this.nextBtn.style.opacity = this.currentSlide < maxSlide ? '1' : '0.5';
        this.nextBtn.style.pointerEvents = this.currentSlide < maxSlide ? 'auto' : 'none';
        
        console.log('🎛️ Navegación:', {
            currentSlide: this.currentSlide,
            maxSlide: maxSlide,
            prevEnabled: this.currentSlide > 0,
            nextEnabled: this.currentSlide < maxSlide
        });
    }

    updateDots() {
        if (!this.dotsContainer) return;
        
        const dots = this.dotsContainer.querySelectorAll('.cursos-oferta-dot');
        const totalSlides = Math.ceil(this.cards.length / this.cardsPerView);
        
        console.log('🔘 Actualizando puntos:', {
            currentSlide: this.currentSlide,
            totalDots: dots.length,
            totalSlides: totalSlides
        });
        
        dots.forEach((dot, index) => {
            const isActive = index === this.currentSlide;
            const dotVisual = dot.querySelector('span');
            
            if (dotVisual) {
                dotVisual.style.backgroundColor = isActive ? '#007bff' : '#ddd';
                dotVisual.style.transform = isActive ? 'scale(1.2)' : 'scale(1)';
            }
            
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }
}

// DEBUG: Verificar si los elementos existen
console.log('🔍 Buscando elementos del carrusel:');
console.log('Carrusel:', document.getElementById('cursosOfertasCarousel'));
console.log('Botón anterior:', document.getElementById('cursosOfertasPrevBtn'));
console.log('Botón siguiente:', document.getElementById('cursosOfertasNextBtn'));
console.log('Dots:', document.getElementById('cursosOfertasDots'));

// Inicialización con verificación
function initCursosOfertas() {
    const carousel = document.getElementById('cursosOfertasCarousel');
    const prevBtn = document.getElementById('cursosOfertasPrevBtn');
    const nextBtn = document.getElementById('cursosOfertasNextBtn');
    
    if (carousel && prevBtn && nextBtn) {
        console.log('✅ Todos los elementos encontrados, inicializando...');
        window.cursosOfertas = new CursosOfertasCarousel();
    } else {
        console.log('⏳ Esperando elementos...', {carousel, prevBtn, nextBtn});
        setTimeout(initCursosOfertas, 100);
    }
}

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursosOfertas);
} else {
    initCursosOfertas();
}

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
    
    // Actualizar dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    // 1. Crear tiles con la imagen ACTUAL
    const tilesContainer = createTiles(currentImage.src);
    
    // 2. MOSTRAR NUEVA IMAGEN INMEDIATAMENTE
    currentSlide.classList.remove('active');
    currentSlide.style.opacity = '0';
    nextSlide.classList.add('active');
    nextSlide.style.opacity = '1';

    console.log('Imagen cambiada - Nueva imagen visible AHORA');
    
    // 3. Animar tiles
    animateTiles(tilesContainer, () => {
        // Limpieza después de la animación
        currentIndex = index;
        isAnimating = false;
        console.log('Animación completada');
    });

    setTimeout(() => {
        titleElement.textContent = carouselData[index].title; // ← Ejecuta después de 800ms
    }, 1200);
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
    setInterval(autoSlide, 3000);
}, 1000);

// Funcionalidad del acordeón de Preguntas Frecuentes
document.addEventListener('DOMContentLoaded', function() {
    const faqCards = document.querySelectorAll('.pfaq-card');
    
    faqCards.forEach(card => {
        const toggleBtn = card.querySelector('.pfaq-toggle');
        const cardContent = card.querySelector('.pfaq-card-content');
        
        // Agregar evento click al botón y al contenido de la pregunta
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleFaqCard(card);
        });
        
        cardContent.addEventListener('click', function() {
            toggleFaqCard(card);
        });
    });
    
    function toggleFaqCard(clickedCard) {
        const isActive = clickedCard.classList.contains('active');
        
        // Cerrar todas las tarjetas primero
        faqCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Abrir la tarjeta clickeada si no estaba activa
        if (!isActive) {
            clickedCard.classList.add('active');
        }
    }
    
    // Cerrar al hacer click fuera de las tarjetas
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.pfaq-card')) {
            faqCards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });
});

