let orderId = document.getElementById("orderId");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");

const urlParams = new URLSearchParams(window.location.search);

orderId.textContent = urlParams.get("orderId");
firstName.textContent = urlParams.get("firstName");
lastName.textContent = urlParams.get("lastName");

localStorage.removeItem("orinoco_cart"); // Clean the cart
