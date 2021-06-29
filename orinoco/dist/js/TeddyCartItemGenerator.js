import AbstractTeddyGenerator from "./AbstractTeddyGenerator.js";
import CartStorage from "./CartStorage.js";

export default class TeddyCartItemGenerator extends AbstractTeddyGenerator {
    constructor() {
        super();
    }

    initPriceElm() {
        this.componentProxy.price.innerHTML = `<span class="cart-item__info__price__text">prix unitaire:</span> ${(
            this.teddy.price / 100
        ).toFixed(2)}€`;
    }

    initCount(teddy, color, initialCount) {
        let cartStorage = new CartStorage();
        let totalElm = this.componentProxy["total-price"];
        let spinbox = this.componentProxy._.getElementsByTagName("spinbox-element")[0];
        spinbox.setAttribute("value", initialCount);
        spinbox.addEventListener("change", (event) => {
            let count = event.target.input.value;
            totalElm.textContent = `${((count * teddy.price) / 100).toFixed(2)}€`;
            cartStorage.setProductCount(teddy._id, color, count);
        });
    }

    initRemoveButton(teddy, color) {
        let rootElm = this.componentProxy._;
        let cartStorage = new CartStorage();
        this.componentProxy["remove-item-button"].addEventListener("click", () => {
            cartStorage.setProductCount(teddy._id, color, 0);
            document.getElementsByClassName("cart__item-list")[0].removeChild(rootElm);
        });
    }

    generate({ teddy, rootElm, color, count }) {
        this.hydrate({ teddy, rootElm, className: "cart-item" });
        this.componentProxy._.setAttribute("data-id", teddy._id);
        this.componentProxy.link.setAttribute("href", `product.html?id=${teddy._id}`);
        this.initCount(teddy, color, count);
        this.initRemoveButton(teddy, color);
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
