import { getTeddy } from "./utils.js";
import TeddyCartItemGenerator from "./TeddyCartItemGenerator.js";
import CartStorage from "./CartStorage.js";

let itemList = document.getElementsByClassName("cart__item-list");
if (!itemList || itemList.length < 1) {
    throw new Error("cart__item-list not found");
}
itemList = itemList[0];

const cartItemTemplate = document.getElementById("cart-item__template");
if (!cartItemTemplate) {
    throw new Error("cart-item__template not found");
}

class Controller {
    #cart;
    #teddies;
    constructor(cart) {
        this.#cart = cart;
    }

    initItemListElm() {
        const generator = new TeddyCartItemGenerator();
        let products = this.#cart.products;
        this.#teddies = {};
        Promise.allSettled(
            Object.entries(products).map(([id]) => {
                return getTeddy(id).then((teddy) => {
                    this.#teddies[id] = teddy;
                });
            })
        ).then(() => {
            for (const [id, colors] of Object.entries(products)) {
                for (const [color, count] of Object.entries(colors)) {
                    itemList.appendChild(
                        generator.generate({
                            teddy: this.#teddies[id],
                            rootElm: cartItemTemplate.content.firstElementChild.cloneNode(true),
                            color,
                            count,
                        })
                    );
                }
            }

            for (let spin of itemList.getElementsByTagName("spinbox-element")) {
                spin.addEventListener("change", () => {
                    this.updateTotalPrice();
                });
            }

            for (let button of itemList.getElementsByClassName("cart-item__remove-item-button")) {
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
    }

    init() {
        this.initItemListElm();
    }
}

const controller = new Controller(new CartStorage());
controller.init();