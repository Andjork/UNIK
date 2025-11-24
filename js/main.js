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
    
    console.log('Imagen cambiada - Nueva imagen visible AHORA');
    
    // 3. Animar tiles
    animateTiles(tilesContainer, () => {
        // Limpieza después de la animación
        currentIndex = index;
        isAnimating = false;
        console.log('Animación completada');
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

