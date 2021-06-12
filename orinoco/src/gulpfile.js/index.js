require("dotenv").config();

process.env.outputDir = process.env.outputDir ?? "./dist";

const { watch, parallel } = require("gulp");

const { style } = require("./style");
const { js } = require("./js");
const { html } = require("./html");
const { images } = require("./images");

exports.style = style;
exports.html = html;
exports.js = js;
exports.images = images;

exports.watch = function () {
    watch("./scss/**/*.scss", { ignoreInitial: false }, style);
    watch("./views/**/*", { ignoreInitial: false }, html);
    watch("./resources/js/*.js", { ignoreInitial: false }, js);
    watch("./scripts/*.js", { ignoreInitial: false }, js);
    watch("./resources/images/*.js", { ignoreInitial: false }, images);
    watch("./resources/favicon.*", { ignoreInitial: false }, images);
};

exports.default = parallel(html, style, js, images);
