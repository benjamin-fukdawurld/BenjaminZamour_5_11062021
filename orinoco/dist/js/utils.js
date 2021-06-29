/**
 * @module js/utils.js
 *
 * @description Contains the API calls for OriTeddy
 */

/**
 * Gets the list of the teddies from the backend.
 * It is asynchronous and might return an error if fetch fails or if the server response is not ok.
 * @async
 * @returns the list of the teddies.
 */
export async function getTeddies() {
    let res = await fetch("http://localhost:3000/api/teddies");
    if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
    }

    return res.json();
}

/**
 * Get a particular teddy given its id.
 * It is asynchronous and might return an error if fetch fails or if the server response is not ok.
 * @async
 * @param {string} id The id of the teddy to get.
 * @returns The teddy with the given id.
 */
export async function getTeddy(id) {
    let res = await fetch(`http://localhost:3000/api/teddies/${id}`);
    if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
    }

    return res.json();
}

/**
 * Sends an order to the server.
 * It is asynchronous and might return an error if fetch fails or if the server response is not ok.
 * @async
 * @param {Object} order The order object to send
 * @param {string} order.firstName The first name of the client
 * @param {string} order.lastName The last name of the client
 * @param {string} order.address The address of the client
 * @param {string} order.city The city of the client
 * @param {string} order.email The email of the client
 * @param {string[]} order.products The list of the product id of the order
 * @returns An object containing the orderId the client contact information and the products list
 */
export async function orderTeddy({ firstName, lastName, address, city, email, products }) {
    let res = await fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contact: {
                firstName,
                lastName,
                address,
                city,
                email,
            },
            products,
        }),
    });
    if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
    }

    return res.json();
}
