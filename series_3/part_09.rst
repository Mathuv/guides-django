******
Part 9
******

Clean up time.  In a lot of our files we have hardcoded file paths.  I want to spend this section, which could have been done earlier, exploring a best practice.  The goal is to not hardcode our paths and, like our provision scripts, have one file we can go to when we want to change configurations.  We will run through the following:

* Create a general configuration file
* Configure tools.config.js
* Update tasks to use our configuration file
* Update webpack.config.js to support both dev and production settings
* Update gulpfile.js to use our configuration file

Create a general configuration file
-----------------------------------

The file we are going to create goes into our ``tools/configs`` directory and it is called ``tools.config.js``.  Your ``tools`` directory will now look like this:

.. code-block:: bash

    └── tools
        └── configs
            └── .eslintrc
            └── tools.config.js
            └── webpack.config.js

I called this file ``tools.config.js`` because I want it to be known that this file will hold configurations that can apply to all tools that we use (not vagrant tools though).  We are going to store common settings in here.  For example, paths to JS files, CSS files etc.  This helps when you want to have a different directory structure compared to the one in this file, you can still use the build tools outlined.  It also means that when you want to make changes, you can do that in one file.  Let's start configuring it.

Configure tools.config.js
-------------------------

Go into ``tools.config.js`` and add the following:

.. code-block:: javascript

    module.exports = {

    }

You have now said that this module, yep, it can be ``required`` into other JS files.  All it is is a JS object.  So let's start adding some ``key, value`` pairs.  This means you have to add the following to all of them:

.. code-block:: javascript

    const path  = require('path');

    module.exports = {
        server: {
            host: 'localhost',
            port: '8111',
        },

        paths: {
            watch: {
                javascripts: path.resolve(__dirname, '../../src/server/static/**/*.js'),
                styles: path.resolve(__dirname, '../../src/server/static/**/*.styl'),
                html: [
                    path.resolve(__dirname, '../../src/server/templates/**/*.html'),
                ],
                buildCSS: path.resolve(__dirname, '../../build/css/*.css'),
            },

            sources: {
                indexJS:  path.resolve(__dirname, '../../src/server/static/js/index.js'),
                indexCSS: path.resolve(__dirname, '../../src/server/static/stylus/index.styl'),
            },

            dest: {
                js: path.resolve(__dirname, '../../build/js'),
                css: path.resolve(__dirname, '../../build/css'),
            }
        },
    }


As you can see, we are defining some common settings we have used in more then one file.  You make this this as complicated as you like, but for now, lets use this and try to update some of our other configuration files.  Let's review the ``keys`` that I have:

server : key
    No matter what, our projects are going to have a backend server, and it will have specific settings.  The most common ones are ``host`` and ``port``.  Why is this awesome for us?  We are using vagrant.  This means that there can be times when our ``port`` will change because of conflicts.  If we did not have it here, we would have to go to all files that contain this setting and change it manually.

watch : key
    These are paths that we want to watch.  Usually, they will be globs, but really, they are anything that one might want to watch.

sources : key
    These are ``entry`` points for webpack and ``src`` for gulp.  I have chosen ``sources`` because that is the lexicon for gulp.  What if you were using node as your task runner?  You could call this section entries.

dest : key
    Where do the processed files go?

For the above, add whatever you need.

Update tasks to use our configuration file
------------------------------------------

Let's start with some task files.  The common component for all of these is that we have to ``require`` our new ``tools.config.js`` into our tasks, and any other file, that we want to use them in.

.. code-block:: javascript

    const toolConfigs   = require('../configs/tools.config.js');

Obviously, the path is going to change depending on which file you are ``requiring`` this into.  The above path works for our tasks.

**requirements**

We are going to introduce a new requirement here:

.. code-block:: bash

    npm install path --save-dev

**update - css-dev**

.. code-block:: javascript

    gulp.task('css-dev', function() {
        return gulp.src(toolConfigs.paths.sources.indexCSS)
            .pipe(sourcemaps.init())
            .pipe(stylus())
            .pipe(autoprefixer())
            .pipe(csslint())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(toolConfigs.paths.dest.css))
    });

Let's run the above and see if it worked - ``gulp css-dev``.  Great, if that worked, let's do the same for the other tasks.  Remember to run the task to make sure you did it correctly.

**update - css-prod**

.. code-block:: javascript

    return gulp.src(toolConfigs.paths.sources.indexCSS)

    .pipe(uncss({html: toolConfigs.paths.watch.html}))

    .pipe(gulp.dest(toolConfigs.paths.dest.css))

The above are the three lines that you will be changing.  Compare them to your's before you change return gulp.src(toolConfigs.paths.sources.indexCSS)

**update - browsersync**

.. code-block:: javascript

    target: toolConfigs.server.host + ':' + toolConfigs.server.port,

    // compile css
    gulp.watch(toolConfigs.paths.watch.styles, ['css-dev']);
    // inject css into browsersync
    gulp.watch(toolConfigs.paths.watch.buildCSS, function() {
        gulp.src(toolConfigs.paths.watch.buildCSS)
            .pipe(browsersync.stream());
    });

**update - webpack**

This one is a little more complicated.  What I mean by this is there are 1.  different webpack configuration settings and there are also hardocded paths.  We could do a better job of cleaning this up by first configuring our ``webpack.config.js`` to support multiple environments.  Lets do that first.

Update webpack.config.js to support both dev and production settings
--------------------------------------------------------------------

We are going to head over to our ``webpack.config.js`` file.  Let's fix it up a little.  Truly, we wnat to handle this in a similar way to our django settings file.  We are going to go into webpacks configs and split it into three sections: ``common``, ``dev``, ``prod``.  For complete code, check out my ``webpack.config.js``, otherwise, I am going to skim over key sections:

**requirements**

We will be introducing some new requirements, install the following:

.. code-block:: bash

    npm install extend --save-dev

**common**

.. code-block:: javascript

    const path   = require('path');
    const extend = require('extend');

    const common = {
    }

    const webpackDev = {
    }

    const webpackProd = {
    }

    module.exports = {
        dev: webpackDev,
        prod: webpackProd
    }

If you look at a ``webpack.config`` file its just a javascript object.  This means we can split it up and use extend to join the when needed.

common : object
    All settings that appear in dev and prod go here

webpackDev : object
    All dev specific settings.  Want to add to one of the keys in ``common``?  Just add it as a property.

webpackProd : object
    App production specific settings.

module.exports : object
    An object that is returned when we ``require`` this file.

Once you modify the above, we can configure the ``browsersync`` and ``webpack`` tasks.

**browsersync**

.. code-block:: javascript

    const bundler = webpack(wpconfig.dev);

    publicPath: wpconfig.dev.output.publicPath,

Find the above lines in ``browsersync.js`` and modify them.  The difference is ``wpconfig.dev``.

**webpack**

.. code-block:: javascript

    webpack(wpconfig.prod, function(err, stats)

Find the above lines in ``browsersync.js`` and modify them.  The difference is ``wpconfig.prod``.  Now let us go over to our ``gulpfile.js`` and see if it needs anything.

Update gulpfile.js to use our configuration file
------------------------------------------------

Go into ``tools.config.js`` and add the following key, vale pair:

.. code-block:: javascript

    tasksDir: path.resolve(__dirname, '../tasks'),

We can now go into our ``gulpfile.js`` and update our ``taskDir`` as follows:

.. code-block:: javascript

    var tasksDir = toolsConfig.paths.tasksDir;

While we are here, lets change the name of the ``development`` task to ``start``.  There we go.  We have successfully cleaned up our tasks and config files.  Next part - testing!





