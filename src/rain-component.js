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
