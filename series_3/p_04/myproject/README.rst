*********************************
Welcome to myproject
*********************************

This is a Django Wagtail project ready to go.

Requirements
------------

To take full advantage of the project, please make sure you have the following installed on your local machine:

* `vagrant`_
* `virtualbox`_

The links above will take you to these packages installation pages.


Quick Start
-----------

From the ``myproject`` root directory run the following commands:

1.  Turn your VM on

.. code-block:: bash

    vagrant up

.. epigraph::

   This can take some time if it your first time running it.

2. Login to your VM

.. code-block:: bash

    vagrant ssh

3. Turn on your Django dev server

.. code-block:: bash

    django-admin runserver 0.0.0.0:8000

4. Visit your site at http://localhost:8111

.. epigraph::

   Did you have any problems with the above?  Please see the ``Gotchas`` section below.  If everything is okay, please continue to step 5.

5. Go to http://localhost:8111/admin/pages/ and click ``add child page``
6. Populate your new page with the following information

.. code-block:: bash

    title:  Home
    Body: Welcome to your new Wagtail Home Page!

7. Click on the ``promote`` tab and change the slug as follows

.. code-block:: bash

    Slug: HomePage

8.  Go to http://localhost:8111/admin/sites/ and click ``ADD A SITE``
9.  Fill in the fields as follows and the click ``SAVE``

.. code-block:: bash

    Hostname: localhost
    Port: 8000
    Root Page: <Choose HomePage>

10. Visit http://localhost:8111 to see that your new homepage has changed.

Congratulations!  You now have base Wagtail site configured and ready to go.  For more information about this project, please see the ``docs`` directory.


Gotchas
-------

.. epigraph::

   I was able to start my VM, SSH into it and start my dev server, but when I tried to visit http://localhost:8111 it did not seem to work.

The most common reason for this is that the port is not correct.  Check to see that you are supposed to be connecting on port ``8111``.  To do this, open a new terminal window, ``cd`` into the ``myproject`` directory and run ``vagrant port``.  This will show you two lines.  The second line will tell you which port to connect to.


.. _`Vagrant`: https://www.vagrantup.com/downloads.html
.. _`Virtualbox`: https://www.virtualbox.org/




