import AbstractTeddyGenerator from "./AbstractTeddyGenerator.js";

export default class TeddyGenerator extends AbstractTeddyGenerator {
    constructor() {
        super();
    }

    initColorSelect() {
        let select = this.componentProxy["color-select"];
        this.teddy.colors.forEach((color) => {
            let elm = document.createElement("option");
            elm.setAttribute("value", color);
            elm.textContent = color;
            select.appendChild(elm);
        });
    }

    generate({ teddy, rootElm }) {
        this.hydrate({ teddy, rootElm, className: "teddy" });
        this.componentProxy.description.textContent = this.teddy.description;
        this.initImageElm();
        this.initNameElm();
        this.initPriceElm();
        this.initColorSelect();

        return rootElm;
    }
}
