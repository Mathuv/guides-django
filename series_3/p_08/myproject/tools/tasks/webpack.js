const gulp          = require('gulp');
const gutil         = require("gulp-util");
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');
const webpackconfig = require('../configs/webpack.config.js');


// -------------------------------------
//   Task: prod js
// -------------------------------------
module.exports = function () {
    gulp.task("webpack", function(callback) {
        // run webpack
        webpack({
            devtool: "eval",

            eslint: {
                configFile: "./tools/configs/.eslintrc"
            },

            entry: [
                './src/server/static/js/index.js'
            ],

            output: {
                filename: 'bundle.js',
                path: './build/js',
            },

            module: {
                preLoaders: [
                    {
                        test: /\.js$/,
                        loader: "eslint-loader",
                        include: './src/server/static/js/**/*.js',
                    }
                ],
                loaders: [
                    {
                        test: /\.jsx?$/,
                        loader: "babel-loader",
                        include: [
                            './src/server/static/js/**/*.js',
                        ],
                        query: {
                          plugins: ['transform-runtime'],
                          presets: ['es2015'],
                        }
                    },
                ],
            },

            plugins: [
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin()
            ]


        }, function(err, stats) {
            if(err) throw new gutil.PluginError("webpack:build", err);
            gutil.log("[webpack]", stats.toString({
                colors: true
            }));
            callback();
        });
    });
}

