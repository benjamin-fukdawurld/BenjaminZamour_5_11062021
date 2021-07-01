import { getTeddy } from "./utils.js";
import TeddyCartItemGenerator from "./TeddyCartItemGenerator.js";
import CartStorage from "./CartStorage.js";

const cartItemTemplate = document.getElementById("cart-item__template");
if (!cartItemTemplate) {
    throw new Error("cart-item__template not found");
}

class Controller {
    #cart;
    #teddies;
    #itemListElm;
    constructor(cart) {
        this.#cart = cart;
        this.#itemListElm = document.getElementsByClassName("cart__item-list");
        if (!this.#itemListElm || this.#itemListElm.length < 1) {
            throw new Error("cart__item-list not found");
        }
        this.#itemListElm = this.#itemListElm[0];
    }

    initItemListElm() {
        const generator = new TeddyCartItemGenerator();
        let products = Object.entries(this.#cart.products);
        if (products.length === 0) {
            let paragraph = document.createElement("p");
            paragraph.textContent = "Le panier est vide.";
            paragraph.classList.add("cart__item-list__empty-text");
            this.#itemListElm.appendChild(paragraph);
            document.getElementsByClassName("cart__order-button")[0].style.display = "none";
            return;
        }

        this.#teddies = {};
        Promise.allSettled(
            products.map(([id]) => {
                return getTeddy(id).then((teddy) => {
                    this.#teddies[id] = teddy;
                });
            })
        ).then(() => {
            for (const [id, colors] of products) {
                for (const [color, count] of Object.entries(colors)) {
                    this.#itemListElm.appendChild(
                        generator.generate({
                            teddy: this.#teddies[id],
                            rootElm: cartItemTemplate.content.firstElementChild.cloneNode(true),
                            color,
                            count,
                        })
                    );
                }
            }

            for (let spin of this.#itemListElm.getElementsByTagName("spinbox-element")) {
                spin.addEventListener("change", () => {
                    this.updateTotalPrice();
                });
            }

            for (let button of this.#itemListElm.getElementsByClassName(
                "cart-item__remove-item-button"
            )) {
                button.addEventListener("click", () => {
                    this.updateTotalPrice();
                });
            }

            this.updateTotalPrice();
        });
    }

    updateTotalPrice() {
        let prices = document.getElementsByClassName("cart-item__total-price");
        let total = 0;
        for (let price of prices) {
            total += parseFloat(price.textContent.slice(0, -1));
        }

        document.getElementsByClassName("cart__total-price")[0].textContent = `${total.toFixed(
            2
        )}€`;

        if (total === 0) {
            let paragraph = document.createElement("p");
            paragraph.textContent = "Le panier est vide.";
            paragraph.classList.add("cart__item-list__empty-text");
            this.#itemListElm.appendChild(paragraph);
            document.getElementsByClassName("cart__order-button")[0].style.display = "none";
            return;
        }
    }

    init() {
        this.initItemListElm();
    }
}

const controller = new Controller(new CartStorage());
controller.init();
