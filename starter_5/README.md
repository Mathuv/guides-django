# Starter 5

Just like we created the cookiecutter for `starter_4`, we are going to create a cookiecutter for the project layout.  Now, we can keep generating the project layout using the `startproject` command, but we want to develop our own project structure and use `cookiecutter` to generate it.  To start, we are going to turn the project layout created by `startproject` into a cookiecutter.

This is what our `starter_4` cookiecutter produced.

```
django_starter           (repo name)
    ├── Vagrantfile
    ├── src              (project name)
    │   ├── db.sqlite3   (database)
    │   ├── manage.py
    │   └── src
    │       ├── __init__.py
    │       ├── settings.py
    │       ├── urls.py
    │       └── wsgi.py
    └── vagrant
        └── provision.sh
```

There are now two things we need to do:

1.  Make `src` directory a cookiecutter template
2.  Remove the `django startproject <projectname>` line from our provision script

Lets start by copying our `starter_4` cookiecutter and put it into a new directory.  In this case, I am going to call the new cookiecutter repo name `starter_5` and add everything that was in `starter_4` to it.  You should have a directory structure that looks like this:

```
starter_5
│   ├── README.md
│   ├── cookiecutter.json
│   └── {{cookiecutter.repo_name}}
│       ├── Vagrantfile
│       └── vagrant
│           └── provision.sh
```

Lets now add the project that we generated from `starter_4` (the first directory structure in this guide.)  

```
starter_5
│   ├── README.md
│   ├── cookiecutter.json
│   └── {{cookiecutter.repo_name}}
│       ├── Vagrantfile
│       ├── src
│       │   ├── db.sqlite3
│       │   ├── manage.py
│       │   └── src
│       │       ├── __init__.py
│       │       ├── settings.py
│       │       ├── urls.py
│       │       └── wsgi.py
│       └── vagrant
│           └── provision.sh
```

As you can see, the difference is the `src` directory.  Now, we have a cookiecutter template that has a Django template from the start.  This being the case, we no longer have to use Vagrant to create our project layout, so let's go `vagrant/provision.sh` and remove lines 75-77.  They are the ones that look like this:

        # INFO: initialize virtualenvironment
        logit "Create django project layout for ${project_name}"
        django-admin startproject ${project_name}

We could actually use this sructure and still call this a cookiecutter.  The issue is that, what if you want to call your project something other then `src`?  True, so we are going to go through the `src` directory and cookiecutter everything that we may want customize everytime we start a new project.

To begin this process, lets start with the directories labelled `src`.  There are actually two of them.  Now, for me, no matter the project, the `src` subdiretory of `src` has always been confusing.  Even that sentence is confusing.  It doesn't tell me that much about what is inside of this directory.  That being the case, we are going to change it to `config`.

```
├── src
│     ├── db.sqlite3
│     ├── manage.py
│     └── config          (changed from src)
│       ├── __init__.py
│       ├── settings.py
│       ├── urls.py
│       └── wsgi.py
```

However we still have a problem.  When we run `startproject` it give us a repo and a project within that.  In our cookiecutter, we already have the repo and we are defining our own project.  This means that the `config` directory and the `manage.py` file should be a directory level higher.  Lets move then so they look like this:

```
├── starter_5
│   ├── README.md
│   ├── cookiecutter.json
│   └── {{cookiecutter.repo_name}}
│       ├── Vagrantfile
│       ├── config
│       │   ├── __init__.py
│       │   ├── settings.py
│       │   ├── urls.py
│       │   └── wsgi.py
│       ├── manage.py
│       ├── vagrant
│       │   └── provision.sh
│       └── src
```

Now that is complete, here are the things you will need to change to successfully refactor this project layout into a cookiecutter:

1.  Update src/manage.py

        # before
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "src.settings")

        # after
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "{{ cookiecutter.django_default_settings }}")

2.  Update cookiecutter.json to include this question

        "django_default_settings": "config.settings",

    > **Discussion:**  Now, for steps 1 and 2, we could have just set it to `config.settings`, which, in this case, would be the equivalent of `src.settings`.  The reason we don't do this is because I realize that there may be a time when `config.settings` is not the location of my settings file.  In this case, I would have to go to `settings.py` and manually change it.  I never want to have to do this.  This being the case, it makes more sense to plan ahead and realize that this is something that would be easier to manage from my cookiecutter.json file. 

