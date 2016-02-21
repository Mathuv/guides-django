******
Part 1
******

In order to build our front end workflow, we are going to need something to work with.  Thus, I will show you how to build a page in Wagtail in this section.  This section will review:

* our wagtail ``apps`` layout
* creating your first wagtail page
* configuration for splitting models

wagtail apps layout
-------------------

Firstly, since this is Python code, we will be working in the ``server`` directory.  ``server`` currently looks like this:

.. code-block:: bash

    └── server
        ├── config
        ├── requirements
        └── manage.py

We are going to add an ``server/apps`` directory, which is where we will keep all of our Django apps, and structure it as follows.

.. code-block:: bash

    └── server
        └── apps
        |   ├── __init__.py
        |   └── wagtail
        |        ├── __init__.py
        |        └── pages
        |            ├── __init__.py
        |            ├── models
        |            |   ├── __init__.py
        ├── config
        ├── requirements
        ├── templates
        └── manage.py

Here is a breakdown of the above structure:

apps : python module
    All your Django apps in here.

wagtail : python module
    Wagtail is an app that holds all of your custom wagtail code like pages, snippets etc.  Do not put vanilla Django apps in here, those would go directly inside of ``apps``

pages : python module
    This holds all of your wagtail ``page`` models

That is our project layout, let see how we can create a page in wagtail.

Creating Your First Wagtail Page
--------------------------------

Inside of ``server/wagtail/pages/models`` we are going to create our first models file called ``home.py``.  At this point, check out what I have and make your file look like mine.

Once you create your page model, go into ``server/config/settings/base.py`` and add to ``LOCAL_APPS``.

.. code-block:: python

    LOCAL_APPS = (
        'apps.wagtail.pages',
    )

This tells Django about our wagtail pages.  Now, I will explain a little more about splitting modules.


Configuration for splitting models
----------------------------------

As I noted in *wagtail apps layout*, we are going to be splitting our ``models.py`` file into multiple ``.py`` files.  Now, this is a choice I make when working with Wagtail page classes.  I do this because I find the ``models.py`` can quickly become bloated and difficult to maintain.  Here is a visual reminder of what this looks like:

Your normal wagtail pages would look like this:

.. code-block:: bash

    wagtail
        ├── __init__.py
        └── pages
            ├── __init__.py
            └── models.py

In the above, we would have a class called ``HomePage`` inside of ``models.py``.  In contrast, splitting the ``models.py`` file means your layout looks like this:

.. code-block:: bash

    wagtail
        ├── __init__.py
        └── pages
            ├── __init__.py
            └── models
                 ├── __init__.py
                 └── home.py

Thus, have created a ``models`` directory. Deleted ``models.py`` and we have moved the ``HomePage`` class out of ``models.py`` and into the ``home.py`` file.  At this point, we also need to setup our ``__init__.py`` file.

Inside of ``apps/wagtail/pages/models/__init__.py`` add the following line:

.. code-block:: python

    from apps.wagtail.pages.models.home import *

This is us telling Django, or rather, Python, where to find ``home.py``.  For more information about what is happening here, see this footnote [1]_.  The short of it is, if you try to ``makemigrations`` without this line in the file, Django will tell you that there were no changes.  This is because it does not see the ``home.py`` file.

.. note:: Each time you create a new ``.py`` file in the ``models`` package, you should import it in the ``__init__.py``.

With that complete, lets check out how to setup your templates in part 2 to setup your templates.


.. [1] The idea is your are importing modules using ``__init__.py``  Check out these articles for more information:

* `Breaking apart models in Django`_
* `Example of splitting up a views directory`_
* `__init__ explained nicely`_
* `Creating Django Models in a Directory`_



.. _Part 9: https://github.com/tkjone/guides-django/blob/django-starters-1.9.x/series_1/part_09.rst
.. _Series 1: https://github.com/tkjone/guides-django
.. _Getting Started: http://docs.wagtail.io/en/v1.3.1/getting_started/tutorial.html
.. _Demo: https://github.com/torchbox/wagtaildemo
.. _Breaking apart models in Django: http://paltman.com/breaking-apart-models-in-django/
.. _Example of splitting up a views directory: http://djangopatterns.readthedocs.org/en/latest/app_construction/views_as_a_package.html
.. ___init__ explained nicely: http://mikegrouchy.com/blog/2012/05/be-pythonic-__init__py.html
.. _Creating Django Models in a Directory: http://williamsbdev.com/posts/django-models-directory/
