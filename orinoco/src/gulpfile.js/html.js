const { src, dest } = require("gulp");
const ejs = require("gulp-ejs");
const formatHtml = require("gulp-format-html");

const formatterOptions = {
    indent_size: 4,
    html: {
        end_with_newline: true,
        wrap_line_length: 100,
    },
};

function html() {
    return src("./views/**/*.html")
        .pipe(ejs())
        .pipe(formatHtml(formatterOptions))
        .pipe(dest(process.env.outputDir));
}

exports.html = html;
