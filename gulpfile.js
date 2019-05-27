const { src, dest, parallel, watch } = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');

//nunjucks dir
var COMPILE = {
    SRC: './app/pages/**/*.+(html|njk)',
    TMP: './app/template/',
    DST: './app'
};

// moving js
function js() {
    return src(bootstrapJs)
        .pipe(dest(jsDir))
        .pipe(notify({
            message: 'Mindah <%= file.relative %>'
        }));
}

// moving css
function css() {
    return src(bootstrapCss)
        .pipe(dest(cssDir))
        .pipe(notify({
            message: 'Mindah <%= file.relative %>'
        }));
}

//compile nunjucks
function nunjucks() {
    return src(COMPILE.SRC)
        .pipe(nunjucksRender({
            path: [COMPILE.TMP]
        }))
        .pipe(dest(COMPILE.DST))
        .pipe(notify({
            message: 'Render berhasil bos'
        }));
}


//minify compile
function minify() {
    return src(sassDir)
        .pipe(sass({
            errorLogToConsole: true
        }))
        .on('error', console.error.bind(console))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest(cssDir))
        .pipe(notify({
            message: 'Minify berhasil bos'
        }));
}

function watching() {
    nunjucks();
    minify();

    browserSync.init({
        server: {
            baseDir: "./"
        },
        startPath: 'app/index.html',
        port: 3000
    });
    watch('./dst/sass/*.scss', minify).on('change', browserSync.reload);
    watch(COMPILE.SRC, nunjucks).on('change', browserSync.reload);
}


exports.js = js;
exports.css = css;
exports.render = nunjucks;
exports.default = watching;