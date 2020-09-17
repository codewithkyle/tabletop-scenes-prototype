class Tabletop extends HTMLElement {
    private container: HTMLElement;
    private image: HTMLElement;

    constructor() {
        super();
        this.image = this.querySelector("img");
        this.container = this.querySelector(".js-container");
    }

    private renderGrid() {
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
