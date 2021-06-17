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
