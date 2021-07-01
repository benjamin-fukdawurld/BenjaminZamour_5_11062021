/** @module js/ComponentProxy */

/**
 * Helper function to generate a getter for a component proxy.
 *
 * @param {string} className the name of the root element.
 *
 * @see {@link getComponentProxy}
 *
 * @returns the getter function for the given className.
 */
function generateHandler(className) {
    return (target, name) => {
        let fullName = className + (name && name !== "_" ? "__" + name : "");
        if (target.classList.contains(fullName)) {
            return target;
        }

        let elm = target.getElementsByClassName(fullName);
        if (!elm || elm.length < 1) {
            throw new Error(`${fullName} not found`);
        }

        return elm[0];
    };
}

/**
 * Helper function to create a Proxy to access child elements given their class names.
 *
 * It might seems interesting to use id instead of class to access elements in the DOM but since some
 * elements might appear several times in the element it is not always a good solution. Therefore this
 * function returns a Proxy instance that access child element of a HTMLElement given a class name.
 * It uses the BEM notation, so the required member is concatenated using "__".
 *
 * Note that, if you require the "_" or "__" member it will return htmlElm.
 *
 * @example
 * // if the className of you proxy is "rootClass" and you require member "child" it will ends up looking
 * // for the first element with "rootClass__child" as class in the DOM starting from htmlElm.
 * let proxy = getComponentProxy(htmlElm, "rootClass");
 *
 * let child = proxy.child; // return first element with "rootClass__child" as class in the DOM starting from htmlElm
 *
 * @param {HTMLElement} htmlElm The root element of the component.
 * @param {string} className The class name of the root element.
 * @returns {Proxy} A proxy to access child element using BEM notation.
 */
export function getComponentProxy(htmlElm, className) {
    return new Proxy(htmlElm, {
        get: generateHandler(className),
    });
}
