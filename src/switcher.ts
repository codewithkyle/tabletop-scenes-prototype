class Switcher extends HTMLElement {
    private select: HTMLSelectElement;

    constructor() {
        super();
        this.select = this.querySelector("select");
    }

    private changeStyle: EventListener = () => {};

    connectedCallback() {
        this.select.addEventListener("change", this.changeStyle);
    }
}
customElements.define("switcher-component", Switcher);
