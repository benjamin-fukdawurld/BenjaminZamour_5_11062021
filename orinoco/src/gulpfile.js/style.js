const { src, dest } = require("gulp");
const fiber = require("fibers");
const sass = require("gulp-sass");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");

sass.compiler = require("node-sass");

const sassOptions = {
    fiber,
    outputStyle: process.env.NODE_ENV === "product" ? "compressed" : "expanded",
};

function style() {
    return src("./scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on("error", sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest(process.env.outputDir + "/css"));
}

exports.style = style;
