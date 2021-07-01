/** @module js/product */

import { getTeddy } from "./utils.js";
import TeddyGenerator from "./TeddyGenerator.js";
import CartStorage from "./CartStorage.js";
import ToastElement from "./components/ToastElement.js";

const urlParams = new URLSearchParams(window.location.search);

/**
 * Controller for the product page
 */
class Controller {
    #teddy;
    #cart;

    /**
     * Creat a Controller for the product page
     * @param {Object} teddy The teddy object presented on the page
     * @param {CartStorage} cart The cart storage management object
     */
    constructor(teddy, cart) {
        this.#teddy = teddy;
        this.#cart = cart;
    }

    /**
     * Initializes the page title with ne teddy's name.
     * @throws An error if there is no h1 tag on the page.
     */
    initTitles() {
        document.title = `${this.#teddy.name} l'ourson - Orinoco teddies`;
        let heading = document.getElementsByTagName("h1");
        if (!heading || heading.length < 1) {
            throw new Error("h1 not found");
        }

        heading[0].textContent = this.#teddy.name;
    }

    /**
     * Initializes the product representation with the teddy data using a TeddyGenerator.
     *
     * @see {@link TeddyGenerator}
     */
    initTeddyElm() {
        const generator = new TeddyGenerator();

        let elm = document.getElementsByClassName("teddy");
        if (!elm || elm.length < 1) {
            throw new Error("teddy not found");
        }

        generator.generate({ teddy: this.#teddy, rootElm: elm[0] });
    }

    /**
     * Binds the events from the page to the Controller's callbacks
     */
    bind() {
        let btn = document.getElementById("add-to-cart-button");
        btn.addEventListener("click", (event) => {
            this.addToCart();
        });
    }

    /**
     * Initializes the controller
     */
    init() {
        this.initTitles();
        this.initTeddyElm();
        this.bind();
    }

    /**
     * Add the current product with the quantity and the color selected to the cart
     */
    addToCart() {
        let count = document.getElementById("number-of-items").input;
        let color = document.getElementById("color-select");
        this.#cart.modifyProductCount(this.#teddy._id, color.value, parseInt(count.value));
        let toast = new ToastElement();
        toast.setAttribute("type", "success");
        toast.setAttribute(
            "value",
            `${count.value} article${count > 1 ? "s" : ""} ajouté${count > 1 ? "s" : ""} au panier`
        );
        document.getElementsByTagName("main")[0].appendChild(toast);
        count.value = 1;
    }
}

try {
    const controller = new Controller(await getTeddy(urlParams.get("id")), new CartStorage());
    controller.init();
} catch (err) {
    let toast = new ToastElement();
    toast.setAttribute("type", "error");
    toast.setAttribute("value", err);
    document.getElementsByTagName("body")[0].appendChild(toast);
}
