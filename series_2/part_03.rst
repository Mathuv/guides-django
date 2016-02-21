******
Part 2
******

This part is going to review how to setup templates for our wagtail ``HomePage`` class.  To review, your projects ``server`` directory should look like this right now.

.. code-block:: bash

    └── server
        ├── apps
        ├── config
        ├── requirements
        ├── templates
        └── manage.py

I don't like looking into multiple directories to change template files, so I make it so my ``server/templates`` directory is the only one.  Within it, I divide my templates via their app name.  So, for example, I have a ``wagtail`` app, and inside is another section called ``pages``.  Thus, my template structure looks like this

.. code-block:: bash

    └── server
        ├── apps
        ├── config
        ├── requirements
        └── templates
            └── wagtails
            |    └──pages
            |       └── home_page.html
            └── base.html


You can make your templates directory look like mine and populate the HTML files in the same way that I have.

.. note:: ``{% wagtailuserbar %}`` adds a convenient little block in the upper left corner that lets you quickly edit the page if needed.

At this point you have everything you need.  Part 3 will review initializing our ``HomePage`` class.



