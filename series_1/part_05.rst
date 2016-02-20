******
Part 5
******

This section is going to review the ``requirements`` file.  For those who come from the Node world, this is the equivalent of ``package.json``.  It is a file that tells us which pip packages are installed for this project and, if done correctly, it will also list the versions of these packages used.  We can also use this file to install all of our dependencies at once which is a huge time saver.

This section is going to be short and will quickly show you:

* How to Create A Requirements File
* How to Organize Your Requirements Files

How to Create A Requirements File
---------------------------------

If you ever want to see which pip packages you have installed, you simply have to run

.. code-block:: bash

    pip freeze

If you are following this tutorial, you should have output that looks like this:

.. code-block:: bash

    Django==1.9.2
    django-environ==0.4.0
    psycopg2==2.6.1
    six==1.10.0
    wheel==0.29.0

What we need is to store this information inside of a file called and located at ``server/requirements.txt``.  You can create this file with this command:

.. code-block:: bash

    pip freeze > requirements.txt

.. note:: I ran the above command inside of ``myproject/server``

Now, the above command actually outputs everything inside of your virtual environment's package store.  This can be an issue, because the packages like ``six`` and ``wheel`` are actually installed by default when you create your virtual environment.  For now, just remove those two.

.. note:: I did find an alternative that seemed like a good idea called `pipreqs`_.  I tested it when I originally wrote this, but I do not believe it is ready for use as I ran into some issues with this tool where it did not record all of the requirements.

.. _pipreqs: https://github.com/bndr/pipreqs

How to Organize Your Requirements Files
---------------------------------------

Just like our settings file, have only a ``requirements.txt`` file is going to lead to problems.  For example, I will have some packages are only used in ``dev`` and not in ``prod``.  Thus, if I were to store all of these in only one fille, development dependencies would be installed in prod and visa-versa.  The solution is to make like our ``settings`` directory and split up requirements.

You will create something that looks like this:

.. code-block:: bash

       ├── myproject
       │   ├── Vagrantfile
       │   └── server
       │       ├── config
       │       ├── manage.py
       │       └── requirements
       │           ├── base.txt
       │           ├── dev.txt
       │           └── prod.txt


The last thing that needs to be done is to add to the top of ``dev.txt`` and ``prod.txt``

.. code-block:: bash

    # Install base requirements first
    -r base.txt

This will tell the file to first install all dependencies in base.txt and then the ones in the current file.




