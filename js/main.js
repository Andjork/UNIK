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

// cursos-ofertas.js - VERSIÓN CON DESPLAZAMIENTO POR TARJETA

// ===== 1. FUNCIONALIDAD TOGGLE DE CARDS =====
document.addEventListener('click', function(e) {
    const toggleBtn = e.target.closest('.curso-oferta-btn-toggle');
    
    if (toggleBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        const action = toggleBtn.getAttribute('data-action');
        const card = toggleBtn.closest('.curso-oferta-card');
        
        if (action === 'expand') {
            // Cerrar otras tarjetas expandidas
            document.querySelectorAll('.curso-oferta-card[data-card-state="expanded"]').forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.setAttribute('data-card-state', 'compact');
                    const otherBtn = otherCard.querySelector('.curso-oferta-btn-toggle');
                    if (otherBtn) {
                        otherBtn.textContent = 'Conoce más';
                        otherBtn.setAttribute('data-action', 'expand');
                    }
                }
            });
            
            // Expandir esta tarjeta
            card.setAttribute('data-card-state', 'expanded');
            /* toggleBtn.textContent = 'Volver'; */
            toggleBtn.setAttribute('data-action', 'compact');
            
        } else if (action === 'compact') {
            card.setAttribute('data-card-state', 'compact');
            toggleBtn.textContent = 'Conoce más';
            toggleBtn.setAttribute('data-action', 'expand');
        }
        return;
    }
    
    // Cerrar tarjeta al hacer clic fuera
    const expandedCard = document.querySelector('.curso-oferta-card[data-card-state="expanded"]');
    if (expandedCard && !e.target.closest('.curso-oferta-card')) {
        expandedCard.setAttribute('data-card-state', 'compact');
        const expandedBtn = expandedCard.querySelector('.curso-oferta-btn-toggle');
        if (expandedBtn) {
            expandedBtn.textContent = 'Conoce más';
            expandedBtn.setAttribute('data-action', 'expand');
        }
    }
});

