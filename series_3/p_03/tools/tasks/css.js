const gulp          = require('gulp');
const stylus        = require('gulp-stylus');
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');
const csslint       = require('gulp-csslint');

// -------------------------------------
//   task: css
// -------------------------------------
module.exports = function () {
    gulp.task('css', function() {
        return gulp.src("./src/server/static/stylus/index.styl")
            .pipe(sourcemaps.init())
            .pipe(stylus())
            .pipe(autoprefixer())
            .pipe(csslint())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest("./build/css/"))
    });
}
