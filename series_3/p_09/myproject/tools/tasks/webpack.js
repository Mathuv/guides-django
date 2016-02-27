const gulp          = require('gulp');
const path          = require('path');
const gutil         = require("gulp-util");
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');
const wpconfig      = require('../configs/webpack.config.js');


// -------------------------------------
//   Task: prod js
// -------------------------------------
module.exports = function () {
    gulp.task("webpack", function(callback) {
        // run webpack
        webpack(wpconfig.prod, function(err, stats) {
            if(err) throw new gutil.PluginError("webpack:build", err);
            gutil.log("[webpack]", stats.toString({
                colors: true
            }));
            callback();
        });
    });
}

