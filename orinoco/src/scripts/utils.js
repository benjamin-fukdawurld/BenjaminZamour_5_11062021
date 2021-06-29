export async function getTeddies() {
    let res = await fetch("http://localhost:3000/api/teddies");
    if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
    }

    return res.json();
}

export async function getTeddy(id) {
    let res = await fetch(`http://localhost:3000/api/teddies/${id}`);
    if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
    }

    return res.json();
}

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
