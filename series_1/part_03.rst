******
Part 3
******

In our previous section, we explored setting up a virtualenvironment and a Django project in your Vagrant machine.  Here we will setup Postgres as our Database.

This step involves

* Installing Linux and Django Postgres Dependencies
* Create our Postgres Server
* Configure Django to work with Postgres
* Initial Migration and CreateSuperUser
* Turn on Django's dev server

Installing Linux and Django Postgres Dependencies
-------------------------------------------------

Before we can actually use Postgres, we need to install some Linux packages.

.. code-block:: bash

    sudo apt-get install -y postgresql postgresql-contrib python-dev libpq-dev

The above packages do the following things:

postgresql : package
    Installs the core postgres database server

postgresql-contrib : package
    Includes additional packages that are not included in the core postgres package

python-dev : package
    Python header files are included in this package, among other modules

libpq-dev : package
    Language and headers for C language front-end development


we only have one thing to install and that is ``psycopg2``.  Run the following command:

.. code-block:: bash

    pip install psycopg2


Create our Postgres Database
----------------------------

Generally speaking, this is a solid way to create new postgres users and databases:

.. code-block:: bash

    sudo -i -u postgres

    psql

    create role vagrant with login superuser password 'vagrant';

    create role dev with login superuser password 'dev';

    create database myproject with owner dev;

    \q

    exit

Configure Django to Work With Postgres
--------------------------------------

The only configuration we need to do with Django, to make it work with postgres, is to configure the settings file.  Go into ``myproject/server/server/settings.py`` and modify:

.. code-block:: python

    DATABASES = {
        'default': {
            'ENGINE': ' django.db.backends.postgresql',
            'NAME': 'myproject',
            'USER': 'dev',
            'PASSWORD': 'dev',
            'HOST': 'localhost',
            'PORT': '',
        }
    }

That's everything at this point and we can start writing tables:

.. code-block:: bash

    django-admin migrate

We can also take this moment and also create a super user.

.. code-block:: bash

    django-admin createsuperuser

I usually just go for something short for my user and password.  Example: ``User``: dev and ``Password``: 123456.  I used to just make it dev, dev, but recently there is a minimum of 6 characters requirements for the superuser.  I was lazy, but if this bothers you alot, you can just set a short ``min_length`` for the password validator.  Looks something like this:

.. code-block:: python

    'OPTIONS': {
        'min_length': 3,
    }

That is everything.  We can run ``django-admin runserver 0.0.0.0:8000`` and visit the site at http://localhost:8111/.  Great. Let's move onto modifying the project layout.