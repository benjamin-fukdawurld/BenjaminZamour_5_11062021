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
    constructor(cart) {
        this.#cart = cart;
    }

    initItemListElm() {
        const generator = new TeddyCartItemGenerator();
        let products = this.#cart.products;
        let teddies = {};
        Promise.allSettled(
            Object.entries(products).map(([id]) => {
                return getTeddy(id).then((teddy) => {
                    teddies[id] = teddy;
                });
            })
        ).then(() => {
            for (const [id, colors] of Object.entries(products)) {
                for (const [color, count] of Object.entries(colors)) {
                    itemList.appendChild(
                        generator.generate({
                            teddy: teddies[id],
                            rootElm: cartItemTemplate.content.firstElementChild.cloneNode(true),
                            color,
                            count,
                        })
                    );
                }
            }
        });
    }

    init() {
        this.initItemListElm();
    }
}

const controller = new Controller(new CartStorage());
controller.init();
