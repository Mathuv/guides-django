# Part 10

In this post, we are going to write one last component for our cookiecutter.  There is still one commnad that needs to be run when we begin our project and that is `createsuperuser` which is where we specify the username and the password that we will use when creating ourproject.  There is also the fact that we have setup this project to use Python 2.  Let's change this so we can make use of Python3.  These are just a few manual steps, but it is one more step toward a more pleasent development experience.  

We are going to fix some loose ends.  

* automate `createsuperuser`
* remove Python .pyc file generation
* Python 2 and Python 3 environments
* setup so we can use `django-admin`

### HOUSEKEEPING

We will pick up where we left off with the `Part 9` cookiecutter.  If you are just starting this series, here is a quick way to get a hold of it. 

1.  Clone `django-starter` into a new repo on your local

    `git clone https://github.com/tkjone/django-starters.git <new-directory>`

2.  `cd` into `<new-directory>`

3.  Make the `part_09` template the HEAD
    
    `git filter-branch --subdirectory-filter part_09 HEAD-- --all`

4.  Cleanup your new git repository

    `git gc --aggressive`
    
    `git prune`

5.  Change your git remote settings

    `git remote update origin <your-repository-url-here>`


> **DISCUSSION:**  The above is a nice way of turning a subdirectory into a repository of it's own.  For more info see [git filter-branch documentation](https://git-scm.com/docs/git-filter-branch).  Please also note that `<new-directory>` is me telling you to give the directory a name, it's not the name of the directory.  

# Step-by-Step

In order to automate the `createsuperuser` process we need to create another expect script very similar to what we did for the `set_db.exp` script.  Lets being by creating our file and then we will update it to include the commands we are going to use to create django our superuser account.

`touch vagrant/expects/set_admin.exp`

update this file to read like this:

```
#!/usr/bin/expect -f

set timeout 10

set os_user      [lindex $argv 0]
set repo_name [lindex $argv 1]
set repo_dir     [lindex $argv 2]
set admin_user   [lindex $argv 3]
set admin_email  [lindex $argv 4]
set admin_pass   [lindex $argv 5]

# spawn python $project_dir/manage.py createsuperuser
spawn python ${repo_dir}/manage.py createsuperuser

# If this is left blank, user will be root.  This is because,
# by default, vagrant provisions as the root user.
expect "Username (leave blank to use 'root'):"
send "${admin_user}\r"

# set admin email address
expect "Email address:"
send "${admin_email}\r"

# set admin password
expect "Password:"
send "${admin_pass}\r"

# set admin password
expect "Password (again):"
send "${admin_pass}\r"

# e.g. (django)vagrant@
expect "(${repo_name})$os_user@"

```

> **DISCUSSION:** We are actually using our `db_pass` to create a password for our `createsuperuser` command.  The issue with keeping it as the default dev is that, with Django 1.9 updates, this is too short.  Thus, if you look at the source code in this directory, you will see I updated by `cookiecutter.json` to include an 8 character minimum password.  I updated mind to combine the `repo_name` and the `db_user`.  Thus, min would look like `"db_password": "{{cookiecutter.repo_name}}_{{cookiecutter.db_user}}",`

Now we just need to tell our `provision.sh` script to call the expect script.  We can even add a new section as follows:

```
#-------------------------------------------------------------
# CREATE SUPER USER
#-------------------------------------------------------------
# createsuperuser
logit "creating project superuser"
expect $repo_dir/vagrant/expects/set_admin.exp ${os_user} ${repo_name} ${repo_dir} ${db_user} {{cookiecutter.author_email}} ${db_password}
```

When we run everything, a super user is going to be created automatically with our project.  In the abvoe, I actually made the `user` and `password` for the `superuser` the same as that of the database `user` and `password`.  

The next thing we are going to do is make it so that our project does not generate `.pyc` files.  These are not actually bad, and they help our python project start faster.  The issue comes when we switch branches and it causes issues.  This way, we are saying that there is no need to generate these, inside of development and thus nix any chances of getting into weird situations that can cause us some minor discomforts later.  How do we do this?  Very simply, we can set an environment variable which Python will pick up on.  We can go to our `provision.sh` script and write the following:

`export PYTHONDONTWRITEBYTECODE=1`  

You will add that inside the part of the code that updates our `.bashrc` file.  That section looks like this:

`logit "Configuring .bashrc"`

Greatness.  Now all we have to do is configure our project to allow us to work with both python 2 and python 3.  Now, we are simply going to configure two virtual environments.  The one we have configured now is python 2 so we can build another virtual envrionment on Python 3.

