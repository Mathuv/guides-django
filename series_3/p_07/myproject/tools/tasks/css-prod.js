const gulp          = require('gulp');
const stylus        = require('gulp-stylus');
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');
const csslint       = require('gulp-csslint');
const uncss         = require('gulp-uncss');
const rename        = require('gulp-rename');
const cleanCSS     = require('gulp-clean-css');


// -------------------------------------
//   Task: prod css
// -------------------------------------
module.exports = function () {
    gulp.task('css-prod', function() {
        return gulp.src("./src/server/static/stylus/index.styl")
            .pipe(sourcemaps.init())
            .pipe(stylus({
                'include css': true
            }))
            .pipe(autoprefixer())
            .pipe(csslint())
            .pipe(uncss({
                html: [
                    './src/server/templates/base.html',
                ]
            }))
            .pipe(cleanCSS())
            .pipe(sourcemaps.write())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest("./build/css"))
    });
}
