******
Part 4
******

Python has a philisophy called the  `Zen of Python`_.  One of my favorite points in Python's Zen is this:

.. epigraph::

   There Should be one - and perferably only one - obvious way to do it.

When you work with Django, you begin to see that much of the framework follows this ideology.  One of the exceptions to this rule: the ``settings.py`` file. It definetley feels like this critical file got left behind.  To be fair though, the above quote says nothing about the *obious way* being the *right way*

Lets look at what you get when you run Django CLI utility command ``startproject``:

.. code-block:: bash

    └── server
        ├── server
        │   ├── __init__.py
        │   ├── settings.py
        │   ├── urls.py
        │   └── wsgi.py
        ├── manage.py


For me, there have always been two problems with this layout.  The first is the ``server/server`` directory.  I find it can be confusing for new developers because it is named exactly the same as it's parent directory. Couple this with the fact that it does not tell us anything about the content of these folders.  Thus, I have taken up the practice of changing it's name to ``config``.  It's more descriptive.

The second problem is the ``settings.py`` file.  For a lot of reasons, this ``settings.py`` is going to cause you a lot of grief in the future.  Fortunatley the Django community has developed an alternative approach [1]_ to structuring the settings file.

My goal in this post is not to explain why this pattern is better.  The Django community has already done an amazing job explaining this [2]_.  Rather, I want to outline how I organize my settings files and align myself to *The One True Way*.

We will start by first explaining the process of splitting our django settings files and then review environment variables.

Multiple Settings Files
=======================

As I mentioned, the first step is to rename ``server/server`` to ``config``.  Within the ``config`` directory we will create a ``settings`` folder.  Inisde of ``settings``, you will also add an ``__init__.py`` file.  You now have a layout that looks like this:

.. code-block:: bash

       └── myproject
           ├── Vagrantfile
           └── server
               ├── config
               │   ├── __init__.py
               │   ├── settings
               │   │   └── __init__.py
               │   ├── settings.py
               │   ├── urls.py
               │   └── wsgi.py
               └── manage.py


What we have done is created a new python package called ``settings`` [3]_.  At this point we can start creating our settings files.  I always start with a minimum of three settings files:

+----------------+----------------------------------------------------+
| Settings Files | Description                                        |
+================+====================================================+
| ``base.py``    | This is where all the common Django settings go.   |
+----------------+----------------------------------------------------+
| ``dev.py``     | All of your development specific settings go here. |
+----------------+----------------------------------------------------+
| ``prod.py``    | Yep, production specific settings here.            |
+----------------+----------------------------------------------------+

Based on this I go inside of my ``settings`` folder and add those three files.  At this point you have successfully split your settings files.  You went from this:

.. code-block:: bash

    └── server
        ├── server
        │   ├── __init__.py
        │   ├── settings.py
        │   ├── urls.py
        │   └── wsgi.py
        ├── manage.py


To a structure that looks like this:

.. code-block:: bash

       └── myproject
           ├── Vagrantfile
           └── server
               ├── config
               │   ├── __init__.py
               │   ├── settings
               │   │   ├── __init__.py
               │   │   ├── base.py
               │   │   ├── dev.py
               │   │   └── prod.py
               │   ├── settings.py
               │   ├── urls.py
               │   └── wsgi.py
               └── manage.py

At this point you can copy everything inside of ``settings.py`` and paste it into ``base.py``.  You can also delete your ``settings.py`` file.

If you were to try to run this new setup inside of your Django project it would fail.  This is because your project is no longer pointing to any settings file.  Let's quickly fix this by replacing all lines that look like ``server.settings`` with ``config.settings.dev``

.. hint:: You need to modify three files:  ``wsgi.py``, ``manage.py`` and ``settings/base.py``.  The third file requires you change the following settings variables: ``WSGI_APPLICATION`` and ``ROOT_URLCONF``.  In addition, if you want to use ``django-admin`` you have to update your ``.bashrc`` file so ``DJANGO_SETTINGS_MODULE`` reads

