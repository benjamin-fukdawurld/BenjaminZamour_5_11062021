import { getTeddy } from "./utils.js";
import TeddyGenerator from "./TeddyGenerator.js";
import CartStorage from "./CartStorage.js";
import ToastElement from "./components/ToastElement.js";

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

        heading[0].textContent = this.#teddy.name;
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

const controller = new Controller(await getTeddy(urlParams.get("id")), new CartStorage());
controller.init();
