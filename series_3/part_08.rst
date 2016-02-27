******
Part 8
******

This is the second part of getting our code ready for production.  The last part focused on CSS, this section will focus on prepping our javascript for production.  Review of section points:

* Requirements for production js
* Create our production js task
* Configure our production js task
* Tell Gulp about our new task
* Run production js task

Requirements for production js
------------------------------

As always, lets install some packages:

.. code-block:: bash

    npm install webpack-stream gutil --save-dev

webpack-stream : package
    Recommended by webpack to use with gulp builds

gutil : package
    Helpful utility package.

Create our production js task
-----------------------------

We will start by creating out task.  It will be called ``webpack.js`` and we will add it to the ``tasks`` directory.  It should look like this when done:

.. code-block:: bash

    └── tools
        └── tasks
            └── browsersync.js
            └── css-dev.js
            └── css-prod.js
            └── webpack.js

Coolness.  That is all.  Let's start configuring the file.

Create our production js task
-----------------------------

Add the following to your ``js-prod.js``.

.. code-block:: javascript

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

The above does the following:

1. Create a new task called ``js-prod``
2. Enter at ``js/index.js``
3. Inside the ``{}`` you can set options.  You probably noticed, but these are actually the same settings we set in ``webpack.config.js``.  So why not just create a production version for these? Yep, we will do that in the next part ;).  For the time being, I want to be a little more transparent about what we are doing.
4. After our first argument of ``{}`` we pass it ``webpack``.  I do this because webpackStream could be using a different version of webpack.  I want to use the version that my project uses, which could be different from webpackStream, so I pass it my own version of webpack.

Lets go tell gulp what's up.

Tell Gulp about our new task
----------------------------

Go into ``gulpfile.js`` and make the ``tasks`` variable look like this:

.. code-block:: javascript

    var tasks = [
        'css-dev',
        'css-prod',
        'browsersync',
        'webpack',
    ];

Run ``js-prod``
---------------

Let's see if everything worked:

.. code-block:: bash

    gulp webpack

Did you run into any errors?  If you have JS code that looks like mine, you will have gotten an error message from our dear friend ``eslint``.  Lets fix that up.  Go into ``src/server/static/js/index.js`` and update to look like this:

.. code-block:: javascript

    const a = 5;

    console.log(a);        //NEW

    if (module.hot) {
      module.hot.accept();
    }

Lets run the following in our ``build`` task.  Go into ``gulpfile.js`` and update our ``build`` task to look like this:

.. code-block:: bash

    gulp.task('build', ['css-prod', 'webpack'], function () {});

Now let's run ``gulp build`` to make sure everything works.  That's it for our production run.