3. Update src/config/urls.py

        # -*- coding: utf-8 -*-
        """{{ cookiecutter.repo_name }} URL Configuration

        https://docs.djangoproject.com/en/1.8/topics/http/urls/

        """

    > **Discussion:**  All we did in this change is remove the helpful, but verbose docstring that comes with the `startproject` command.  Thus, we made it so that our repo-name will be added to this file and everyone who uses this files knows that it is a URL config for this project.  We then add a link to the docuentation for the URLs.  This is a cleaner way of directing other developers to helpful resources and keeps our file leaner.  Now, the argument against my logic is that the docstrings are there to provide developers with quick and easy access to documentation and docstrings are also used to generate documentation through other tools like Sphinx.  My counter to this is still that it makes the source code file messy.  Further, for my projects I prefer to write documentation outside of my source code.  For more information, please refer to PEP resources.
    
4. Update src/config/wsgi.py

        """
        WSGI config for {{ cookiecutter.repo_name }} project.

        It exposes the WSGI callable as a module-level variable named ``application``.

        https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
        """

        # ...

        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "{{cookiecutter.django_default_settings}}")

    > **Discussion:**  Again, we cleaned up the docstring and change the default settings value.

5. Update src/config/settings.py

        # 1. before
        Django settings for src project.

        # 1. after
        Django settings for {{ cookiecutter.repo_name }} project.

        # 2. before
        SECRET_KEY = 'k5m#b!eij5fmey94bm1cm@uf5wnugdmw2!&@w3cof#ax+hdh!v'

        # 2. after
        SECRET_KEY = 'CHANGE ME!!!'

        # 3. before
        ROOT_URLCONF = 'src.urls'

        # 3. after
        ROOT_URLCONF = 'config.urls'

        # 4. before
        WSGI_APPLICATION = 'src.wsgi.application'

        # 4. after
        WSGI_APPLICATION = 'config.wsgi.application'

    > **Discussion:**  You may have noted that we have updated the `SECRET_KEY` setting.  Now, yours will not look like mine because it is a randomly generated key built by `startproject` command.  For the time being, each new project will have a `SECRET_KEY` with the value `CHANGE ME!!!`.  This serves as a reminder and will only be used in development.  For production, this is changed.  Even still, I am going to show another way of changing this in the future.  

6.  Lastly, lets make the `src` directory customizable by renaming it to `{{cookiecutter.project_name}}`.  In the end, our cookiecutter directory will look like this:

        ├── starter_5
        │   ├── README.md
        │   ├── cookiecutter.json
        │   └── {{cookiecutter.repo_name}}
        │       ├── Vagrantfile
        │       ├── vagrant
        │       │   └── provision.sh
        │       └── {{cookiecutter.project_name}}
        │           ├── config
        │           │   ├── __init__.py
        │           │   ├── settings.py
        │           │   ├── urls.py
        │           │   └── wsgi.py
        │           └── manage.py

Alright.  That should be everything that we need.  We have now created a `cookiecutter` that will provision an environment using vagrant and build a project layout at the same time.  Test it out using the `cookiecutter` CLI tool.

1.  Turn on the vagrant machine

    `vagrant up`
    
2.  Login to the vagrant machine

    `vagrant ssh`

3.  Check out the site at localhost:8111

**GOTCHA:**  If you copied over your project from `starter_4` you may run into some errors when you run `cookiecutter`.  This is because the template you may have taken from `starter_4` has `.pyc` files.  These files trip up cookiecutter.  All you have to do is delete those file, which are all located in the `config` directory.  I want to note now that `.pyc` files are note a bad thing, they actually help speed up the execution of your Django app when you `turn it on` so to speak.  Having said this, it is totally fine to delete them.  Some developers will even tell Python to not create `.pyc` file while they are developing.  More on this later.    

**GOTCHA 2:** In the vein of the above `GOTCHA` note, I recommend adding the following lines to your gitignore.  It is important to not commit the `.pyc` files to Git.  Your computer will not blow up, but it can create some very interesting errors as you build and collaborate on Python projects.  

```
# python
*.py[cod]
*.pyc
__pycache__
```

