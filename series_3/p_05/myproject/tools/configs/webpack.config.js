const path            = require('path');
const webpack         = require('webpack');

const PATHS = {
  index: path.join(__dirname, '../../src/server/static/js/index.js'),
  build: path.join(__dirname, '../../build/js'),
  javascripts: path.join(__dirname, '../../src/server/static/js/'),
  styles: path.join(__dirname, '../../src/server/static/sylus/'),
};

module.exports = {
    devtool: "eval",

    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        PATHS.index,
    ],

    output: {
        filename: 'bundle.js',
        path: PATHS.build,
        publicPath: 'http://localhost:3000/build/js',
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                include: [
                    PATHS.javascripts,
                    PATHS.styles,
                ],
                query: {
                  plugins: ['transform-runtime'],
                  presets: ['es2015'],
                }
            },
        ],
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}
