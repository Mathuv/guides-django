******
Part 8
******

We are now going to cover one of my favorite things in the world: documentation.  The glory of documentation is found in the fact that it will save you and your colleagues so much time.  Not spending time writing good documentation for your project is the equivalent of you punching future you, and all of future you's developer friends, in the dick.  Be a good human and document your shit!

To make this process easier, lets divide this into two sections:

* Licenses
* Documentation Structure

Licenses
--------

This part is easy.  Give your project with a License.  You want your code to be open and free, you have to, legally, tell us this is the case.  Strap on a License and your good.  If you do not provide a License, this can be see, in a vague way, as you telling the world not to touch or use your software.  With sites like `Choose a License`_ it's an easy process, but if you don't want to go there, here are the four main licenses:

MIT : license
    "A short, permissive software license. Basically, you can do whatever you want as long as you include the original copyright and license notice in any copy of the software/source.  There are many variations of this license in use."

Apache : license
    "You can do what you like with the software, as long as you include the required notices. This permissive license contains a patent license from the contributors of the code."

GPL : license
    "You may copy, distribute and modify the software as long as you track changes/dates in source files. Any modifications to or software including (via compiler) GPL-licensed code must also be made available under the GPL along with build & install instructions."

No License : license
    If there is no license, or if your code has a simple ``copywrite`` statement, it is taken to mean you are not allowing anyone to use your code.

Still kinda vague?  Check out other big projects on Github that you respect and see what they do.

Documentation Structure
-----------------------

Your documentation takes two forms - ``explanatory`` and ``configuration``.  Explanatory is any ``rst`` or ``md`` file that explains your project.  The most common, and the minimum required, is a ``README.rst``.

.. note:: If you like ``md``, cool, use that.  However, keep in mind that ``rst`` is the standard in Python.  This is for good reason.  ``rst`` is really good at clearly structuring your written work.  It's easy to read and well supported.  I used to be a huge fan of ``md`` because it seemed like everyone was using it, the documentation is ways sexier (sorry ``rst``, your documentation is hideous) and it seemed cleaner.  This was me not understanding how to use ``rst``.  Further, I also had this worry that static site generators like `Hexo`_ would not support ``rst``.  Turns out it does.  But on this note, most every tool you want to use supports it.  So don't let that be a reason not to use ``rst``.

Having said this, lets dive into the explanatory section first.

Explanatory
+++++++++++

We will start by creating a directory to hold all of our documentation.  This directory lives inside of ``myproject`` root directory because this directory is for our front and back end documentation.  We will call it ``docs``.  Inside of this directory, we will create two subdirectories called ``client`` and ``server``.  We will also add a ``README.rst`` to this directory.  You should have something that looks like this:

.. code-block:: bash

    ── myproject
       │   ├── Vagrantfile
       │   ├── docs
       │   │   ├── README.rst
       │   │   ├── client
       │   │   └── server
       │   ├── logs
       │   └── server


That's actually all there is.  How you want to organize this is up to, but for me, to give you an idea, I like to setup my ``docs/README.rst`` to explain a few things about my project to get an idea of how the documentation works.  Go to my ``readme.rst`` to see how I do it.

In addition, we are also going to add some files to our ``myproject`` root so that we can help dev's just starting on our project to get a better idea of what is going on.  Lets add the following files to our root:

* CHANGELOG.rst
* CONTRIUTING.rst
* README.rst

These files are, in order, going to track changes made to the project, how to contribute to the project and a ``README`` which quickly onboard new project dev's

Configuration
+++++++++++++

These are all the files that help everyone write code that alligns with the vision for your project.  Specifically, we have the following files that we are going to add to our project:

* .editorconfig
* .gitattributes
* .pylintrc
* humans.txt

``.editorconfig``, ``humans.txt`` and ``.gitattributes`` are going to be placed in ``myproject`` root and ``.pylintrc`` goes inside of ``myproject/server`` root.  Those are files that are going to explain the some things to tools we use.

That is a good place to start.  No real rules for documentation other then keep it focused and make sure to do it.


.. _Choose a License: http://choosealicense.com/
.. _Hexo: https://hexo.io/

