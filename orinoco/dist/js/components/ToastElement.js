/** @module js/components/ToastElement */

import { generateSvg } from "./svg.js";

/**
 * Class representing a Toast web component.
 * The component can be used in html files as 'toast-element'
 * @extends HTMLElement
 */
class ToastElement extends HTMLElement {
    /**
     * Create the Toast web component
     *
     * @description Create a Toast with an icon and a text paragraph.
     * According to the type of the toast the icon and the background color will be different.
     * The supported types are ["", "error", "success"], the default value is "".
     */
    constructor() {
        super();
        this.textElm = document.createElement("p");

        this.iconElm = generateSvg();
        this.appendChild(this.iconElm);
        this.appendChild(this.textElm);
    }

    /**
     * Get the attributes observed by the web component.
     * The observed attributes are ["value", "type"].
     * @returns {string[]} the attributes' name.
     */
    static get observedAttributes() {
        return ["value", "type"];
    }

    /**
     * Callback called when the element is added to the DOM.
     * It suppress the element from the DOM after 4s.
     */
    connectedCallback() {
        setTimeout(() => {
            this.remove();
        }, 4000);
    }

    /**
     * The callback used to update the component when an observed attribute changes.
     * @param {string} name The name of the attribute.
     * @param {string} oldValue The old value of the attribute.
     * @param {string} newValue The new value of the attribute.
     */
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

export default ToastElement;
