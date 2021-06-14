import AbstractTeddyGenerator from "./AbstractTeddyGenerator.js";

const truncate = (input, length) => {
    return input.length > length ? `${input.substring(0, length - 3)}...` : input;
};

export default class TeddyCardGenerator extends AbstractTeddyGenerator {
    constructor() {
        super();
    }

    initCardElm() {
        this.componentProxy._.setAttribute("data-id", this.teddy._id);
    }

    initCardLinkElm() {
        let elm = this.componentProxy.link;
        elm.setAttribute("href", `product.html?id=${this.teddy._id}`);
        elm.setAttribute("aria-label", `découvrez ${this.teddy.name} l'ourson`);
    }

    initDescriptionElm() {
        this.componentProxy.description.textContent = truncate(this.teddy.description, 20);
    }

    generate({ teddy, rootElm }) {
        this.hydrate({ teddy, rootElm, className: "teddy-card" });
        this.initCardLinkElm();
        this.initCardElm();
        this.initImageElm();
        this.initNameElm();
        this.initDescriptionElm();
        this.initPriceElm();

        return rootElm;
    }
}
