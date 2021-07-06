/**
 * Helper function to create SVG element.
 * @param {string} [pathData] The value for the path element's d attribute.
 * @returns An SVG element to add to the page
 */
export function generateSvg(pathData) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.classList.add("h-6", "w-6");

    if (pathData) {
        svg.appendChild(generatePath(pathData));
    }

    return svg;
}

/**
 * Helper function to create a path element for SVG element.
 * @param {string} pathData The value for the d attribute of the path element.
 * @returns the path element.
 */
export function generatePath(pathData) {
    let newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newPath.setAttributeNS(null, "stroke-linecap", "round");
    newPath.setAttributeNS(null, "stroke-linejoin", "round");
    newPath.setAttributeNS(null, "stroke-width", "2");
    newPath.setAttributeNS(null, "d", pathData);
    return newPath;
}
