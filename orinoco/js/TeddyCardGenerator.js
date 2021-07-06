/** @module js/TeddyCardGenerator */

import AbstractTeddyGenerator from "./AbstractTeddyGenerator.js";

/**
 *
 * @param {string} input The string to truncate.
 * @param {number} length The max length of the output string (including elipsis).
 * @returns {string} A truncated version of the string.
 */
const truncate = (input, length) => {
    return input.length > length ? `${input.substring(0, length - 3)}...` : input;
};

/**
 * An helper class to generate teddy card representations for index page.
 * @extends AbstractTeddyGenerator
 */
class TeddyCardGenerator extends AbstractTeddyGenerator {
    /**
     * Creates a TeddyCardGenerator.
     */
    constructor() {
        super();
    }

    /**
     * Initializes the card HTML element.
     */
    initCardElm() {
        this.componentProxy._.setAttribute("data-id", this.teddy._id);
    }

    /**
     * Initializes the link element to point to the porduct page with the teddy's id.
     */
    initCardLinkElm() {
        let elm = this.componentProxy.link;
        elm.setAttribute("href", `product.html?id=${this.teddy._id}`);
        elm.setAttribute("aria-label", `découvrez ${this.teddy.name} l'ourson`);
    }

    /**
     * Initializes the Description element
     */
    initDescriptionElm() {
        this.componentProxy.description.textContent = truncate(this.teddy.description, 20);
    }

    /**
     * Generates the HTML representation of the teddy.
     * @param {Object} props The data used to generate the representation.
     * @param {Object} props.teddy The teddy object to represent.
     * @param {HTMLElement} props.rootElm The root HTML element for the teddy representation.
     * @returns The HTML root element of the representation.
     */
    generate({ teddy, rootElm }) {
        this.hydrate({ teddy, rootElm, className: "teddy-card" });
        this.initCardLinkElm();
        this.initCardElm();
        this.initImageElm();
        this.initNameElm();
        this.initDescriptionElm();
        this.initPriceElm();

        return rootElm;
    }
}

export default TeddyCardGenerator;
