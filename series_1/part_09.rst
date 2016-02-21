******
Part 9
******

`Wagtail`_ is a great Django CMS built by `Torchbox`_.  I use Wagtail for a lot of my projects which is why I wanted to write a `Cookiecutter` for it.  Wagtail actually has a really great example of `how to add wagtail`_ to your existing projects.  I will be doing something similar in this project, but instead of using the `startproject` template, I will be using a custom Django template that I use as a starting point for my Django projects.

The goal is to illustrate one of the great features of Django Wagtail which is it's fllexibility and ease of use.  In this series, I am going to show you what it would look like to add wagtail to the advanced project layout from `django starter`_.

We will pick up where we left on in **p_09**.  This section is going to cover configuring ``myproject`` to work with Wagtail which means we will change three files:

* settings file
* urls.py file
* requirements/base.txt

requirements/base.txt
---------------------

Lets start by configuring our requirements.  We need to install Wagtail to use it, the same as we install Django.  So we are going to add ``wagtail>=1.3.1`` to our ``requirements/base.txt``.

Before we can actually install Django, we are going to need to install some Linux packages first, specifically, we need: ``libjpeg-dev``, ``libtiff-dev``, ``zlib1g-dev``, ``libfreetype6-dev``. "liblcms2-dev".  These are required to setup PIL on Linux, which allows us to use PILLOW which is a Wagtail dependency.  Run the following to install the above:

.. code-block:: bash

    sudo apt-get install -y libjpeg-dev libtiff-dev zlib1g-dev libfreetype6-dev liblcms2-dev

 We can now run ``pip install -r requirements/base.txt`` which will install Wagtail.


settings file
-------------

We are going to make these changes in ``myproject/base.txt``.

The general idea, is that Wagtail has to be installed, we have to setup which wagtail apps we want to use and the correct wagtail middleware.  I will be covering the settings that I feel are minimum requirements, but for a full list see the `wagtail documentation`_.  Noting this, here are the settings we are updating:

**THIRD_PARTY_APPS**

.. code-block:: python

    # wagtail dependencies
    'compressor',
    'taggit',
    'modelcluster',

    # wagtail
    'wagtail.wagtailcore',
    'wagtail.wagtailadmin',
    'wagtail.wagtaildocs',
    'wagtail.wagtailsnippets',
    'wagtail.wagtailusers',
    'wagtail.wagtailimages',
    'wagtail.wagtailembeds',
    'wagtail.wagtailsearch',
    'wagtail.wagtailsites',
    'wagtail.wagtailredirects',
    'wagtail.wagtailforms',

You are going to add the above to that variable

.. note:: Wagtail itself has dependencies which are compressor, taggit and modelcluster.

      * ``Compressor`` is for rendering Wagtail's admin front end files like css.
      * ``taggit`` allows us to the `taggit`_ django package.
      * ``modelcluster`` is a package developed by torchbox which enables wagtails `preview` feature.

**MIDDLEWARE**

.. code-block:: python

    # Wagtail Middleware
    'wagtail.wagtailcore.middleware.SiteMiddleware',
    'wagtail.wagtailredirects.middleware.RedirectMiddleware',

.. note:: Descriptions of the above middleware can be found at `wagtail documentation`_


**WAGTAIL SPECIFIC VARIABLES**


Now we can add some new variables.  We are going to create a new section at the bottom of our ``common.py`` settings file that looks like this:

.. code-block:: python

    # ------------------------------------------------------------------------------
    # WAGTAIL SETTINGS
    # ------------------------------------------------------------------------------

    WAGTAIL_SITE_NAME = 'myproject'
    WAGTAILADMIN_NOTIFICATION_FROM_EMAIL = True
    TAGGIT_CASE_INSENSITIVE = True


That is everything required for Wagtail settings.


urls.py
-------

Wagtail has some urls that it gives us to use, like it's admin panel, but we can't use them without telling Django about them.


Add the imports

   .. code-block:: python

       # before wagtail

       from django.conf.urls import include, url
       from django.contrib import admin

       # after wagtail (add these below the above)

       from django.http import HttpResponse

       from wagtail.wagtailcore import urls as wagtail_urls
       from wagtail.wagtailadmin import urls as wagtailadmin_urls
       from wagtail.wagtaildocs import urls as wagtaildocs_urls
       from wagtail.wagtailsearch import urls as wagtailsearch_urls

Now we can add the urls

   .. code-block:: python

       # after wagtail

       # www.example.com/django-admin
       url(
           regex=r'^django-admin/',
           view=include(admin.site.urls)),
       # www.example.com/admin
       url(
           regex=r'^admin/',
           view=include(wagtailadmin_urls)),
       # www.example.com/search
       url(
           regex=r'^search/',
           view=include(wagtailsearch_urls)),
       # www.example.com/documents
       url(
           regex=r'^documents/',
           view=include(wagtaildocs_urls)),
       # www.example.com
       url(
           regex=r'',
           view=include(wagtail_urls)),
       # www.example.com/robots.txt
       url(
           regex=r'^robots.txt$',
           view=lambda r: HttpResponse("User-agent: *\nDisallow: /", content_type="text/plain")),

With the above, we have to make migrations

.. code-block:: bash

    django-admin migrate

Now you can start your Django server and you will see the success message.





.. _Part 4: https://github.com/tkjone/django-starters/tree/django-starters-1.9.x/series_1/part_04
.. _Series 1: https://github.com/tkjone/django-starters/tree/django-starters-1.9.x/series_1
.. _git filter branch documentation: https://git-scm.com/docs/git-filter-branch
.. _Wagtail: https://wagtail.io/
.. _Torchbox: https://torchbox.com/
.. _how to add wagtail: http://docs.wagtail.io/en/v1.3.1/advanced_topics/settings.html
.. _django starter: https://github.com/tkjone/django-starter
.. _Vagrant: https://www.vagrantup.com/downloads.html
.. _VirtualBox: https://www.virtualbox.org/
.. _Git: https://git-scm.com/
.. _Cookiecutter: https://cookiecutter.readthedocs.org/en/latest/index.html
.. _localhost:8111: http://localhost:8111
.. _wagtail documentation: http://docs.wagtail.io/en/v1.3.1/advanced_topics/settings.html
.. _taggit: https://github.com/alex/django-taggit
