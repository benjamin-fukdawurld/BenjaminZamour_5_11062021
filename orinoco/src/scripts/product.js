import { getTeddy } from "./utils.js";
import TeddyGenerator from "./TeddyGenerator.js";
import CartStorage from "./CartStorage.js";

const urlParams = new URLSearchParams(window.location.search);

class Controller {
    #teddy;
    #cart;
    constructor(teddy, cart) {
        this.#teddy = teddy;
        this.#cart = cart;
    }

    initTitles() {
        document.title = `${this.#teddy.name} l'ourson - Orinoco teddies`;
        let heading = document.getElementsByTagName("h1");
        if (!heading || heading.length < 1) {
            throw new Error("h1 not found");
        }

        heading[0].textContent = `${this.#teddy.name} l'ourson`;
    }

    initTeddyElm() {
        const generator = new TeddyGenerator();

        let elm = document.getElementsByClassName("teddy");
        if (!elm || elm.length < 1) {
            throw new Error("teddy not found");
        }

        generator.generate({ teddy: this.#teddy, rootElm: elm[0] });
    }

    bind() {
        let btn = document.getElementById("add-to-cart-button");
        btn.addEventListener("click", (event) => {
            this.addToCart();
        });
    }

    init() {
        this.initTitles();
        this.initTeddyElm();
        this.bind();
    }

    addToCart() {
        let count = document.getElementById("number-of-items");
        let color = document.getElementById("color-select");
        this.#cart.modifyProductCount(this.#teddy._id, color.value, parseInt(count.value));
    }
}

const controller = new Controller(await getTeddy(urlParams.get("id")), new CartStorage());
controller.init();
