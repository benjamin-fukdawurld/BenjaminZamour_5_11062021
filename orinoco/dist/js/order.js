import { orderTeddy } from "./utils.js";
import CartStorage from "./CartStorage.js";

const form = document.getElementById("order-form");
const nextButton = document.getElementById("next");

let personnalInfo = document.getElementById("personnal-info");
let payInfo = document.getElementById("pay-info");
let confirmation = document.getElementById("order-confirmation");

let steps = document.getElementsByClassName("progress-step__step");
let path = document.getElementsByClassName("progress-step__path");
let stepIndex = 0;

let fieldsets = form.getElementsByTagName("fieldset");

form.addEventListener("change", () => {
    nextButton.disabled = !fieldsets[stepIndex].checkValidity();
});

nextButton.addEventListener("click", (event) => {
    if (stepIndex === 0) {
        event.preventDefault();
        personnalInfo.style.animationPlayState = "running";
        setTimeout(() => {
            personnalInfo.style.position = "absolute";
            personnalInfo.style.zIndex = -1;
            payInfo.style.animationPlayState = "running";
            payInfo.style.position = "inherit";
            payInfo.style.zIndex = 0;
            steps[1].setAttribute("data-state", "done");
            path[0].setAttribute("data-state", "done");
        }, 200);

        ++stepIndex;
    } else if (stepIndex === 1) {
        event.preventDefault();
        form.style.animationPlayState = "running";
        setTimeout(() => {
            steps[2].setAttribute("data-state", "done");
            path[1].setAttribute("data-state", "done");
            form.style.position = "absolute";
            form.style.display = "none";
            confirmation.style.position = "inherit";
            confirmation.style.display = "flex";
            confirmation.style.animationPlayState = "running";

            let { firstName, lastName, address, zipcode, city, email } = form;
            firstName = firstName.value;
            lastName = lastName.value;
            address = `${address.value} ${zipcode.value}`;
            city = city.value;
            email = email.value;

            let storage = new CartStorage();
            setTimeout(
                () =>
                    orderTeddy({
                        firstName,
                        lastName,
                        address,
                        city,
                        email,
                        products: storage.getProductIds(),
                    }).then((res) => {
                        window.location = `confirmation.html?firstName=${res.contact.firstName}&lastName=${res.contact.lastName}&orderId=${res.orderId}`;
                    }),
                1000
            );
        }, 200);
    }
});
