******
Part 7
******

This section is going to review testing.  Django actually comes with a decent testing suite, and people can become very particular on how they like to test their apps, so I want to review a very basic testing setup.  We will go over:

* Tools For Testing
* Configuring our Testing Tools

Tools For Testing
-----------------

Django comes with a `test framework`_ out of the box.  I like to add `coverage`_ to the mix for some nice HTML output and I also enjoy `django nose`_ for the helpful extensions it applies to the out-of-the-box Django test framework.  I also use `django debug toolbar`_ to help with debugging from the front end.

In order to use these tools, we have to install them in our virtual environment.  Lets actually use our ``requirements/dev.txt`` to show you how you can install pip dependencies with this file.  Update ``requirements/dev.txt`` to look like this:

.. code-block:: bash

    coverage>=4.0.3
    django-extensions>=1.6.1
    django-nose==1.4.2
    django-debug-toolbar>=1.4

and then you can run this command.

.. code-block:: bash

    pip install -r requirements/dev.txt

I ran the above command inside of ``myproject/server`` directory.  With our tools installed, we can configure our project to use them.

Configuring our Testing Tools
-----------------------------

All of our configurations are done inside of ``server/config/dev.py``.  This is because these tools we are installing, yep, only used in the development environment.  If you look at this file in the example files in **p_07** you will see new sections.  We will review each one.

*DJANGO DEBUG TOOLBAR*

This section cofigures the Django Debug Toolbar.  These are basic settings.  Nothing special here.

Now you should know, that if you enable this section as is, it is going to cause you some problems telling you that it cannot find an ``assets`` directory and a ``static`` directory.  This is fine and these issues are easy to resolve, but to keep this guide flowing smoothly, just keep this section commented out for now.

*TESTING*

This is where we setup and configure ``Nose``.  We set it as the testing framwork we want Django to use and throw it some arguments we always want ``Nose`` to run so we don't have to type them everytime.

with-coverage : setting
    runs coverage.py when we run our tests.

cover-package : setting
    Tell coverage.py which packages to provide output for.

I recommend playing with these settings to see how they work.

That is everything for testing.  The framework is in place.  If you have never done testing before I recommend you read `Test-Driven Development with Python`_.  This book is the best thing you can do for yourself to even start learning Testing and it's free.

*.coveragerc*

This is a file we add to the root of ``myproject/server`` which tells ``coverage.py`` how we want it to behave.




.. _test framework: https://docs.djangoproject.com/en/1.9/topics/testing/
.. _coverage: https://coverage.readthedocs.org/en/coverage-4.0.3/
.. _django nose: https://github.com/django-nose/django-nose
.. _django debug toolbar: https://github.com/django-debug-toolbar/django-debug-toolbar
.. _Test-Driven Development with Python: http://chimera.labs.oreilly.com/books/1234000000754/index.html