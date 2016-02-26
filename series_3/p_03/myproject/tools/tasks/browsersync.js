const gulp                 = require('gulp');
const browsersync          = require('browser-sync').create('dev server');

// -------------------------------------
//   task: browsersync
// -------------------------------------
module.exports = function () {
    gulp.task('browsersync', function() {
        browsersync.init({
            proxy: {
                target: "localhost:2200",
            },
        });

        // compile css
        gulp.watch('./src/server/static/stylus/**/*.styl', ['css']);
        // inject css into browsersync
        gulp.watch('./build/css/*.css', function() {
            gulp.src('./build/css/*.css')
                .pipe(browsersync.stream());
        });
    });
};