// ===== 2. CARRUSEL QUE SE MUEVE TARJETA POR TARJETA =====
document.addEventListener('DOMContentLoaded', function() {
    // Elementos básicos
    const carousel = document.getElementById('cursosOfertasCarousel');
    const prevBtn = document.getElementById('cursosOfertasPrevBtn');
    const nextBtn = document.getElementById('cursosOfertasNextBtn');
    const dotsContainer = document.getElementById('cursosOfertasDots');
    
    if (!carousel || !prevBtn || !nextBtn) {
        console.warn('⚠️ Elementos del carrusel no encontrados');
        return;
    }
    
    // Configuración
    const cards = Array.from(carousel.querySelectorAll('.curso-oferta-card'));
    let currentCardIndex = 0; // Índice de la tarjeta actualmente visible a la izquierda
    let cardsPerView = getCardsPerView();
    let cardWidth = 0;
    const gap = 25;
    
    console.log('🎯 Carrusel detectado:', {
        totalCards: cards.length,
        cardsPerView: cardsPerView,
        gap: gap
    });
    
    // Inicializar
    initCarousel();
    
    // ===== FUNCIONES =====
    
    function getCardsPerView() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }
    
    function calculateCardWidth() {
        const container = carousel.parentElement;
        const containerWidth = container.clientWidth;
        const totalGap = (cardsPerView - 1) * gap;
        cardWidth = (containerWidth - totalGap) / cardsPerView;
        return cardWidth;
    }
    
    function initCarousel() {
        // Calcular ancho de tarjeta
        calculateCardWidth();
        
        // Aplicar estilos al carrusel
        carousel.style.display = 'flex';
        carousel.style.gap = `${gap}px`;
        carousel.style.overflowX = 'auto';
        carousel.style.scrollBehavior = 'smooth';
        carousel.style.scrollSnapType = 'x mandatory';
        
        // Ocultar scrollbar
        carousel.style.scrollbarWidth = 'none';
        carousel.style.msOverflowStyle = 'none';
        
        // Aplicar ancho a las tarjetas
        cards.forEach(card => {
            card.style.flex = `0 0 ${cardWidth}px`;
            card.style.minWidth = `${cardWidth}px`;
            card.style.scrollSnapAlign = 'start';
        });
        
        // Crear puntos
        createDots();
        
        // Actualizar navegación
        updateNavigation();
        
        // Posicionar en la primera tarjeta
        scrollToCard(currentCardIndex);
    }
    
    function createDots() {
        if (!dotsContainer) return;
        
        // Limpiar
        dotsContainer.innerHTML = '';
        
        // Calcular número de puntos (una tarjeta por punto en móvil, menos en desktop)
        let totalDots;
        
        if (cardsPerView === 1) {
            // Móvil: un punto por cada tarjeta
            totalDots = cards.length;
        } else {
            // Tablet/Desktop: un punto por cada "slide" (grupo de tarjetas)
            totalDots = Math.ceil(cards.length / cardsPerView);
        }
        
        console.log('🔘 Creando puntos:', totalDots, 'cardsPerView:', cardsPerView);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = 'cursos-oferta-dot';
            dot.type = 'button';
            dot.setAttribute('data-index', i);
            dot.setAttribute('aria-label', `Ir a la posición ${i + 1}`);
            
            // Estilos básicos
            Object.assign(dot.style, {
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: i === 0 ? '#00529B' : '#002C51',
                border: i === 0 ? '2px solid white' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                margin: '0 5px',
                padding: '0'
            });
            
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                goToPosition(i);
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateDots() {
        if (!dotsContainer) return;
        
        const dots = dotsContainer.querySelectorAll('.cursos-oferta-dot');
        let activeDotIndex;
        
        if (cardsPerView === 1) {
            // Móvil: punto activo = índice de tarjeta actual
            activeDotIndex = currentCardIndex;
        } else {
            // Tablet/Desktop: punto activo = "slide" actual
            activeDotIndex = Math.floor(currentCardIndex / cardsPerView);
        }
        
        dots.forEach((dot, index) => {
            const isActive = index === activeDotIndex;
            
            dot.style.backgroundColor = isActive ? '#00529B' : '#002C51';
            dot.style.border = isActive ? '2px solid white' : 'none';
            dot.style.transform = isActive ? 'scale(1.3)' : 'scale(1)';
            
            // Actualizar atributo ARIA
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }
    
    function scrollToCard(cardIndex) {
        // Asegurar que el índice esté dentro de los límites
        const maxIndex = Math.max(0, cards.length - cardsPerView);
        currentCardIndex = Math.min(Math.max(0, cardIndex), maxIndex);
        
        // Calcular desplazamiento: tarjeta actual * (ancho de tarjeta + gap)
        const scrollAmount = currentCardIndex * (cardWidth + gap);
        
        console.log('🔄 Moviendo a tarjeta:', {
            index: currentCardIndex,
            cardWidth: cardWidth,
            gap: gap,
            scrollAmount: scrollAmount
        });
        
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        // Actualizar después de la animación
        setTimeout(() => {
            updateNavigation();
            updateDots();
        }, 300);
    }
    
    function goToPosition(position) {
        let targetCardIndex;
        
        if (cardsPerView === 1) {
            // Móvil: posición = índice de tarjeta
            targetCardIndex = position;
        } else {
            // Tablet/Desktop: posición * cardsPerView = primera tarjeta del grupo
            targetCardIndex = position * cardsPerView;
        }
        
        scrollToCard(targetCardIndex);
    }
    
    function moveCarousel(direction) {
        const maxIndex = Math.max(0, cards.length - cardsPerView);
        
        if (direction === 'prev' && currentCardIndex > 0) {
            // Retroceder UNA tarjeta
            scrollToCard(currentCardIndex - 1);
        } else if (direction === 'next' && currentCardIndex < maxIndex) {
            // Avanzar UNA tarjeta
            scrollToCard(currentCardIndex + 1);
        }
    }
    
    function updateNavigation() {
        const maxIndex = Math.max(0, cards.length - cardsPerView);
        
        // Botón anterior
        if (currentCardIndex > 0) {
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
            prevBtn.disabled = false;
        } else {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.pointerEvents = 'none';
            prevBtn.disabled = true;
        }
        
        // Botón siguiente
        if (currentCardIndex < maxIndex) {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.disabled = false;
        } else {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.pointerEvents = 'none';
            nextBtn.disabled = true;
        }
        
        console.log('🎛️ Navegación:', {
            currentIndex: currentCardIndex,
            maxIndex: maxIndex,
            prevEnabled: currentCardIndex > 0,
            nextEnabled: currentCardIndex < maxIndex
        });
    }
    
    // ===== EVENT LISTENERS =====
    
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        moveCarousel('prev');
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        moveCarousel('next');
    });
    
    // Actualizar navegación al hacer scroll manual
    carousel.addEventListener('scroll', function() {
        const scrollLeft = carousel.scrollLeft;
        // Calcular qué tarjeta está visible en la posición izquierda
        const estimatedIndex = Math.round(scrollLeft / (cardWidth + gap));
        
        if (estimatedIndex !== currentCardIndex) {
            currentCardIndex = Math.min(estimatedIndex, cards.length - cardsPerView);
            updateNavigation();
            updateDots();
        }
    });
    
    // Redimensionamiento
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const newCardsPerView = getCardsPerView();
            
            if (newCardsPerView !== cardsPerView) {
                console.log('📱 Cambiando de', cardsPerView, 'a', newCardsPerView, 'tarjetas por vista');
                
                cardsPerView = newCardsPerView;
                calculateCardWidth();
                
                // Reaplicar estilos
                cards.forEach(card => {
                    card.style.flex = `0 0 ${cardWidth}px`;
                    card.style.minWidth = `${cardWidth}px`;
                });
                
                // Recrear puntos
                createDots();
                
                // Ajustar índice actual si es necesario
                const maxIndex = Math.max(0, cards.length - cardsPerView);
                if (currentCardIndex > maxIndex) {
                    currentCardIndex = maxIndex;
                }
                
                // Volver a posicionar
                scrollToCard(currentCardIndex);
            }
        }, 250);
    });
    
    // Forzar visibilidad de puntos
    if (dotsContainer) {
        const pagination = dotsContainer.closest('.cursos-ofertas-pagination');
        if (pagination) {
            pagination.style.display = 'flex';
            pagination.style.justifyContent = 'center';
            pagination.style.marginTop = '2rem';
        }
    }
    
    console.log('✅ Carrusel inicializado - Movimiento: TARJETA POR TARJETA');
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

