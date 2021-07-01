import { getComponentProxy } from "./ComponentProxy.js";

/**
 * Base class of Teddy HTML element representations
 * @class AbstractTeddyGenerator
 * @abstract
 */
class AbstractTeddyGenerator {
    /** @member {Object} teddy The object to use to generate the HTML element. */
    teddy;

    /**
     * @member {Proxy} componentProxy The proxy to access HTML element children within their class
     * names
     */
    componentProxy;

    /**
     * Initializes an AbstractTeddyGenerator object.
     */
    constructor() {
        this.teddy = null;
        this.componentProxy = null;
    }

    /**
     * Initializes the image element of the teddy element.
     */
    initImageElm() {
        let elm = this.componentProxy.image;
        elm.setAttribute("src", this.teddy.imageUrl);
        elm.setAttribute("alt", `découvrez ${this.teddy.name} l'ourson`);
    }

    /**
     * Initializes the name element of the teddy element.
     */
    initNameElm() {
        this.componentProxy.name.textContent = this.teddy.name;
    }

    /**
     * Initializes the price element of the teddy element.
     */
    initPriceElm() {
        this.componentProxy.price.textContent = `${(this.teddy.price / 100).toFixed(2)}€`;
    }

    /**
     * Initializes the teddy and the Proxy to the given values.
     * @param {Object} data The data used to initialize the class' fields.
     * @param {Object} data.teddy The teddy object used to generate the HTML elements
     * @param {HTMLElement} data.rootElm The root HTMLElement of the teddy representation element
     * @param {string} data.className The class name of the root element to get the child element with BEM notation
     */
    hydrate({ teddy, rootElm, className }) {
        this.teddy = teddy;
        this.componentProxy = getComponentProxy(rootElm, className);
    }

    /**
     * Abstract function, user should override it to generate the HTMLElement for the teddy object.
     * @param {Object} data The data used to generate the object representation.
     * @param {Object} data.teddy The teddy used to generate the object representation.
     * @param {HTMLElement} data.rootElm The root element of the HTML representation of the teddy object.
     * @abstract
     */
    generate({ teddy, rootElm, ...props }) {
        throw new Error("generate is abstract, it must be override");
    }
}

export default AbstractTeddyGenerator;
