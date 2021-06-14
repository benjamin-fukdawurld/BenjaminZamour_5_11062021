import { getComponentProxy } from "./ComponentProxy.js";

export default class AbstractTeddyGenerator {
    teddy;
    componentProxy;
    constructor() {
        this.teddy = null;
        this.componentProxy = null;
    }

    initImageElm() {
        let elm = this.componentProxy.image;
        elm.setAttribute("src", this.teddy.imageUrl);
        elm.setAttribute("alt", `découvrez ${this.teddy.name} l'ourson`);
    }

    initNameElm() {
        this.componentProxy.name.textContent = this.teddy.name;
    }

    initPriceElm() {
        this.componentProxy.price.textContent = this.teddy.price;
    }

    hydrate({ teddy, rootElm, className }) {
        this.teddy = teddy;
        this.componentProxy = getComponentProxy(rootElm, className);
    }

    generate({ teddy, rootElm, ...props }) {
        throw new Error("generate is abstract, it must be override");
    }
}
