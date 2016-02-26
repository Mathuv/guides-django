const gulp                 = require('gulp');
const browsersync          = require('browser-sync').create();
const wpconfig             = require('../configs/webpack.config.js');
const webpack              = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bundler              = webpack(wpconfig);


// -------------------------------------
//   Task: Browsersync
// -------------------------------------
module.exports = function () {
    gulp.task('browsersync', function() {
        browsersync.init({
            proxy: {
                target: "localhost:8111",
                middleware: [
                    // webpack-dev-middleware
                    webpackDevMiddleware(bundler, {
                        publicPath: wpconfig.output.publicPath,
                        stats: {
                            colors: true
                        },
                        headers: {
                            "X-Custom-Header": "yes"
                        },
                    }),

                    // compiler should be the same as above
                    webpackHotMiddleware(bundler),
                ],
            },

        });

        // compile css
        gulp.watch('./static/**/*.styl', ['dev:css']);
        // inject css into browsersync
        gulp.watch('./build/*.css', function() {
            gulp.src('./build/*.css')
                .pipe(browsersync.stream());
        });
    });
};
