
******
Part 3
******

This part of the excercise is going to explore actually initializing your new ``HomePage`` class.  This will include.  Please note that there are no code changes in this write up, so there are no examples files.

* migrations
* create a new page
* create a new site

Migrations
----------

All we have to do now is run the following commands:

.. code-block:: bash

    django-admin makemigrations pages

    django-admin migrate

If everything went over without a hitch, you are ready for the next step of creating your site root!

.. note:: If something did go wrong with the above, make sure ``pages`` is in INSTALLED_APPS and make sure that you have imported home in the ``models/__init__.py``.

Create A New Page
-----------------

First we need to turn on our dev server:

.. code-block:: bash

    django-admin runserver 0.0.0.0:8000

Once running, lets go to the root pages within our Wagtail admin:

http://localhost:8111/admin/pages/

You will see a page that has the title ``Welcome to Your New Wagtail Site``.  Click on this page.  What we need to do is go into the ``promote`` tab and change the ``slug`` name.  This page is currently using ``Home``, now, I want to use this for my page, so I am going to change this field to ``default``.  Save this.  Once done, lets go back:

http://localhost:8111/admin/pages/

Now what we want to do is create a new page.  Under the ``Root`` title in the top left corner of the Wagtail admin, you will see a button underneath that says ``add child page`` [1]_.  Click this button.

Once you click this button, you will be taken to the page that lets you modify the page.  Please fill in the ``title`` and the ``body`` sections.  I made mine:

* ``title``: Home Page
* ``body``: Welcome to my Django Wagtail home page

You then need to go to the promote tab and in the field that says ``slug`` type in ``home``.  Great, now that this is done we have created our new page inside of Wagtail.  All that is left to do is to create a new site that uses this page as the root.

create a new site
-----------------

You can go to the ``settings`` menu item in the left panel, then click the ``sites`` sub menu item, or you can go to this link http://localhost:8111/admin/sites/.  For me, I usually just edit the current site that is there.  You will change the settings to be ``localhost``, ``8000`` and ``Home``.  Once done, save your changes.

The idea with the above is that each site has a root page.  This can be any page we choose.  Thus, we are saying that localhost:8000 will take you to our page we just built.  Cool, now all you have to do is go to http://localhost:8111/ and you should see a white page with the text you typed into the body field of your page.

That is the process of creating a new page.

.. [1] If you do not see the ``add child page`` button, that means something with your migrations went wrong.  Check your code and verify that it is correct.