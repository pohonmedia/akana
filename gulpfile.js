const { src, dest, parallel, watch } = require('gulp');
var nunjucksRender = require('gulp-nunjucks-render');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

//assets dir
var ASSETS = {
    SRC: './app/assets',
    CSS: './app/assets/css',
    JS: './app/assets/js',
    IMG: './app/assets/img',
    SASS: './app/assets/sass',
    TESTING: './app/sandbox/_test'
}

//nunjucks dir
var COMPILE = {
    SRC: './app/pages/**/*.+(html|njk)',
    TMP: './app/template/',
    DST: './app'
};

//make structural folder
function folder() {
    return src('*.*', { read: false })
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message: err.toString()
                })(err);
            }
        }))
        .pipe(dest(ASSETS.SRC))
        .pipe(dest(ASSETS.TESTING))
        .pipe(dest(ASSETS.SASS))
        .pipe(dest(ASSETS.CSS))
        .pipe(dest(ASSETS.JS))
        .pipe(dest(ASSETS.IMG))
        .pipe(notify({
            message: 'Folder wis dadi'
        }));
};

// moving js
function js() {
    return src()
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message: err.toString()
                })(err);
            }
        }))
        .pipe(dest(ASSETS.JS))
        .pipe(notify({
            message: 'Mindah <%= file.relative %>'
        }));
};

// moving css
function css() {
    return src()
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message: err.toString()
                })(err);
            }
        }))
        .pipe(dest(ASSETS.CSS))
        .pipe(notify({
            message: 'Mindah <%= file.relative %>'
        }));
};

//compile nunjucks
function nunjucks() {
    return src(COMPILE.SRC)
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message: err.toString()
                })(err);
            }
        }))
        .pipe(nunjucksRender({
            path: [COMPILE.TMP]
        }))
        .pipe(dest(COMPILE.DST))
        .pipe(notify({
            message: 'Render berhasil bos'
        }));
};

//minify compile
function minify() {
    return src(ASSETS.SASS)
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message: err.toString()
                })(err);
            }
        }))
        .pipe(sass({
            errorLogToConsole: true
        }))
        .on('error', console.error.bind(console))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest(ASSETS.CSS))
        .pipe(notify({
            message: 'Minify berhasil bos'
        }));
};

function build(done) {
    nunjucks()
    minify()
        .pipe(plumber({
            errorHandler: function (err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message: err.toString()
                })(err);
            }
        }))
        .pipe(notify({
            message: 'Build berhasil bos'
        }));
    done();
};

function watching() {
    build();

    browserSync.init({
        server: {
            baseDir: "./"
        },
        startPath: 'app/index.html',
        port: 3000
    });
    watch('./dst/sass/*.scss', minify).on('change', browserSync.reload);
    watch(COMPILE.SRC, nunjucks).on('change', browserSync.reload);
};

exports.folder = folder;
exports.js = js;
exports.css = css;
exports.render = nunjucks;
exports.build = build;
exports.default = watching;