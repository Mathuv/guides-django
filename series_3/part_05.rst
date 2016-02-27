******
Part 5
******

Now that we have webpack, lets see what else it can do for us.  We are going to spend this section outlining how to setup this project to be able to take advantage of ES6 now.  This section will review the following.

* es6 requirements
* configuring webpack.config.js
* writing es6 code

The beauty of doing this is that even if you do not plan on writing ES6, you have the option if you want it.  This does not add extra overhead, it simply provides you with some extra options.

ES6 requirements
----------------

Like everything, we are going to need to install some packages to configure ES6.  Run the following command:

.. code-block:: bash

    npm install babel-core babel-loader babel-preset-es2015 babel-polyfill babel-runtime babel-plugin-transform-runtime --save-dev

babel-core : package
    Base requirement to start using Babel

babel-loader : package
    Webpack uses loader to use external packages with webpack.  This lets you use webpack and babel together.

babel-preset-es2015 : package
    This is what lets us use es6.  This tells Babel how to turn our es6 code to es5.

babel-polyfill : package
    Even with the above, Babel will not provide a complete ES6 environment.  We have to use babel-polyfill so we can use new built in methods like `map`, `set` and `promise`

babel-runtime : package
    Removes babel specific code that babel uses to do it's thing.  Results in smaller file sizes

babel-plugin-transform-runtime : package
    Actually does the transform at run time.

As you can see, Babel is now made in a way where you actually have to separatley install all the babel functionality you want to use.  It does not come as a single package.  Let's explore modifing ``webpack.config.js`` now.

Configuring webpack.config.js
-----------------------------

Add the following code beneath the ``output`` property in ``webpack.config.js``.

.. code-block:: javascript

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

Webpack only deals with Native JavasScript files.  Thus, if you have something that is not JS, but you want Webpack to handle it, you first use a loader to process those files so webpack can eventually handle it.  The above loader does the following:

test : configuration
    We are saying that this loader should be run on files that look like ``.js`` or ``.jsx``

loader : configuration
    The loader we want to use to process the matched files.  In this case we are using babel.

include : configuration
    Where to look for these files.

query : configuration
    Additional things we want to run with the loader.  They have to work with the loader - can't just be anything.

With that setup, lets see what we have to do to run this.

writing es6 code
-----------------

At this point, everythig will just work.  All you have to do is run your ``gulp start`` command.  You can also test out some ES6 code and watch it work.

So for example, if you write this:

.. code-block:: javascript

    f => console.log ('this is ES6');

Babel will transpile and webpack will deliver this:

.. code-block:: bash

    function (f) {return console.log('this is ES6');
