export default class CartStorage {
    #storage;
    constructor(storage = localStorage) {
        this.#storage = storage;
    }

    get products() {
        const productsStr = this.#storage.getItem("orinoco_cart");
        if (!productsStr) {
            return {};
        }

        return JSON.parse(productsStr);
    }

    updateStorage(products) {
        this.#storage.setItem("orinoco_cart", JSON.stringify(products));
    }

    getProductCount(id, color = null) {
        if (color) {
            return this.products[id][color];
        }

        return this.products[id].reduce((count, current) => {
            return count + current;
        }, 0);
    }

    setProductCount(id, color, count) {
        let products = this.products;
        if (!products[id]) {
            if (count !== 0) {
                products[id] = {
                    [color]: count,
                };
            }
        }

        if (count !== 0) {
            products[id][color] = count;
        } else {
            delete products[id][color];
        }

        this.updateStorage(products);
    }

    modifyProductCount(id, color, count) {
        if (count === 0) {
            return;
        }

        let products = this.products;
        if (!products[id]) {
            products[id] = {
                [color]: count,
            };
        } else if (!products[id][color]) {
            products[id][color] = count;
        } else {
            products[id][color] += count;
        }

        this.#storage.setItem("orinoco_cart", JSON.stringify(products));

        this.updateStorage(products);
    }
}