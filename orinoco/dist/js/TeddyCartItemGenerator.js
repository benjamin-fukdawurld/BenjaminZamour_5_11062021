import AbstractTeddyGenerator from "./AbstractTeddyGenerator.js";

export default class TeddyCartItemGenerator extends AbstractTeddyGenerator {
    constructor() {
        super();
    }

    generate({ teddy, rootElm, color, count }) {
        this.hydrate({ teddy, rootElm, className: "cart-item" });
        this.componentProxy.count.value = count;
        this.componentProxy["total-price"].textContent = count * teddy.price;
        this.hydrate({ teddy, rootElm, className: "cart-item__info" });
        this.initImageElm();
        this.initNameElm();
        this.initPriceElm();
        this.componentProxy.color.textContent = color;

        return rootElm;
    }
}
