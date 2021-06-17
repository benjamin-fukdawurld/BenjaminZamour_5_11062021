const { src, dest } = require("gulp");
const fiber = require("fibers");
const sass = require("gulp-sass");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const purgecss = require("gulp-purgecss");

sass.compiler = require("node-sass");

const sassOptions = {
    fiber,
    outputStyle: process.env.NODE_ENV === "product" ? "compressed" : "expanded",
};

function style() {
    return src("./scss/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on("error", sass.logError))
        .pipe(postcss([tailwindcss(), autoprefixer()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest(process.env.outputDir + "/debug/css"));
}

function cleancss() {
    return src(process.env.outputDir + "/debug/css/*.css")
        .pipe(
            purgecss({
                content: [process.env.outputDir + "/**/*.html", process.env.outputDir + "/**/*.js"],
            })
        )
        .pipe(dest(process.env.outputDir + "/css"));
}

exports.style = style;

exports.cleancss = cleancss;