.. code-block:: bash

    export DJANGO_SETTINGS_MODULE="config.settings.dev"



Environment Variables
---------------------

Environment Variables is an approach that was popularized by `12 Factor App`_. When it comes to your apps configuration settings, 12 Factor wants this:

.. epigraph::

   ...strict separation of config from code. Config varies substantially across deploys, code does not.

In other words, don't do this when your in development:

.. code-block:: python

    DEBUG = True;

And then when you go into production change it to this:

.. code-block:: python

    DEBUG = False;

Do this...always:

.. code-block:: python

    DEBUG = env.bool("DJANGO_DEBUG", default=True)

With the above, I never have to change this line of code.  This is what *12 Factor* means when it says *config varies...code does not*.  In this case, *config* means the value we give to ``DJANGO_DEBUG``.  Lucky for us, the Django community has made it easy to achieve this.

I recommend using `Django Environ`_ to make achieving *12 Factor* easier [4]_.  In order to use, *django-environ*, we have to first install it with pip.

.. code-block:: bash

    pip install django-environ

We start by going into our ``base.py`` and add a ``ROOT_DIR``, ``APPS_DIR`` and ``env`` variable.  They look like this:

.. code-block:: python

    import environ

    ROOT_DIR = environ.Path(__file__) - 4  # (/a/b/myfile.py - 3 = /)
    APPS_DIR = ROOT_DIR.path('server')


    env = environ.Env()

ROOT_DIR is the path to the root of your project.  The fourth line, ``env``, is a class that lets us define variables and their default values.  Without going over everything, because you can read through the code in this cookiecutter, here are some common ways to set values with *Django Environ*.

Database connection string

.. code-block:: python

    env.db("DATABASE_URL", default="postgres://dev:dev-password@localhost/myproject")

Path to your static files

.. code-block:: python

    str(APPS_DIR.path('static'))


Build a general variable

.. code-block:: python

    SECRET_KEY = env("DJANGO_SECRET_KEY", default='CHANGEME!!!')


Which Settings Go In Which Settings File?
-----------------------------------------

I am actually going to leave choosing of which settings go where up to you.  If you get confused, take a look at my setup in **p_04**.  You will begin to see that the rule of thumb is this:  If it can be shared in development and production, it goes in ``base.py``.  However, if it is something only used in ``development`` or ``production`` it should only go into it's respective file.

For example, I use `Django Nose`_ to test my python code.  I am never going to install this on production, so it goes into ``dev.py``.  There are exceptions to this rule, but generally speaking this applies well across the board.

At this point you should have a good understanding of how to split settings files and what the environment variables are doing.  I did not review how to read the environment variables yet, but I will add this in an update.

.. [1] `Multiple Settings Files`_ starts at slide 65.
.. [2] There are a lot of article on this, but some of the best ones are

    * `The Best and Worst of Django`_
    * `Django Stop Writing Settings Files`_
    * `Secrets in the Environment`_
    * `Perfeect Django Settings Files`_
.. [3] The ``__init__.py`` file is what turns directory into a package.
.. [4] Note that you have to ``pip install django-environ``.

.. _Zen of Python: https://www.python.org/dev/peps/pep-0020/
.. _Multiple Settings Files: https://speakerdeck.com/jacobian/the-best-and-worst-of-django?slide=81
.. _`The Best and Worst of Django`: https://speakerdeck.com/jacobian/the-best-and-worst-of-django?slide=81
.. _`Django Stop Writing Settings Files`: http://bruno.im/2013/may/18/django-stop-writing-settings-files/
.. _`Secrets in the Environment`: http://heldercorreia.com/blog/secrets-in-the-environment#id6
.. _`Perfeect Django Settings Files`: https://www.rdegges.com/2011/the-perfect-django-settings-file/
.. _12 Factor App: http://12factor.net/config
.. _Django Environ: https://github.com/joke2k/django-environ
.. _Django Nose: https://github.com/django-nose/django-nose

