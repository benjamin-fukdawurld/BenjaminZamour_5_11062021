/** @module js/TeddyCartItemGenerator */

import AbstractTeddyGenerator from "./AbstractTeddyGenerator.js";
import CartStorage from "./CartStorage.js";

/**
 * An helper class to generate teddy card representations for cart page.
 * @extends AbstractTeddyGenerator
 */
export default class TeddyCartItemGenerator extends AbstractTeddyGenerator {
    /**
     * Creates a TeddyCardGenerator.
     */
    constructor() {
        super();
    }

    /**
     * Initializes the price element of the teddy element.
     * @override
     */
    initPriceElm() {
        this.componentProxy.price.innerHTML = `<span class="cart-item__info__price__text">prix unitaire:</span> ${(
            this.teddy.price / 100
        ).toFixed(2)}€`;
    }

    /**
     * Initializes count product element.
     * @param {string} color The color of the teddy.
     * @param {number} initialCount The quantity of the teddy.
     */
    initCount(color, initialCount) {
        let cartStorage = new CartStorage();
        let totalElm = this.componentProxy["total-price"];
        let spinbox = this.componentProxy._.getElementsByTagName("spinbox-element")[0];
        spinbox.setAttribute("value", initialCount);
        spinbox.addEventListener("change", (event) => {
            let count = event.target.input.value;
            totalElm.textContent = `${((count * this.teddy.price) / 100).toFixed(2)}€`;
            cartStorage.setProductCount(this.teddy._id, color, count);
        });
    }

    /**
     * Initializes the remove button.
     * @param {string} color The color of the teddy.
     */
    initRemoveButton(color) {
        let rootElm = this.componentProxy._;
        let cartStorage = new CartStorage();
        this.componentProxy["remove-item-button"].addEventListener("click", () => {
            cartStorage.setProductCount(this.teddy._id, color, 0);
            document.getElementsByClassName("cart__item-list")[0].removeChild(rootElm);
        });
    }

    /**
     * Generates the HTML representation of the teddy.
     * @param {Object} props The data used to generate the representation.
     * @param {Object} props.teddy The teddy object to represent.
     * @param {HTMLElement} props.rootElm The root HTML element for the teddy representation.
     * @param {string} props.color The color of the teddy.
     * @param {count} props.count The count of the teddy.
     * @returns The HTML root element of the representation.
     */
    generate({ teddy, rootElm, color, count }) {
        this.hydrate({ teddy, rootElm, className: "cart-item" });
        this.componentProxy._.setAttribute("data-id", teddy._id);
        this.componentProxy.link.setAttribute("href", `product.html?id=${teddy._id}`);
        this.initCount(color, count);
        this.initRemoveButton(color);
        this.componentProxy["total-price"].textContent = `${((count * teddy.price) / 100).toFixed(
            2
        )}€`;
        this.hydrate({ teddy, rootElm, className: "cart-item__info" });
        this.initImageElm();
        this.initNameElm();
        this.initPriceElm();
        this.componentProxy.color.textContent = color;

        return rootElm;
    }
}
