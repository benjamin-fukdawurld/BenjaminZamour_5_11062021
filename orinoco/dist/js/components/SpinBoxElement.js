/** @module js/components/SpinBoxElement.js */

import { generateSvg } from "./svg.js";

/**
 * Class representing a SpinBox web component.
 * The component can be used in html files as 'spinbox-element'
 */
export default class SpinBoxElement extends HTMLElement {
    #inputElm;
    #minusButton;
    #plusButton;

    /**
     * Create the SpinBox web component
     *
     * @description Create a SpinBox with a input[type="number"], a plus and a minus button.
     * When the element changes the change event is emitted.
     */
    constructor() {
        super();

        this.#inputElm = document.createElement("input");
        this.#inputElm.setAttribute("type", "number");

        this.#minusButton = document.createElement("button");
        this.#minusButton.appendChild(generateSvg("M20 12H4"));
        this.#minusButton.addEventListener("mousedown", (event) => {
            event.preventDefault();
            if (this.min && this.#inputElm.value <= this.min) {
                return;
            }

            --this.#inputElm.value;
            this.dispatchEvent(new CustomEvent("change"));
        });

        this.#plusButton = document.createElement("button");
        this.#plusButton.appendChild(generateSvg("M12 6v6m0 0v6m0-6h6m-6 0H6"));
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

    /**
     * Get the attributes observed byt the web component.
     * The observed attributes are ["value", "min", "max", "name"].
     * @returns {string[]} the attributes' name.
     */
    static get observedAttributes() {
        return ["value", "min", "max", "name"];
    }

    /**
     * Get the input child element.
     */
    get input() {
        return this.#inputElm;
    }

    /**
     * The callback used to update the component when an observed attribute changes.
     * @param {string} name The name of the attribute.
     * @param {string} oldValue The old value of the attribute.
     * @param {string} newValue The new value of the attribute.
     */
    attributeChangedCallback(name, oldValue, newValue) {
        this.input.setAttribute(name, newValue);
        if (name === "min") {
            this.min = newValue;
        }

        if (name === "max") {
            this.max = newValue;
        }
    }
}

customElements.define("spinbox-element", SpinBoxElement);
