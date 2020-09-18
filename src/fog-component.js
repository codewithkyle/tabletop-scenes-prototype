class FogParticle {
    constructor(ctx, canvasWidth, canvasHeight) {
        this.ctx = ctx;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = 0;
        this.y = 0;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setVelocity(x, y) {
        this.xVelocity = x;
        this.yVelocity = y;
    }

    setImage(image) {
        this.image = image;
    }

    render() {
        if (!this.image) return;

        console.log("drawn");

        this.ctx.drawImage(this.image, this.x - this.image.width / 2, this.y - this.image.height / 2, 400, 400);

        this.x += this.xVelocity;
        this.y += this.yVelocity;

        // Check if has crossed the right edge
        if (this.x >= this.canvasWidth) {
            this.xVelocity = -this.xVelocity;
            this.x = this.canvasWidth;
        }
        // Check if has crossed the left edge
        else if (this.x <= 0) {
            this.xVelocity = -this.xVelocity;
            this.x = 0;
        }

        // Check if has crossed the bottom edge
        if (this.y >= this.canvasHeight) {
            this.yVelocity = -this.yVelocity;
            this.y = this.canvasHeight;
        }
        // Check if has crossed the top edge
        else if (this.y <= 0) {
            this.yVelocity = -this.yVelocity;
            this.y = 0;
        }
    }
}

class Fog extends HTMLElement {
    constructor() {
        super();
        const canvas = this.querySelector("canvas");
        const bcr = this.getBoundingClientRect();
        this.ctx = canvas.getContext("2d");
        this.canvasWidth = canvas.width = bcr.width;
        this.canvasHeight = canvas.height = bcr.height;

        this.particleCount = 100;
        this.maxVelocity = 0.75;
        this.particle = `${location.origin}/images/fog-particle.png`;

        this._createParticles();
        this._setImage();
        this._render();
    }

    _createParticles() {
        this.particles = [];

        const random = (min, max) => Math.random() * (max - min) + min;

        for (let i = 0; i < this.particleCount; i++) {
            const particle = new FogParticle(this.ctx, this.canvasWidth, this.canvasHeight);

            particle.setPosition(random(0, this.canvasWidth), random(0, this.canvasHeight));
            particle.setVelocity(random(-this.maxVelocity, this.maxVelocity), random(-this.maxVelocity, this.maxVelocity));

            this.particles.push(particle);
        }
    }

    _setImage() {
        if (!this.particle) return;

        const img = new Image();
        img.onload = () => this.particles.forEach((p) => p.setImage(img));
        img.src = this.particle;
        img.style.filter = "brightness(5) contrast(0.5)";
    }

    _render() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        this.particles.forEach((p) => p.render());

        requestAnimationFrame(this._render.bind(this));
    }
}
customElements.define("fog-component", Fog);
