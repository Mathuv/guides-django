******
PART 1
******

Welcome to the first of an 11 part series focusing on setting up a Django development environment.  This part of the series is going to focus on setting up a virtual machine for for your Project.

For those that do now know, A Virtual Machine (VM) is software that allows you to run oher operating systems on your computer in a separate window.  For example, your main machine is OSX, but you need to use Linux.  You can create a Virtual Machine and install Linux on it.

Developers like to use VM's because they allow us to simulate production environments, save time when on boarding new developers and ensure consistency between environments. While VM's are super useful, they can be tricky to setup.  This is where Vagrant comes in.  Vagrant allows us to easily configure and manage our VM's.

In order to use Vagrant we will have to install both Vagrant and Virtualbox.  Go to each one of the following sites and follow the install instructions.

* `Vagrant`_
* `Virtualbox`_
* `Git`_

Project Structure
-----------------

For this series we are going to be super creative and call this project ``myproject``.  You will start by creating a directory structure that looks like this:

.. code-block:: bash

    myproject
        ├── .gitignore
        ├── Vagrantfile


Sometimes, I will refer to ``myproject`` as the ``project root`` or just ``root``.  This refers to all files and folder directly undeneath ``myproject``.  With this layout created we can start populating our files.


.gitignore
----------

Add the following to your ``.gitignore``

.. code-block:: ruby

    # sqlite3
    /myproject/db.sqlite3

    # virtual environments
    /.vagrant

The above is telling git to not version control the sqlite database or the vagrant machine.  We never want to track these within git.

If you like, I recommend you initialize this repository with Git so you can start Version Controlling your project.  I use Git, but if you feel like using an alternative like `Mercurial`_, be my guest.

With Git, initialize ``myproject`` by making sure your in your projects root directory and run:

.. code-block:: bash

    git init

    git add -A

    git commit -m "Initial Commit"

Vagrantfile
-----------

Now we are going to tell vagrant how we want to configure our virtual machine.  You can look inside of **part_01** to see what the complete file looks like.  I am going explain the what each of the lines means here:

.. code-block:: ruby

    config.vm.box = "ubuntu/trusty64"

The above is short hand.  In the world of Vagrant, there are predefined Vagrant boxes and this little shorthand tells Vagrant where to find the above box.  You can think of a box as an image of an operating system.  This is a plain old Ubuntu 14.04 box.

.. code-block:: ruby

    config.vm.network "forwarded_port", guest: 8000, host: 8111,
        auto_correct: true

We are going to open up port 8000 on our Vagrant machine and then we are saying that we can access that port our local machines by hitting port 8111.  The ``auto_correct`` setting tells vagrant to automatically choose another open port if 8000 / 8111 are already being used.  It's a nice feature.

.. code-block:: ruby

    config.vm.synced_folder ".", "/home/vagrant/myproject"

Vagrant has no idea about this project.  The ``"."`` means that we are saying we want the files and folder in ``myproject``'s' ``root`` directory to be available on our vagrant machine.  The ``"/home/vagrant/myproject"`` is us telling vagrant that all those files and folders we gave you access to, yeah, we want you to create a directory called ``myproject`` at the specified path.

.. code-block:: ruby

    config.ssh.forward_agent = true

This is us telling our local machine to share it's ssh keys with our Vagrant machine.  Now, sharing your SSH keys is normally not good.  However, this is strictly a development environment.  Nothing more...it's okay.

.. code-block:: ruby

    vb.memory = 2028
    vb.cpus = 2

These are some helper functions defined by Vagrant.  They allow us to tell the virtual machine how much RAM and CPU's they have access too.  Depending on what you are running on the VM, you may need to bump this up. 2GB is usually enough for most things.  Now we can actually run our vagrant machine and see if everything worked:

Initialize Vagrant Box
----------------------

Make sure you are inside of myproject root directory and run the following command:

.. code-block:: bash

    vagrant up

If this is your first time runnin this command with this virtual box it may take a while.  Once it finishes, you can login to your virtual machine

.. code-block:: bash

    vagrant ssh



.. _`Vagrant`: https://www.vagrantup.com/downloads.html
.. _`Virtualbox`: https://www.virtualbox.org/
.. _`Git`: https://git-scm.com/
.. _`Mercurial`: https://www.mercurial-scm.org/