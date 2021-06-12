const { src, dest, series } = require("gulp");
const minify = require("gulp-minify");

function resources() {
    return src(["./resources/js/*.js", "!./resources/js/*.test.js"])
        .pipe(
            minify({
                ext: {
                    src: ".js",
                    min: ".min.js",
                },
                ignoreFiles: [".combo.js", ".min.js"],
            })
        )
        .pipe(dest(process.env.outputDir + "/js"));
}

function scripts() {
    return src(["./scripts/*.js", "!./scripts/*.test.js"]).pipe(
        dest(process.env.outputDir + "/js")
    );
}

exports.js = series(resources, scripts);
