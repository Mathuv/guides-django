******
Part 5
******

This section is going to add a static assets directory.  Currently, we have templates and we have our app, but we will also need css and js.  Lets go inside of our ``server`` directory, which looks like this right now:

.. code-block:: bash

    └── server
        ├── apps
        ├── config
        ├── requirements
        ├── templates
        └── manage.py

and we are going to add a ``static`` directory so it now looks like this:

.. code-block:: bash

    └── server
        ├── apps
        ├── config
        ├── requirements
        ├── templates
        ├── static       <------- new
        └── manage.py

At this point, we are going to build out our ``static`` directory with a structure as follows:

.. code-block:: bash

    └── static
        └── css
        |    └── index.css
        |
        └──  js
            └── index.js

The goal of this excercise is to provide you a baseline directory structure for your static files.This would not even come close to satisying my needs for a project, but then again , my projects requirements for front end can change quite a bit depending on the frameworks that I use, thus I like to keep it lean.

With this directory in place, lets also add in ``django debug toolbar``.  This has actually been in the project since series 1, but I kept it commented because it will through errors and force me to add these directories a little earlier then I wanted for this guide.

You can uncomment it now, but also remove this block of code from ``config/settings/dev.py``

.. code-block:: python

    # ------------------------------------------------------------------------------
    # STATIC
    # ------------------------------------------------------------------------------

    STATICFILES_DIRS = (
        str(ROOT_DIR.path('assets')),
    )

We already have this setting inside of ``base.py``, so once you remove that line and hit your site again, everything will be as normal, but we also have access to the django debug toolbar.

The basic idea is that your site wide styles would fit into this directory.  How you structure it is up to you.


