import { getTeddies } from "./utils.js";
import TeddyCardGenerator from "./TeddyCardGenerator.js";

let teddies = await getTeddies();

let productList = document.getElementById("product-list");
const teddyCardTemplate = document.getElementById("teddy-card__template");
if (!teddyCardTemplate) {
    throw new Error("teddy-card__template not found");
}

const generator = new TeddyCardGenerator();
teddies.forEach((teddy) => {
    productList.appendChild(
        generator.generate({
            teddy,
            rootElm: teddyCardTemplate.content.firstElementChild.cloneNode(true),
        })
    );
});
