const { src, dest, series } = require("gulp");
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
        .pipe(
            postcss([
                tailwindcss({
                    theme: {
                        container: {
                            center: true,
                            padding: {
                                DEFAULT: "1rem",
                                sm: "2rem",
                                lg: "2rem",
                                xl: "4rem",
                                "2xl": "4rem",
                            },
                        },
                        extend: {},
                        fontFamily: {
                            logo: ["Pacifico", "Open Sans"],
                        },
                    },
                }),
                autoprefixer(),
            ])
        )
        .pipe(sourcemaps.write("."))
        .pipe(dest(process.env.outputDir + "/debug/css"));
}

function cleancss() {
    return src(process.env.outputDir + "/debug/css/*.css")
        .pipe(
            purgecss({
                content: [process.env.outputDir + "/**/*.html", process.env.outputDir + "/**/*.js"],
                safelist: [
                    "md:text-6xl",
                    "md:h-12",
                    "md:w-12",
                    "h-3/4",
                    "w-1/3",
                    "w-3/4",
                    "hover:text-purple-700",
                    "hover:scale-110",
                    "hover:scale-125",
                    "md:grid-cols-2",
                    "md:grid-rows-1",
                    "lg:mt-4",
                    "2xl:text-2xl",
                    "2xl:text-lg",
                ],
            })
        )
        .pipe(dest(process.env.outputDir + "/css"));
}

function copyCssMap() {
    return src(process.env.outputDir + "/debug/css/*.css.map").pipe(
        dest(process.env.outputDir + "/css")
    );
}

exports.style = style;

exports.cleancss = cleancss;

exports.copyCssMap = copyCssMap;
