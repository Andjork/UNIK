// Tu código JavaScript existente aquí

// Sección Cursos Ofertas 
// Funcionalidad del carrusel
const cursosOfertasCarousel = document.getElementById('cursosOfertasCarousel');
const cursosOfertasPrevBtn = document.getElementById('cursosOfertasPrevBtn');
const cursosOfertasNextBtn = document.getElementById('cursosOfertasNextBtn');

let cursosOfertasScrollAmount = 0;
const cursosOfertasScrollStep = 305; // Ancho de tarjeta + gap

function updateCarouselButtons() {
    const maxScroll = cursosOfertasCarousel.scrollWidth - cursosOfertasCarousel.clientWidth;
    cursosOfertasScrollAmount = cursosOfertasCarousel.scrollLeft;
    
    if (cursosOfertasScrollAmount <= 10) {
        cursosOfertasPrevBtn.style.opacity = '0.5';
        cursosOfertasPrevBtn.style.pointerEvents = 'none';
    } else {
        cursosOfertasPrevBtn.style.opacity = '1';
        cursosOfertasPrevBtn.style.pointerEvents = 'auto';
    }
    
    if (cursosOfertasScrollAmount >= maxScroll - 10) {
        cursosOfertasNextBtn.style.opacity = '0.5';
        cursosOfertasNextBtn.style.pointerEvents = 'none';
    } else {
        cursosOfertasNextBtn.style.opacity = '1';
        cursosOfertasNextBtn.style.pointerEvents = 'auto';
    }
}

cursosOfertasPrevBtn.addEventListener('click', () => {
    cursosOfertasScrollAmount = Math.max(0, cursosOfertasScrollAmount - cursosOfertasScrollStep);
    cursosOfertasCarousel.scrollTo({
        left: cursosOfertasScrollAmount,
        behavior: 'smooth'
    });
});

cursosOfertasNextBtn.addEventListener('click', () => {
    const maxScroll = cursosOfertasCarousel.scrollWidth - cursosOfertasCarousel.clientWidth;
    cursosOfertasScrollAmount = Math.min(maxScroll, cursosOfertasScrollAmount + cursosOfertasScrollStep);
    cursosOfertasCarousel.scrollTo({
        left: cursosOfertasScrollAmount,
        behavior: 'smooth'
    });
});

cursosOfertasCarousel.addEventListener('scroll', updateCarouselButtons);

// Función para cerrar hover cuando se hace click fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.curso-oferta-card')) {
        const expandedCards = document.querySelectorAll('.curso-oferta-card:hover');
        expandedCards.forEach(card => {
            card.classList.remove('hover-active');
        });
    }
});

window.addEventListener('load', () => {
    updateCarouselButtons();
    const containerWidth = cursosOfertasCarousel.clientWidth;
    const contentWidth = cursosOfertasCarousel.scrollWidth;
    
    if (contentWidth > containerWidth) {
        cursosOfertasCarousel.scrollLeft = (contentWidth - containerWidth) / 2;
    }
});

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
