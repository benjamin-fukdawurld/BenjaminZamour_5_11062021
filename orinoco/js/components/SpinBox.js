export default class SpinBoxElement extends HTMLElement {
    #inputElm;
    #minusButton;
    #plusButton;
    constructor() {
        super();

        this.#inputElm = document.createElement("input");
        this.#inputElm.setAttribute("type", "number");

        this.#minusButton = document.createElement("button");
        this.#minusButton.appendChild(this.generateSvg("M20 12H4"));
        this.#minusButton.addEventListener("mousedown", (event) => {
            event.preventDefault();
            if (this.min && this.#inputElm.value <= this.min) {
                return;
            }

            --this.#inputElm.value;
            this.dispatchEvent(new CustomEvent("change"));
        });

        this.#plusButton = document.createElement("button");
        this.#plusButton.appendChild(this.generateSvg("M12 6v6m0 0v6m0-6h6m-6 0H6"));
        this.#plusButton.addEventListener("mousedown", (event) => {
            event.preventDefault();
            if (this.max && this.#inputElm.value >= this.max) {
                return;
            }

            ++this.#inputElm.value;
            this.dispatchEvent(new CustomEvent("change"));
        });

        this.appendChild(this.#minusButton);
        this.appendChild(this.#inputElm);
        this.appendChild(this.#plusButton);
    }

    static get observedAttributes() {
        return ["value", "min", "max", "name"];
    }

    get input() {
        return this.#inputElm;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.input.setAttribute(name, newValue);
        if (name === "min") {
            this.min = newValue;
        }

        if (name === "max") {
            this.max = newValue;
        }
    }

    generateSvg(pathData) {
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.classList.add("h-6", "w-6");

        let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        newPath.setAttributeNS(null, "stroke-linecap", "round");
        newPath.setAttributeNS(null, "stroke-linejoin", "round");
        newPath.setAttributeNS(null, "stroke-width", "2");
        newPath.setAttributeNS(null, "d", pathData);
        svg.appendChild(newPath);

        return svg;
    }
}

customElements.define("spinbox-element", SpinBoxElement);
