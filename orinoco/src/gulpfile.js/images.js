const { src, dest, parallel } = require("gulp");

const imagemin = require("gulp-imagemin");

function optimiseImages() {
    return src("./resources/images/*")
        .pipe(imagemin())
        .pipe(dest(process.env.outputDir + "/img"));
}

function favicon() {
    return src("./resources/favicon.*").pipe(imagemin()).pipe(dest(process.env.outputDir));
}

exports.images = parallel(optimiseImages, favicon);
