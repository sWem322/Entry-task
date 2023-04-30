const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
// const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

// function script() {
//     return gulp.src('app/js/*.js')
//         .pipe(concat('main.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('app/js'))
//         .pipe(browserSync.stream());

// }

function styles() {
    return gulp.src('app/scss/style.scss')
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
};

function watching() {
    gulp.watch(['app/scss/style.scss'], styles)
    gulp.watch(['app/index.html']).on('change', browserSync.reload);
    // gulp.watch(['app/js/script.js'], scripts)
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
}


exports.styles = styles;
// exports.script = script;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = gulp.parallel(styles, browsersync, watching)