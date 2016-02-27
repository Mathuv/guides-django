******
Part 7
******

Currently we have created two tasks - ``css`` and ``browsersync``.  Both of these tasks are development based tasks.  I deem these as development tasks because ``browsersync`` does not actually output a JS file, it keeps the bundled JS file in memory.  ``css`` does output a file, but that file is not ``minified`` and we don't run ``uncss`` on  it.  This means that we are going to have to create two other tasks that actually do these things.  Lets go about doing that, starting with css.

* Requirements for a new production css task
* Create a new production css task
* Configure our production css task
* Add css-prod to gulpfile.js
* Run production css task

You will notice that the ``p_07`` directory only contains the ``tools`` and ``gulpfile.js``.  This is because these are the only files changed.  This is me going in a new direction where, instead of copying over the entire project, I am only providing the files changed.  I feel this will be easier to follow.  Yes, I need to go back and refactor this series, but the code is still good in other directories.

Requirements for a new production task
--------------------------------------

As I mentioned, we need to ``minify`` and ``uncss`` our css in order to get it ready for production.  To do this we need to install a few things:

.. code-block:: bash

    npm install gulp-clean-css gulp-uncss gulp-rename --save-dev

The packages will do the following:

gulp-clean-css : gulp package
    Minifies our CSS

gulp-uncss : gulp package
    Removes unused css from our css package

gulp-rename : gulp package
    Allows us to Rename files.  In this task, we will rename our css file and add a ``min`` suffix.

Create a new production css task
--------------------------------

The first thing we want to do is create a new file in ``tools/tasks`` called ``css-prod.js``.  I like to move toward verbose at times and with the names of these files, I want them to be easy.  So let's actually change the name of our ``css`` file task to ``css-dev.js``.  We should have something that looks like this now:

.. code-block:: bash

    └── tools
        └── tasks
            └── browsersync.js
            └── css-dev.js
            └── css-prod.js

Cool.  Before we go any futher, since we changed the name of our original ``css`` file, we should also modify the name of the task itself.  Go inside the ``css-dev.js`` file and change the name of the the task from ``css`` to ``css-dev``.  Since we changed this inside of our ``task`` we also need to update our ``gulpfile.js`` so it knows that we changed the name of ``css``.  Update the ``tasks`` variable to look like this:

.. code-block:: bash

    var tasks = [
        'css-dev',
        'browsersync',
    ];

Cool.  Let's move on to creating our production css task.

Configure our production css task
---------------------------------

This task is going to look very similar to our ``css-dev`` task.

.. code-block:: javascript

    // -------------------------------------
    //   Task: prod css
    // -------------------------------------
    module.exports = function () {
        gulp.task('css-prod', function() {
            return gulp.src("./src/server/static/stylus/index.styl")
                .pipe(sourcemaps.init())
                .pipe(stylus({
                    'include css': true
                }))
                .pipe(autoprefixer())
                .pipe(csslint())
                .pipe(uncss({
                    html: [
                        './src/server/templates/base.html',
                    ]
                }))
                .pipe(cleanCSS())
                .pipe(sourcemaps.write())
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest("./build/css"))
        });
    }


All we are doing in the above is adding an extra step where we ```uncss`` our code and then we push this build to ``build/css``.  We then minify it and send that to ``build/css`` also.  I also want to make a special callout and note that if you choose to use stylus, you need to turn the ``'include css'`` setting to true.  This lets you include, or import stylus files.  Also take note that while I have not included them in the above, you will also need to ``require`` those three packages that we installed at the beginning of this chapter.


Add css-prod to gulpfile.js
---------------------------

Let's tell ``gulpfile.js`` about your new task:

.. code-block:: bash

    var tasks = [
        'css-dev',
        'css-prod',
        'browsersync',
    ];

Run production css task
-----------------------

Lets run the above task.  Now, if you want to see it in all it's glory, delete the ``css`` directory in build.  This way we can see what ``css-prod`` generates.  You should not have a ``build/css/index.min.css`` file and everything inside of it should be minified.

Lets take this a step further and make our production build a little easier.

Create a ``build`` task
-----------------------

Inside of ``gulpfile.js`` add the following code:

.. code-block:: bash

    gulp.task('build', ['css-prod'], function () {});

All we have done is created one of our flow tasks - ``build``.  We are going to have a few tasks that will need to be run to get our code ready for production.  Thus, we create a ``build`` task which will be used to run all of them.

That's the end of this section, our next section will outline the process for creating a task that bundles our production ready JS code.
