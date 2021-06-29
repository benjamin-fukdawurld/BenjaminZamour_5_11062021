function generateHandler(className) {
    return (target, name) => {
        if (name == "__rootElement__") {
            return target;
        }

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

export function getComponentProxy(htmlElm, className) {
    return new Proxy(htmlElm, {
        get: generateHandler(className),
    });
}
