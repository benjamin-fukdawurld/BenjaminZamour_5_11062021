/** @module js/CartStorage */

/**
 * Cart product storage management system.
 * This object manage the local storage it read and write the product list to the local storage as
 * JSON with "orinoco_cart" as key.
 */
export default class CartStorage {
    #storage;

    /**
     * Creates a CartStorage.
     * @param {Storage} storage The system used to store the list of the products in the cart.
     */
    constructor(storage = localStorage) {
        this.#storage = storage;
    }

    /**
     * Gets the list of products.
     * @returns {Object} The list of products.
     */
    get products() {
        const productsStr = this.#storage.getItem("orinoco_cart");
        if (!productsStr) {
            return {};
        }

        return JSON.parse(productsStr);
    }

    /**
     * Update the products list in the cart storage.
     * @param {Object} products The value to set to the cart storage.
     */
    updateStorage(products) {
        this.#storage.setItem("orinoco_cart", JSON.stringify(products));
    }

    /**
     * Gets the number of products for the given id and the given color if any.
     * @param {string} id The id of the products to count.
     * @param {string} [color] The color of the product to count.
     * @returns {number} The number of products for the given id and the given color if any.
     */
    getProductCount(id, color = null) {
        const products = this.products;
        if(!products[id]) {
            return 0;
        }

        if (color) {
            return products[id][color] ?? 0;
        }

        return products[id].reduce((count, [currentColor, currentCount]) => {
            return count + currentCount;
        }, 0);
    }

    /**
     * Sets the number of products for the given id and the given color.
     * @param {string} id The id of the products to count.
     * @param {string} color The color of the product to count.
     * @param {number} count The number to set to the product list, if count < 0 it will be considered as 0.
     */
    setProductCount(id, color, count) {
        count = Math.max(count, 0);

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
            if (Object.entries(products[id]).length === 0) {
                delete products[id];
            }
        }

        this.updateStorage(products);
    }

    /**
     * Adds a value to the product count for the given id and the given color.
     * @param {string} id The id of the products to count.
     * @param {string} color The color of the product to count.
     * @param {number} count The number to add to the product count for the given id and the given color.
     */
    modifyProductCount(id, color, count) {
        if (count === 0) {
            return;
        }

        this.setProductCount(id, color, this.getProductCount(id, color) + count);
    }

    /**
     * Get an array of the products' id's of the cart.
     * @returns {string[]} The array of the products' id's of the cart.
     */
    getProductIds() {
        let products = Object.entries(this.products);
        return products
            .map(([id, colors]) => {
                return Array(
                    Object.entries(colors).reduce((idAcc, [color, count]) => idAcc + count, 0)
                ).fill(id);
            })
            .flat();
    }
}
