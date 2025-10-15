// Efecto de ondas animadas para el micrositio UNIK

class WaveAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.waves = [];
        this.animationId = null;
        this.time = 0;
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createWaves();
        this.animate();
        
        // Redimensionar al cambiar el tamaño de la ventana
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createWaves() {
        // Crear múltiples ondas con diferentes propiedades
        this.waves = [
            {
                amplitude: 50,
                frequency: 0.02,
                speed: 0.5,
                color: 'rgba(39, 144, 125, 0.1)',
                offset: 0
            },
            {
                amplitude: 80,
                frequency: 0.015,
                speed: 0.3,
                color: 'rgba(39, 144, 125, 0.08)',
                offset: Math.PI / 2
            },
            {
                amplitude: 60,
                frequency: 0.025,
                speed: 0.7,
                color: 'rgba(39, 144, 125, 0.06)',
                offset: Math.PI
            }
        ];
    }
    
    drawWave(wave) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = wave.color;
        this.ctx.lineWidth = 2;
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        for (let x = 0; x < this.canvas.width; x += 2) {
            const y = centerY + 
                Math.sin((x * wave.frequency) + (this.time * wave.speed) + wave.offset) * wave.amplitude +
                Math.sin((x * wave.frequency * 0.5) + (this.time * wave.speed * 0.7)) * (wave.amplitude * 0.3);
            
            if (x === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        
        this.ctx.stroke();
    }
    
    drawParticles() {
        // Agregar partículas flotantes
        for (let i = 0; i < 20; i++) {
            const x = (this.time * 10 + i * 100) % this.canvas.width;
            const y = this.canvas.height / 2 + Math.sin(this.time + i) * 100;
            
            this.ctx.beginPath();
            this.ctx.fillStyle = `rgba(39, 144, 125, ${0.3 - (i % 3) * 0.1})`;
            this.ctx.arc(x, y, 2 + (i % 3), 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dibujar ondas
        this.waves.forEach(wave => {
            this.drawWave(wave);
        });
        
        // Dibujar partículas
        this.drawParticles();
        
        this.time += 0.016; // ~60fps
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Inicializar la animación de ondas
document.addEventListener('DOMContentLoaded', function() {
    const waveCanvas = document.querySelector('.waves-canvas');
    
    if (waveCanvas) {
        const waveAnimation = new WaveAnimation(waveCanvas);
        
        // Pausar animación cuando la ventana no está visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                waveAnimation.destroy();
            } else {
                waveAnimation.init();
            }
        });
    }
});

// Exportar la clase para uso global
window.WaveAnimation = WaveAnimation;
