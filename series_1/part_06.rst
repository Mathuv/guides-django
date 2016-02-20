*******
Part 06
*******

.. epigraph::

   Knowledge is power

This is something you have likely heard.  To me, Logs are power.  When done correctly, they are an effective debugging tool and yet I have been on many projects where they are not used.  I think one of the biggest barriers to using logs is that they are a little confusing to setup, they are also confusing to use and shit, they can be difficult to read.  Here is a rundown of:

* Where do Logs Live?
* How to Configure Logs


Where do Logs Live?
-------------------

When deciding where logs live, we have to understand that there are going to be logs for our server, our application - both front end and back end and a host of other packages.  This being the case, we do not want to have to go find our logs.  We want them in one location.  For this reason, I like to create a ``logs`` directory in the ``myproject`` root directory.

The thing about the logs files is we do not want to store these in Git.  Theses files can become big, and for development, we do not need to store these.  However, if we just leave this folder empty, Git will not track it.  We need to add a ``.gitignore`` file to ``logs`` to make sure git tracks it.

We can add the following lines to this gitignore:

.. code-block:: bash

    # don't commit files in this dir
    *

    # keep .gitignore files
    !.gitignore

What goes inside of logs will change per project, but I like to divide it into subdirectories that look like this:

.. code-block:: bash

     ── logs
        ├── client
        ├── nginx
        └── server

Each one of the above folders has a ``.gitignore`` like we did for ``logs``.  You do not need all of these subdirectories, especially the ``nginx`` one if you are not using ``nginx``. Once you have set this up, we can start configuring the logs.


How to Configure Logs
---------------------

For Django, logs are setup inside of the ``settings.py`` file.  For us, this file is ``config/base.py``.  I suggest you review the setup that I have in my example folder **p_06** to see what it looks like.  See the follow notes to understand what they are doing:

LOG_DIR : settings variable
    This holds the path to our logs directory.

FORMATTERS: log parameter
    This actually defines what our logs are going to look like when they are outputted.

HANDLERS : log parameter
    We defined three different ones:  ``console``, ``mail_admins``, ``file_error``.  This tells the logs where to go.  ``console`` means we see the error outputed to our console. This means it is temporary.  ``file_error`` logs the error to a file called ``django_error.log`.

LOGGERS : log parameter
     A category that tells the logger what types of messages to report and where.  The most pertinent one for us is ``development`` which will debug everything from level ``DEBUG`` up and send those messaged to the ``console``.




