var webpack = require('webpack');

module.exports = function(config) {

    config.set({
        plugins: [
          require('karma-webpack'),
          require('karma-tap'),
          require('karma-coverage'),
          require('karma-chrome-launcher'),
          require('karma-phantomjs-launcher')
        ],

        basePath: '../..',

        frameworks: [ 'tap' ],

        files: [ './tests/tests.bundle.js' ],

        preprocessors: {
            './tests/tests.bundle.js': [ 'webpack' ]
        },

        webpack: {
            devtool: 'inline-source-map',
            node : {
                fs: 'empty' // for webpack and tape
            },

            // Instrument code that isn't test or vendor code.
            module: {
                loaders: [
                    {
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        test: /\.jsx?$/
                    }
                ],
                postLoaders: [
                    {
                        test: /\.js$/,
                        exclude: /(test|node_modules)\//,
                        loader: 'istanbul-instrumenter'
                    }
                ],
            }
        },

        webpackMiddleware: {
            noInfo: true
        },

        reporters: [ 'dots', 'coverage' ],

        coverageReporter: {
            type: 'text'
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: false
    })

}
