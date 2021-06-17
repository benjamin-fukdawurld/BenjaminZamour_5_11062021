require("dotenv").config();

process.env.outputDir = process.env.outputDir ?? "./dist";

const { watch, parallel, series } = require("gulp");

const { style, cleancss } = require("./style");
const { js } = require("./js");
const { html } = require("./html");
const { images } = require("./images");

exports.style = style;
exports.cleancss = cleancss;
exports.html = html;
exports.js = js;
exports.images = images;

exports.watch = function () {
    watch("./scss/**/*.scss", { ignoreInitial: false }, series(style, cleancss));
    watch("./views/**/*", { ignoreInitial: false }, series(html, cleancss));
    watch("./resources/js/*.js", { ignoreInitial: false }, js);
    watch("./scripts/*.js", { ignoreInitial: false }, js);
    watch("./resources/images/*.js", { ignoreInitial: false }, images);
    watch("./resources/favicon.*", { ignoreInitial: false }, images);
};

exports.default = series(parallel(html, style, js, images), cleancss);
