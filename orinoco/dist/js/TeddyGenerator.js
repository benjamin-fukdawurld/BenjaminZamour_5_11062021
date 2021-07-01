import AbstractTeddyGenerator from "./AbstractTeddyGenerator.js";

/**
 * An helper class to generate teddy card representations for product page.
 * @extends AbstractTeddyGenerator
 */
class TeddyGenerator extends AbstractTeddyGenerator {
    /**
     * Creates a TeddyGenerator.
     */
    constructor() {
        super();
    }

    /**
     * Initializes the color select element
     */
    initColorSelect() {
        let select = this.componentProxy["color-select"];
        this.teddy.colors.forEach((color) => {
            let elm = document.createElement("option");
            elm.setAttribute("value", color);
            elm.textContent = color;
            select.appendChild(elm);
        });
    }

    /**
     * Generates the HTML representation of the teddy.
     * @param {Object} props The data used to generate the representation.
     * @param {Object} props.teddy The teddy object to represent.
     * @param {HTMLElement} props.rootElm The root HTML element for the teddy representation.
     * @returns The HTML root element of the representation.
     */
    generate({ teddy, rootElm }) {
        this.hydrate({ teddy, rootElm, className: "teddy" });
        this.componentProxy.description.textContent = this.teddy.description;
        this.initImageElm();
        this.initNameElm();
        this.initPriceElm();
        this.initColorSelect();

        return rootElm;
    }
}

export default TeddyGenerator;
