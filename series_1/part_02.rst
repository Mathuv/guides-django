******
Part 2
******

Part 1 showed us how to setup a vagrant environment.  This section is going to outline the setup of a Django environment.

At the point, we want to be inside of our vagrant machine.  So if you are not, ``vagrant ssh`` into your vagrant machine.  What we have right now is a relatively empty Ubuntu setup.  The first thing we want to do is update and upgrade our environment.

.. code-block:: bash

    sudo apt-get update

    sudo apt-get upgrade

Now that our housekeeping is finished, we can start setting up Django.  There are `a few different ways to setup your Django environment`_.  This guide is going to opt to install Django within a virtualenvironment using pip.  Thus, we will go through the following steps:

* Install OS dependencies to run Django
* Install and configure virtualenvironment
* Install project dependencies
* Configure environment variables

.. epigraph::

   Some people may question the need for a virtualenvironment within a VM, especially one that is itself a big virtual environment.  No matter what, our project is going to have specific dependencies.  We have to be in control of this or we will kick ourselves in the future.


Install OS dependencies
-----------------------

To start, we are going to need ``pip``s which is python's package manager. Prior to Python 3.4, pip required a separate install.  With Python 3.4, it comes built in.  Fun fact though, Ubuntu 3.4, which comes with Python 3 pre installed, does not actually come bundled with pip.  This means we have to install it separatley.


.. code-block:: bash

    sudo apt-get install -y python-pip

The `difference between the two`_ is that pip will use Python 2.7, on this verions of Ubuntu that is, and pip3 will use Python 3.

With this installed, we can now setup our virtual environment


Install and configure virtualenvironment
----------------------------------------

We need to install virtualenvwrapper:

.. code-block:: bash

    sudo pip install virtualenvwrapper

Before we can use virtualenvwrapper we have to configure our linux startup file ``.profile``.  To edit this file make sure you're inside your virtual machines home directory.  We will edit ``.profile`` with vim.

.. code-block:: bash

    vim .profile

use the ``shift + g`` to jump to the bottom of this file and add the following lines

.. code-block:: shell

    # virtualenvwrapper configuration
    export WORKON_HOME=/home/vagrant/.virtualenvs
    source /usr/local/bin/virtualenvwrapper.sh

``escape`` and ``:wq`` to quit and safe ``.profile``.  To use these changes, you will need to reload this ``.profile``.

.. code-block:: bash

    source .profile

Lets use virtualenvwrapper to create a virtualenvironment.  I name mine after the name of my repo.  In this case, the repo is ``myproject``

.. code-block:: bash

    mkvirtualenv --python=/usr/bin/python3 myproject

With this command we are specifying that we want to create a virtual environment that uses Python 3.  Now we have a virtualenvironment and we are logged into it.


Install project dependencies
----------------------------

At this point, we only have one django dependency to install - Django.

.. code-block:: bash

    pip install django

We now have access to Django and with that with have acess to Django's CLI utility commands.  Lets use ``startproject``, which is Django scaffolding command, like yeoman, or cookiecutter.  We will run this command to create a basic Django project layout.  Make sure you are in your ``myproject`` directory.

.. code-block:: bash

    django-admin startproject server

You now have a directory called ``server`` inside of ``myproject`` that looks like this:

.. code-block:: bash

    ├── Vagrantfile
    └── server
        ├── manage.py
        └── server
            ├── __init__.py
            ├── settings.py
            ├── urls.py
            └── wsgi.py

We could have named the django project anything.  However, I chose ``server`` because this project layout we are building is going to set itself up to be able to use modern front end frameworks like React, Angular or Ember.  By naming our project ``server`` we clearly define, from the beginning, the difference between Django and our Front end.  This will help to organize your code and make it easy for front end and back end developers to understand their concerns.

I want to take this moment to review some additional setup features that make working with Django even better.

Configure environment variables
-------------------------------

We are going to set some environment variables inside of our ``.bashrc`` startup file.  Access with vim the same way we did with ``.profile`` and add the following files to the end.

.. code-block:: bash

    export PYTHONPATH="$PYTHONPATH:/home/vagrant/myproject/server"
    export DJANGO_SETTINGS_MODULE="config.settings.dev"
    export PYTHONDONTWRITEBYTECODE=1

The ``PYTHONPATH`` tells python where to find Python modules.  It is important to understand this, so I recommend reading about it and ``DJANGO_SETTINGS_MODULE`` tells django which settings file to use.  The combination of the above means we can replace ``python manage.py`` with ``django-admin``.  This also allows us to access Django packages and use in other applications.

``PYTHONDONTWRITEBYTECODE`` is us telling python that we do not want it to generate .pyc files.  This is helpful to avoid strange little problems in the future.

That brings us to the end of setting up our Django project inside of our VM.



.. _a few different ways to setup your Django environment:  https://www.digitalocean.com/community/tutorials/how-to-install-the-django-web-framework-on-ubuntu-14-04
.. _difference between the two: https://docs.python.org/3.4/installing/
