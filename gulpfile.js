const { src, dest, watch, parallel } = require('gulp');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const purgecss = require('gulp-purgecss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

//dir
var cssDir = './assets/css/';
var jsDir = './assets/js/';
var sassDir = './assets/sass/*.scss';
var imgDir = './assets/img/';

//css plugin
var animate = 'node_modules/animate.css/animate.min.css';
var bootstrap = "node_modules/bootstrap/dist/css/bootstrap.min.css";

//js plugin
var bootstrapJs = "node_modules/bootstrap/dist/js/bootstrap.min.js";
var nicescroll = "node_modules/jquery.nicescroll/dist/jquery.nicescroll.min.js";


//make structural folder
function folder() {
    return src('*.*', { read: false })
        .pipe(dest('./sandbox/_test'))
        .pipe(dest('./assets'))
        .pipe(dest('./assets/sass'))
        .pipe(dest('./assets/css'))
        .pipe(dest('./assets/js'))
        .pipe(dest('./assets/img'))
        .pipe(notify({
            message: 'Folder wis dadi'
        }));
}

// manage js asset
function jsAsset() {
    return src([bootstrapJs, nicescroll])
        .pipe(plumber())
        .pipe(concat('plugin.min.js'))
        .pipe(uglify())
        .pipe(dest(jsDir))
        .pipe(notify({
            message: 'File <%= file.relative %> wis dadi'
        }));
}

// manage css asset
function cssAsset() {
    return src([bootstrap, animate])
        .pipe(plumber())
        .pipe(concat('plugin.css'))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest(cssDir))
        .pipe(notify({
            message: 'File <%= file.relative %> wis dadi'
        }));
}

//sass-dev
function sassdev() {
    return src(sassDir)
        .pipe(plumber())
        .pipe(sass({
            errorLogToConsole: true
        }))
        .on('error', console.error.bind(console))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest(cssDir))
        .pipe(browserSync.stream());
}

//minify css
function minify() {
    return src('./assets/css/*.css')
        .pipe(purgecss({ content: ['*.html'] }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest('./assets/css/'));
}

//reload
function reload(done) {
    browserSync.reload();
    done();
}

//watching
function dev() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 8080
    });
    watch('./assets/sass/*.scss', sassdev);
    watch('./*.html', reload);
    // watch('./public/assets/js/*.js', jsmin);
}

exports.updateAsset = parallel(cssAsset, jsAsset);
exports.updateCss = cssAsset;
exports.updateJs = jsAsset;
exports.folder = folder;
exports.minify = minify;
exports.default = parallel(dev, minify);