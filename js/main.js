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
        if (!this.image)
            return;
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
        if (!this.particle)
            return;
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
class Rain extends HTMLElement {
    constructor() {
        super();
        this.canvas = this.querySelector("canvas");
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        this.ctx = this.canvas.getContext("2d");
        this.particles = [];
        this.init();
        this.render();
    }
    init() {
        var init = [];
        var maxParts = 1000;
        for (var a = 0; a < maxParts; a++) {
            init.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                l: Math.random() * 2,
                xs: -4 + Math.random() * 4 + 2,
                ys: Math.random() * 10 + 10,
            });
        }
        for (var b = 0; b < maxParts; b++) {
            this.particles[b] = init[b];
        }
    }
    move() {
        for (var b = 0; b < this.particles.length; b++) {
            var p = this.particles[b];
            p.x += p.xs;
            p.y += p.ys;
            if (p.x > this.canvas.width || p.y > this.canvas.height) {
                p.x = Math.random() * this.canvas.width;
                p.y = -20;
            }
        }
    }
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = "rgba(93, 138, 194, 1)";
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = "round";
        for (var c = 0; c < this.particles.length; c++) {
            var p = this.particles[c];
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
            this.ctx.stroke();
        }
        this.move();
        requestAnimationFrame(this.render.bind(this));
    }
}
customElements.define("rain-component", Rain);
class SelectComponent extends HTMLElement {
    constructor() {
        super();
        this.handleBlur = () => {
            this.validate();
        };
        this.handleChange = () => {
            this.setAttribute("state", "valid");
            this.select.setCustomValidity("");
        };
        this.select = this.querySelector("select");
    }
    validate() {
        if (this.select.required) {
            if (this.select.value === "") {
                if (this.getAttribute("state") !== "invalid") {
                    this.select.reportValidity();
                }
                this.setAttribute("state", "invalid");
            }
            else {
                this.setAttribute("state", "valid");
                this.select.setCustomValidity("");
            }
        }
        else {
            this.setAttribute("state", "valid");
            this.select.setCustomValidity("");
        }
    }
    connectedCallback() {
        this.select.addEventListener("change", this.handleChange);
        this.select.addEventListener("blur", this.handleBlur);
    }
}
customElements.define("select-component", SelectComponent);
class Switcher extends HTMLElement {
    constructor() {
        super();
        this.changeStyle = () => {
            this.tabletop.className = this.select.value;
        };
        this.select = this.querySelector("select");
        this.tabletop = document.body.querySelector("tabletop-component");
    }
    connectedCallback() {
        this.select.addEventListener("change", this.changeStyle);
    }
}
customElements.define("switcher-component", Switcher);
class Tabletop extends HTMLElement {
    constructor() {
        super();
        this.image = this.querySelector("img");
        this.container = this.querySelector(".js-container");
    }
    renderGrid() {
        this.container.innerHTML = "";
        const bounds = this.image.getBoundingClientRect();
        const width = Math.floor(bounds.width / 32);
        const height = Math.floor(bounds.height / 32);
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const spot = document.createElement("grid-component");
                spot.style.cssText = `top: ${y * 32}px;left: ${x * 32}px;`;
                this.container.appendChild(spot);
            }
        }
    }
    connectedCallback() {
        this.renderGrid();
    }
}
customElements.define("tabletop-component", Tabletop);
