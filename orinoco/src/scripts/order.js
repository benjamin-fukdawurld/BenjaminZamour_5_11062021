import { orderTeddy } from "./utils.js";
import CartStorage from "./CartStorage.js";
import ToastElement from "./components/ToastElement.js";

/**
 * Controller for the product page
 */
class Controller {
    form;
    nextButton;
    personnalInfo;
    payInfo;
    confirmation;
    steps;
    path;
    stepIndex;

    /**
     * Creat a Controller for the product page
     */
    constructor() {
        this.form = document.getElementById("order-form");
        this.nextButton = document.getElementById("next");

        this.personnalInfo = document.getElementById("personnal-info");
        this.payInfo = document.getElementById("pay-info");
        this.confirmation = document.getElementById("order-confirmation");

        this.steps = document.getElementsByClassName("progress-step__step");
        this.path = document.getElementsByClassName("progress-step__path");
        this.stepIndex = 0;
    }

    /**
     * Send the order to the server
     */
    sendOrderToServer() {
        let { firstName, lastName, address, zipcode, city, email } = this.form;
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
                })
                    .then((res) => {
                        window.location = `confirmation.html?firstName=${res.contact.firstName}&lastName=${res.contact.lastName}&orderId=${res.orderId}`;
                    })
                    .catch((err) => {
                        let toast = new ToastElement();
                        toast.setAttribute("type", "error");
                        toast.setAttribute("value", err);
                        document.getElementsByTagName("body")[0].appendChild(toast);
                    }),
            1000
        );
    }

    /**
     * Handles the animation from personal information step to credit card info step
     */
    handlePersonalInfoStep() {
        this.personnalInfo.style.animationPlayState = "running";
        setTimeout(() => {
            this.personnalInfo.style.position = "absolute";
            this.personnalInfo.style.zIndex = -1;
            this.payInfo.style.animationPlayState = "running";
            this.payInfo.style.position = "inherit";
            this.payInfo.style.zIndex = 0;
            this.steps[1].setAttribute("data-state", "done");
            this.path[0].setAttribute("data-state", "done");
        }, 200);

        ++this.stepIndex;
    }

    /**
     * Handles the animation from credit card step to confirmation step
     */
    handleCreditCardInfoStep() {
        this.form.style.animationPlayState = "running";
        setTimeout(() => {
            this.steps[2].setAttribute("data-state", "done");
            this.path[1].setAttribute("data-state", "done");
            this.form.style.position = "absolute";
            this.form.style.display = "none";
            this.confirmation.style.position = "inherit";
            this.confirmation.style.display = "flex";
            this.confirmation.style.animationPlayState = "running";
        }, 200);

        this.sendOrderToServer();
    }

    /**
     * Initializes the controller
     */
    init() {
        this.form.addEventListener("change", () => {
            this.nextButton.disabled = !this.form.checkValidity();
        });

        this.nextButton.addEventListener("click", (event) => {
            event.preventDefault();
            if (this.stepIndex === 0) {
                this.handlePersonalInfoStep();
            } else if (this.stepIndex === 1) {
                this.handleCreditCardInfoStep();
            }
        });
    }
}

try {
    let controller = new Controller();
    controller.init();
} catch (err) {
    let toast = new ToastElement();
    toast.setAttribute("type", "error");
    toast.setAttribute("value", err);
    document.getElementsByTagName("body")[0].appendChild(toast);
}