find the line in `provision.sh` that looks like this:

```
mkvirtualenv -r ${django_reqs} ${repo_name}
```

We will add a line underneath it that specifies python 3

```
mkvirtualenv -r ${django_reqs} --python=/usr/bin/python3 ${repo_name}
```

> **DISCUSSION:**  From my research, it appears that you do not need to install `python3-pip`.  The reason is because as of Python 3.4, Python 3 comes bundled with an appropriate version of pip.  All we have to do is a create a virtualenvironment, as we do above, using Python 3 and we will be good to go.  

The above is going to work fine, but I do not really like the fact that this has a hardcoded path to Python 3.  This is not great because based on the system, the system file path could change.  Thus, to avoid a situation where we are trying to use this script on a different system and need to change the path, we will store the path to python 2 and python 3 in variables in the `config` section.

```
# ...
python_2="/usr/bin/python"
python_3="/usr/bin/python3"
```

The one things we need to do is actually distinguish between the two.  Thus, we need to update the virtualenv names to reflects that one is python2 and the other is python 3.  My preference is to update the Python 2 virtualenv because this is not the default one. I am actually just setting this up as a convenience and to illustrate how it would work.  I would probably not worry too much about this for personal projects, but hell, it doesn't hurt to have this.  It might also be nice to verify that our code is Python 2 compatible.

`mkvirtualenv -r ${django_reqs} ${repo_name}2`
`mkvirtualenv -r ${django_reqs} --python=/usr/bin/python3 ${repo_name}3`

Now that we have decided that we want the python 3 environment to be the main one, we have to go the section of our `provision.sh` file where we have to tell the python3 version to activate and then we have to tell the `.bashrc` to activate the python3 version of our virtualenv when we ssh into our vagrant box.

**Update line 109**

`source ${virtualenv_dir}/${repo_name}3/bin/activate`  

**Upate line 119**

`source ${virtualenv_dir}/${repo_name}3/bin/activate`

If you were to run the above code and install something like a postgres database, the install would fail.  This is because Python3 requires additional header files, these are not available in python-dev.  Thus, we have to add something dependencies to our `software` variable inside of our `provision.sh`.  Just add the following line.

`"python3-dev"`

The final thing we are going to do is set our `PYTHONPATH` and `DJANGO_SETTINGS_MODULE` variables.  We do this by setting them in the `provision.sh` file.  We can do this right under the second `create virtualenv` lines:

```
# setup the python path and django_settings_module
logit "Configuring postactivate hook for virtualenv..."
cat << EOF >> ${virtualenv_dir}/postactivate
    # django settings
    export PYTHONPATH="$PYTHONPATH:${repo_dir}"
    export DJANGO_SETTINGS_MODULE="config.settings.dev"
EOF

# remove django_settings_module when user deactivate virtualenv
logit "Configuring postdeactivate hook for virtualenv..."
cat << EOF >> ${virtualenv_dir}/postdeactivate
    # unset project environment variables
    unset DJANGO_SETTINGS_MODULE
EOF
```

> **DISCUSSION:** ADD NOTES ON WHY THE ABOVE IS HAPPENING AND WHAT IT BRINGS TO THE PROJECT

Now there is one other thing I want to note and that is that if you activate the virtualenvironment the way we have been from Parts 1-9, you are note taking full advantage of what virtualenvwrapper does with all of its additional hooks and extra scripts.  For example, in the above we set DJANGO_SETTINGS_MODULE and PYTHONPATH, but if you test these with the script we current have and the method of activating it we are using, they are not set.  Why?  By calling `path/to/virtualenvwrapper/activate` we are essentially activating `virtualenv` in the way that you would when you do not have virtualenvwrapper, which means the `postactivate` script does not run.  Thus, those settings do not get set when we login to the server.  We can fix this by swapping line `132` in our `provision.sh` with the following:

`workon ${repo_dir}3`

Alright.  we should be good to go.  With these changes we can create a new project based on this cookiecutter and then we can run through our start project command.  

1.  Turn on the vagrant machine

    `vagrant up`
    
2.  Login to the vagrant machine

    `vagrant ssh`

4. Turn on the Django dev server
    
    `python manage.py runserver 0.0.0.0:8000`

While your inside of your virtualenvironment, you can actually test to see whether or not your virtualenv is using python 3 by running `python -V`,  You should now see a version number.  For me, at the time of this writing and with Ubuntu 14.04 OS, I get the output `3.4.3`.  You will also be able to login to the admin panel with the user and password set for your database.  


