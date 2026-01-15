class ParticleNetwork {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.hoverParticle = null;

        // Configuration
        this.config = {
            particleColor: 'rgba(34, 211, 238, 0.5)', // Cyan text color
            lineColor: 'rgba(34, 211, 238, 0.15)',
            particleAmount: 60, // reduced density
            defaultSpeed: 0.5,
            variantSpeed: 1,
            defaultRadius: 2,
            variantRadius: 2,
            linkRadius: 150, // distance to connect
        };

        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Mouse interaction
        this.mouse = { x: null, y: null };
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        this.init();
        this.animate();
    }

    resize() {
        this.w = this.canvas.width = window.innerWidth;
        this.h = this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.config.particleAmount; i++) {
            this.particles.push(new Particle(this.w, this.h, this.config));
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.w, this.h);

        // Update and draw particles
        this.particles.forEach(p => {
            p.update();
            p.draw(this.ctx);
        });

        // Draw links
        this.linkParticles();

        requestAnimationFrame(() => this.animate());
    }

    linkParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.config.linkRadius) {
                    const opacity = 1 - (distance / this.config.linkRadius);
                    this.ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.2})`; // using accent color
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }

        // Mouse links (optional interactivity)
        if (this.mouse.x != null) {
            this.particles.forEach(p => {
                const dx = p.x - this.mouse.x;
                const dy = p.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.config.linkRadius + 50) {
                    const opacity = 1 - (distance / (this.config.linkRadius + 50));
                    this.ctx.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.4})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.stroke();
                }
            });
        }
    }
}

class Particle {
    constructor(w, h, config) {
        this.w = w;
        this.h = h;
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.speed = config.defaultSpeed + Math.random() * config.variantSpeed;
        this.directionAngle = Math.floor(Math.random() * 360);
        this.color = config.particleColor;
        this.radius = config.defaultRadius + Math.random() * config.variantRadius;
        this.vector = {
            x: Math.cos(this.directionAngle) * this.speed,
            y: Math.sin(this.directionAngle) * this.speed
        };
    }

    update() {
        this.border();
        this.x += this.vector.x;
        this.y += this.vector.y;
    }

    border() {
        if (this.x >= this.w || this.x <= 0) this.vector.x *= -1;
        if (this.y >= this.h || this.y <= 0) this.vector.y *= -1;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

export default ParticleNetwork;
