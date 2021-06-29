export default class ToastElement extends HTMLElement {
    constructor() {
        super();
        this.textElm = document.createElement("p");

        this.iconElm = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.iconElm.setAttribute("fill", "none");
        this.iconElm.setAttribute("stroke", "currentColor");
        this.iconElm.setAttribute("viewBox", "0 0 24 24");
        this.iconElm.classList.add("h-6", "w-6");
        this.appendChild(this.iconElm);
        this.appendChild(this.textElm);
    }

    static get observedAttributes() {
        return ["value", "type"];
    }

    connectedCallback() {
        setTimeout(() => {
            this.remove();
        }, 4000);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        switch (name) {
            case "value":
                this.textElm.innerHTML = newValue;
                return;

            case "type": {
                let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                this.iconElm.innerHTML = "";
                newPath.setAttributeNS(null, "stroke-linecap", "round");
                newPath.setAttributeNS(null, "stroke-linejoin", "round");
                newPath.setAttributeNS(null, "stroke-width", "2");
                switch (newValue) {
                    case "success":
                        newPath.setAttributeNS(null, "d", "M5 13l4 4L19 7");
                        this.iconElm.appendChild(newPath);
                        return;
                    case "error":
                        newPath.setAttributeNS(null, "d", "M6 18L18 6M6 6l12 12");
                        this.iconElm.appendChild(newPath);
                        return;
                    default:
                        newPath.setAttributeNS(
                            null,
                            "d",
                            "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        );
                        this.iconElm.appendChild(newPath);
                        return;
                }
            }

            default:
                return;
        }
    }
}

customElements.define("toast-element", ToastElement);
