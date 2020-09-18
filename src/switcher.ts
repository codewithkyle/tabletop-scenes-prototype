class Switcher extends HTMLElement {
    private select: HTMLSelectElement;
    private tabletop: HTMLElement;

    constructor() {
        super();
        this.select = this.querySelector("select");
        this.tabletop = document.body.querySelector("tabletop-component");
    }

    private changeStyle: EventListener = () => {
        this.tabletop.className = this.select.value;
    };

    connectedCallback() {
        this.select.addEventListener("change", this.changeStyle);
    }
}
customElements.define("switcher-component", Switcher);
