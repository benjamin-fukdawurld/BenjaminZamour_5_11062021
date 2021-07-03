/** @module js/cart */

import { getTeddy } from "./utils.js";
import TeddyCartItemGenerator from "./TeddyCartItemGenerator.js";
import CartStorage from "./CartStorage.js";

import ToastElement from "./components/ToastElement.js";

/**
 * Represents the controller of the cart page.
 */
class Controller {
    cart;
    teddies;
    itemListElm;
    cartItemTemplateElm;

    /**
     * Creates a controller for the cart page.
     * @param {CartStorage} cart The cart storage management object.
     */
    constructor(cart) {
        this.cart = cart;
        this.itemListElm = document.getElementsByClassName("cart__item-list");
        if (!this.itemListElm || this.itemListElm.length < 1) {
            throw new Error("cart__item-list not found");
        }
        this.itemListElm = this.itemListElm[0];

        this.cartItemTemplateElm = document.getElementById("cart-item__template");
        if (!this.cartItemTemplateElm) {
            throw new Error("cart-item__template not found");
        }
    }

    /**
     * Get all necessary teddies according to the product ids in the cart
     * @param {Object} products The products in the cart.
     * @returns A promise resolved when all getTeddy() promises are settled.
     */
    getTeddies(products) {
        return Promise.allSettled(
            products.map(([id]) => {
                return getTeddy(id)
                    .then((teddy) => {
                        this.teddies[id] = teddy;
                    })
                    .catch((err) => {
                        let toast = new ToastElement();
                        toast.setAttribute("type", "error");
                        toast.setAttribute("value", err);
                        document.getElementsByTagName("body")[0].appendChild(toast);
                    });
            })
        );
    }

    /**
     * Populates the cart with the teddies representation.
     */
    generateCartItems(products) {
        const generator = new TeddyCartItemGenerator();
        for (const [id, colors] of products) {
            for (const [color, count] of Object.entries(colors)) {
                this.itemListElm.appendChild(
                    generator.generate({
                        teddy: this.teddies[id],
                        rootElm: this.cartItemTemplateElm.content.firstElementChild.cloneNode(true),
                        color,
                        count,
                    })
                );
            }
        }
    }

    /**
     * Connects the spinboxes and remove buttons to the appropriate callbacks
     */
    bindElements() {
        for (let spin of this.itemListElm.getElementsByTagName("spinbox-element")) {
            spin.addEventListener("change", () => {
                this.updateCart();
            });
        }

        for (let button of this.itemListElm.getElementsByClassName(
            "cart-item__remove-item-button"
        )) {
            button.addEventListener("click", () => {
                this.updateCart();
            });
        }
    }

    /**
     * Hode the command button and add a text to cart items list when the cart is empty
     */
    handleCartEmpty() {
        let paragraph = document.createElement("p");
        paragraph.textContent = "Le panier est vide.";
        paragraph.classList.add("cart__item-list__empty-text");
        this.itemListElm.appendChild(paragraph);
        document.getElementsByClassName("cart__order-button")[0].style.display = "none";
    }

    /**
     * Initializes the cart item list, fill it with all the product selected and connect the
     * products' change event to a callback to update the total price and the page.
     */
    initItemListElm() {
        let products = Object.entries(this.cart.products);
        if (products.length === 0) {
            this.handleCartEmpty();
            return;
        }

        this.teddies = {};
        this.getTeddies(products)
            .then(() => {
                this.generateCartItems(products);
                this.bindElements();
                this.updateCart();
            })
            .catch((err) => {
                let toast = new ToastElement();
                toast.setAttribute("type", "error");
                toast.setAttribute("value", err);
                document.getElementsByTagName("body")[0].appendChild(toast);
            });
    }

    /**
     * Update the total price of the cart and hide the order button if the cart is empty.
     */
    updateCart() {
        let prices = document.getElementsByClassName("cart-item__total-price");
        let total = 0;
        for (let price of prices) {
            total += parseFloat(price.textContent.slice(0, -1));
        }

        document.getElementsByClassName("cart__total-price")[0].textContent = `${total.toFixed(
            2
        )}€`;

        if (total === 0) {
            this.handleCartEmpty();
        }
    }

    /**
     * Initializes the controller
     */
    init() {
        this.initItemListElm();
    }
}

try {
    const controller = new Controller(new CartStorage());
    controller.init();
} catch (err) {
    let toast = new ToastElement();
    toast.setAttribute("type", "error");
    toast.setAttribute("value", err);
    document.getElementsByTagName("body")[0].appendChild(toast);
}
