******
Part 7
******

This section will review setting up a Javascript testing environment.  For this we are going to use tape and webpack.

* Test requirements
* Configure ``tools.configs.js``
* Create a new task
* Configure gulpfile.js
* Configure new task
* Using test.js
* Write a simple test

testing requirements
--------------------

Lets start by installing the requirements

.. code-block:: bash

    npm install tape faucet --save-dev

The above do the following things:

tape : Test Framework
    Simple, flexible testing framework

faucet : Output
    Prettier tap output

There are a lot of different setups for testing your JS.  Some popular combinations include Karama + Mocha + Chai, Karma + Tape and the list really does go on.  Why does this setup seem so light?  The things is, as many have already said, lets keep it simple.  Our goal is to be able to easily write tests in a simple, understandable way.  This is where tape comes in.  It lets us test our code.  What makes it really special is that if we want to test for the browser, it also let's us do this because it outputs with ``console.logs``.  Remember, this is a base setup, really does everything you need.  I suggest starting here because there is a big world of testing tools and before you go overcomplicating your setup, you should set a baseline.

In addition to the packages, we also need a place to store our tests.  Lets create a ``tests`` directory in our ``myproject`` root directory.  It should now look like this:

.. code-block:: bash

    └── myproject
            └── docs
            └── logs
            └── src
            └── tools
            └── tests
                └── js

Tests is where we are going to store all of our unit tests.  Let's also add a file in there so we have something to test with.  Call it ``index.js``

Configure ``tools.configs.js``
------------------------------

We have added a new directory and this directory holds all of our tests, which means we need to update our ``webpack.config.js`` file.  Add the following:

.. code-block:: javascript

    const PATHS = {
      ...
      testIndex: path.resolve(__dirname, '../../tests/js/index.js'),
      tests: path.resolve(__dirname, '../../tests/js/'),
    };

    /*
    ======================================================================
        WEBPACK TEST SETTINGS

        see common for the other settings.
    ======================================================================
    */

    const webpackTest = extend(true, {}, common, {
        // extends common.entry
        entry: [
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
            PATHS.testIndex,
        ],

        // extends common.output
        output: {
            publicPath: 'http://localhost:3000/build/js',
        },

        module: {
            preLoaders: [
                {
                    include: PATHS.tests,
                }
            ],
            loaders: [
                {
                    include: [
                        PATHS.tests,
                        PATHS.styles,
                    ],
                },
            ],
        },

        plugins: [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ]
    });

    module.exports = {
        ...
        test: webpackTest
    }

If you look at the above, it looks very similar to our ``webpackDev`` setup.  This is because we actually want our tests to run in a very similar way.  The only difference is that we want the entry point to be the ``index.js`` files in our ``tests`` directory.  Further, we can even output to the same location because it is stored in memory. This is great because it means we do not have to change our ``script`` tag in ``base.html``.  Now lets go setup our test task.

Create a new task
-----------------

For our testing, we need a task.  Our task, for our purposes, is going to use our ``browsersync`` task as a foundation.  The reason is because it already provides us with the watching, and it also provides us with webpack middleware.  The webpack part is important because we are going to neeed to bundle our JS somehow to feed it to the front end.  Thus, lets create a new file in ``tools/tasks`` called ``test.js``.  ``tasks`` now looks like this:

.. code-block:: bash

    └── tools
        └── tasks
            └── browsersync.js
            └── css-dev.js
            └── css-prod.js
            └── js-test.js
            └── webpack.js

Alright, lets go about configuring ``js-test.js``

Configure new task
------------------

Inside of ``tools/tasks/test.js`` you are pretty much just to going to use the same setup as ``browsersync``.  The difference is you are going to change anything that uses ``wpconfig.dev`` to use ``wpconfig.test``.  That's pretty much it.  Let's take our task for a spin.

Configure ``gulpfile.js``
-------------------------

Now we have to add our new task to our ``gulpfile.js``.  This looks like this:

.. code-block:: javascript

    var tasks = [
        'css-dev',
        'css-prod',
        'webpack',
        'browsersync',
        'js-test',         // NEW
    ];

    // task: test
    gulp.task('test', ['css-dev', 'js-test'], function () {});  // NEW


Using ``test.js``
-----------------

Let's run the following:  ``gulp test``

You should get the same screen as we always get, a nice little ``HMR`` console log and not much else.  See, all you did was setup a way to write the tests.  To see if they actually worked, let's write some tests!

Write a simple test
-------------------

We will run through some TDD to really see thing in action.  Go into your ``tests/js/index.js`` and add the following:

.. code-block:: javascript

    import test from 'tape';
    import clickCounter from '../../src/server/static/js/clickCounter';

    test('Count my clicks', function (t) {
        const click = clickCounter();

        click.click();
        expect.equal(click.click(), 1, 'I counted to 1');
        expect.end();
    });

Now you run ``gulp test``

