******
Part 1
******

This is the first part in the series that shows you how Django, Gulp, Webpack and BrowserSync can work together.  This part of this guide will outline:

* Getting the Project Layout
* Setting up Tools Directory
* Move Vagrant directory
* Installing Node
* Initialize package.json
* Updating the .gitignore
* Install Gulp
* Link StyleSheets and JavaScript
* Add Some JS

A small note.  For this series we are not running node in our VM.  I like to run some development tasks on my local, specifically because they are local tasks, not production.

Getting the Project Layout
--------------------------

I have made changes since series 2 to the project layout, so for this excercise, everyone should do this section.

To quickly get started with the layout we left off with in Series 2, you can run through the following instructions.  Note that you will need to install `cookiecutter`_ before you can do the following instruction set.  The link above will direct you to the installation page.  Further, please run the following commands in the directory where you want this project to live.

cookiecutter `django-wagtail-starter`_ by running the following command

.. code-block:: bash

    cookiecutter https://github.com/tkjone/django-wagtail-starter.git

The above will prompt you to answer some questions.  To make it easier to follow this guide, please answer ``myproject`` to the first question and when you get to the question that asks you about which database to use, choose ``2`` - postgres.

Great.  Now we can move onto setting up the tools directory

Setting up Tools Directory
--------------------------

Our project structure currently looks like this:

.. code-block:: bash

    └── myproject
        ├── docs
        ├── logs
        ├── src
        └── vagrant

We are going to add a new directory called ``tools`` so your structure should now look like this:

.. code-block:: bash

    └── myproject
        ├── docs
        ├── logs
        ├── src
        ├── tools
        └── vagrant

This new directory is what is going to hold all of our front end build automation tools.

Move Vagrant directory
----------------------

Vagrant is a tool that I use in development.  We created a new directory called ``tools`` for this very purpose.  Lets put vagrant into the tools directory.

.. code-block:: bash

    └── tools
        └── vagrant

This change means that we need to reconfigure our ``Vagrantfile`` and ``provision.sh`` file a little:

**Vagrantfile**

.. code-block:: bash

    # before
    config.vm.provision "shell", path: "vagrant/provision.sh",

    # after
    config.vm.provision "shell", path: "tools/vagrant/provision.sh",

**provision.sh**

.. code-block:: bash

    # before
    expect ${repo_dir}/vagrant/expects/set_db.exp ${db_name} ${db_user} ${db_password} ${os_user}

    # after
    expect ${repo_dir}/tools/vagrant/expects/set_db.exp ${db_name} ${db_user} ${db_password} ${os_user}

    # before
    expect ${repo_dir}/vagrant/expects/set_admin.exp ${os_user} ${repo_name} ${repo_dir} ${db_user} admin@gmail.com ${db_password}

    # after
    expect ${repo_dir}/tools/vagrant/expects/set_admin.exp ${os_user} ${repo_name} ${repo_dir} ${db_user} admin@gmail.com ${db_password}


Installing Node
---------------

Node is the JavaScript runtime that allows us to use JavaScript on the server.  We are going to install a version locally.  If you already have Node and are happy with your setup, feel free to skip this step.  If you don't yet have it, here are my recommendations for setting it up.

The first thing to do is install `Node Version Manager`_.  Go to the that link and follow the install instructions...it's under the heading **Install Script**.  Once that is done, you can run these commands:

.. code-block:: bash

    nvm install 4.3.0

    nvm use 4.3.0

To test if that worked, run the following commands

.. code-block:: bash

    node -v

    // returns 4.3.0

    npm -v

    // returns 2.14.12

With Node installed, we can start using it in our project.


Initialize package.json
-----------------------

We are going to create a package.json file in ``myprojects`` root directory.  To do this run the following command:

.. code-block:: bash

    npm init -y

A little more about this command and the ``package.json`` file:  The ``-y`` tells npm to create a ``package.json`` with the default settings.  When this file is in a folder, said folder becomes an npm package.  Now a package actually has a very broad definition in the world of NPM, so don't get too hooked up on that.  Essentially, this file contains information about your project like dependencies to install.  Thus, it is similar to python's ``requirements.txt`` file...except ``package.json`` is can do a lot more.

With this complete, let's install our first npm package: Gulp.

Updating the .gitignore
-----------------------

Lets take a moment and also update our ``.gitignore``.  Update it to include:

.. code-block:: bash

    # static files
    build

The reason we are not committing build is because this directory holds our static assets like css and js.  These are going to cause problems when we are working with other developers, specifically, you will fight with constant merge conflicts.  Further, we are version controlling our css and js files, we do not need to track compiled code.  `Read this`_ to get more information.

Install Gulp
------------

Let's start by installing Gulp globally.

.. code-block:: bash

    sudo npm install gulp -g

We can test it is installed correctly by running

.. code-block:: bash

    gulp -v

    // returns CLI version 3.9.1


Link StyleSheets and JavaScript
-------------------------------

If you take a look at your site as it is, it is very plain.  This is intentional.  Before we start setting up our build tools, let's make sure everything is working properly.  Lets start with the stylesheets:

**stylessheets**

Go into ``src/server/templates/base.html`` and add the following line of code in the ``head`` tag.

.. code-block:: html

    <link rel="stylesheet" href="{% static "css/index.css" %}">

.. note:: If it does not work, make sure you remove the comments at the top of the ``index.css`` file.  They will break your code otherwise.

**javascript**

Add the following to ``src/server/templates/base.html`` just before the end of the ``body`` tag.

.. code-block:: bash

    <script src="{% static "js/index.js" %}"></script>

Folder for Stylus
-----------------

We are going to use stylus for this series.  Thus, to keep things organized, we are going to require a folder for our stylus code.  Make your ``server/static`` directory look like this:

.. code-block:: bash

    └── server
        └── static
            ├── css
            ├── js
            └── stylus
                └── index.styl

Let's go inside of ``index.styl`` and add the following css:

.. code-block:: css

    body {
      background-color: pink;
    }

Add some JS
-----------

We will also setup some simple JS files.  Make your ``static/js`` directory look like this:

.. code-block:: bash

    └── static
        └── js
            └── footer.js
            └── header.js
            └── index.js

And the following code inside of ``footer.js``

.. code-block:: javascript

    console.log('footer');

And the following code inside of ``header.js``

.. code-block:: javascript

    console.log('header');

And the following code inside of ``index.js``

.. code-block:: javascript

    console.log('App Loaded');


Great, that concludes the first part.  Now that everything is installed we can go onto the fun part - automating shit!

.. _series 2: https://github.com/tkjone/guides-django
.. _cookiecutter: https://cookiecutter.readthedocs.org/en/latest/installation.html
.. _django-wagtail-starter: https://github.com/tkjone/django-wagtail-starter
.. _Node Version Manager: https://github.com/creationix/nvm
.. _Read this: http://deploybot.com/guides/building-assets-with-grunt-or-gulp-during-deployment

