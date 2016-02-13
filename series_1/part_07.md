# Part 7

Django, like many other modern frameworks, provides you with a variety of Databases to choose from.  Best practices suggests using Postgres, however, you are free to choose something that works for you.  This section of the series is going to review how to setup Django to use postgres and configure it in a 12 Factor App compliant way.  

### HOUSEKEEPING

We will pick up where we left off with the `Part 6` cookiecutter.  If you are just starting this series, here is a quick way to get a hold of it. 

1.  Clone `django-starter` into a new repo on your local

    `git clone https://github.com/tkjone/django-starters.git <new-directory>`

2.  `cd` into `<new-directory>`

3.  Make the `part_06` template the HEAD
    
    `git filter-branch --subdirectory-filter part_06 HEAD-- --all`

4.  Cleanup your new git repository

    `git gc --aggressive`
    
    `git prune`

5.  Change your git remote settings

    `git remote update origin <your-repository-url-here>`


> **DISCUSSION:**  The above is a nice way of turning a subdirectory into a repository of it's own.  For more info see [git filter-branch documentation](https://git-scm.com/docs/git-filter-branch).  Please also note that `<new-directory>` is me telling you to give the directory a name, it's not the name of the directory.  

### BACKGROUND

This project has thusfar been built with the 12 Factor App methodologies in mind.  This is an extension of those and they are applied to the database configuration settings.

In Django, you define your database configuration with a dictionary that looks like this:

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': str(ROOT_DIR.path('db.sqlite3')),
    }
}
```

This is a `sqllite` configuration, so the properties required are minimal, but if you were to use something like `mysql`, or `postgres`, your `DATABASES` dictionary would look something like this:

```
DATABASES = {
    'default': {
        'ENGINE': '',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    }
}
```

There is also another way to configure this which is more inline with the 12 Factor app methodology and this is based on the idea of using a `database url`, or, a `database connection string`.  This would look something like this:

```
postgres://dbuser:dbpass@localhost/dbname
```

It should be noted that for the above to work in a Django project, because the `DATABASES` setting is a dictionary, is if you use <a href="https://warehouse.python.org/project/dj-database-url/" target="_blank">dj-database-url</a> or <a href="https://github.com/joke2k/django-environ" target="_blank">django-environ</a>.  Fortunatley, we already have `django-environ` installed so we are good to go.  

Why would we want to use a `database connection string`?  From a maintainability perspective, it is very easy to use this and read.  For example, the above works for `postgres`, but if you wanted to change it to `mysql` you would just modify it like so:

```
mysql://dbuser:dbpass@localhost/dbname
```

Thus, we have a single place to change the connection details for our database.  With this in mind, lets begin setting up our template to support a different database backend.

### step-by-step

Right now our `DATABASES` setting is setting in `config/common.py`.  It is currently configured to use `sqllite3`.  This is a light weight database that is nice for building prototpyes.  However, we would not want to use this in a production environment.  Thus, we will choose a more robust database offering.  I enjoy working with Postgres and this is also recommended as best practice.  Lets begin by going to `config/common.py` and updating the database.

**before**

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': str(ROOT_DIR.path('db.sqlite3')),
    }
}
```

**after**

```
DATABASES = {
    'default': {
        'ENGINE': ' django.db.backends.postgresql',
        'NAME': 'part_07',
        'USER': 'part_07',
        'PASSWORD': 'part_07',
        'HOST': 'localhost',
        'PORT': '',
    }
}
```

> **DISCUSSION:**  Since Django 1.9 the engine is called ` django.db.backends.postgresql`.  For those familiar, in previous versions it was called `django.db.backends.postgresql_psycopg2`.  You can use either one.  

The above would be just fine, but since we reviewed the 12 Factor App style of defining database variables, we are going to modify this so that it is a `database connection string` like so:

**common.py**

```
DATABASES = {
    'default': env.db("DATABASE_URL", default="postgres://dbuser:dbpass@localhost/dbname")
}
```

Alright, the above works well, but we should probably take this time to make in customizeable via cookiecutter, thus, lets respectively substitue `postgres` `dbuser`, `dbpass`, `localhost` and `dbname` with the following cookiecutter variables:

**common.py**

```
DATABASES = {
    'default': env.db("DATABASE_URL", default="{{cookiecutter.db_engine}}://{{cookiecutter.db_user}}:{{cookiecutter.db_password}}@{{cookiecutter.db_host}}/{{cookiecutter.db_name}}")
}
```

Now that we have these new cookiecutter variables we have to make sure that cookiecutter asks use these questions by updating our `cookiecutter.json` to include them:

**cookiecutter.json**

```
"db_engine": "postgres",
"db_user": "vagrant",
"db_password": "vagrant",
"db_host": "localhost",
"db_name": "{{cookiecutter.repo_name}}",
```

> **DISCUSSION:** For the defaults above, these are ones that would more often then not work for me.  You can select anything that you like and everything should work smoothly.  

Right, now, we could keep it like this, but then when we build this environment with `vagrant` we would still have to manually build our database.  Luckily we are in a good position to add this to our provisioning script and not have to worry about this process.  lets begin to set that up.  The first thing we are going to do is update our `provision.sh` script with the variables we used inside of our `cookiecutter.json` and `common.py` files. 

**provision.sh**

```
# ...

db_engine="{{cookiecutter.db_engine}}"
db_user="{{cookiecutter.db_user}}"
db_password="{{cookiecutter.db_password}}"
db_host="{{cookiecutter.db_host}}"
db_name="{{cookiecutter.db_name}}"
```

Alright, now our provision script has access to those variables.  We need to setup expect and we need to call the expect script inside of our application.  Reason we do this is because there are times when questions are going to be asked and if we want to answer them when not in interactive mode we can used expect which simply is us telling it the questions to expect and then us giving it the answers we would type.  

create a new directory inside of `vagrant` folder which holds our expect scripts.  We are going to call this directory `expects`.  We are also going to create a file inside of this directory called `set_db.exp`.  This file is our expect script.

`mkdir expects && touch expects/set_db.exp`

Alright, we have all the files that we are going to need, now we need to start telling our `provision.sh` what to do.  The first thing is we have to install all the dependencies for `postgres` and `expect` to do their thing.  We need to install the following packages:

```
expect
postgresql
postgresql-contrib
```

> **DISCUSSION:** `expect` allows us to use our expect scripts, yes, it is a separate program that does not come with shell.  Then we install `postgres` and `postgresql-contrib` to start using Postgres for our database backedn.

Right, so we need to update our `provision.sh` script to do this inside of the `INSTALL SOFTWARE` section.  Thus, we could just add the following:

```
# INFO: install expect
logit "Updating installing expect"
sudo apt-get install -y expect

# INFO: install postgres
logit "Updating installing postgres"
sudo apt-get install -y postgres postgres-contrib
```

But this is a lot of lines to add and we could probably just optimize our code.  Thus, I am going to create a list inside of our shell script that holds the names of all the software we want to install.  It looks like this:

```
software=(
    "expect"
    "python-pip"
    "python-dev"
    "postgresql"
    "postgresql-contrib"
    "libpq-dev" )
```

and we can add the above to the bottom of our `CONFIGS` section.  Now we can go into our `INSTALL SOFTWARE` section and update it:

**before**

```
# INFO: install pip
logit "Updating installing pip"
sudo apt-get install -y python-pip
```

**after**

```
# install software
for i in "${software[@]}"
do
   logit "Installing $i"
   sudo apt-get install -y $i
done
```

**DISCUSSION:** The above will loop over all the items in the `software` variable and install each one.  Again, this is great because each time we want to add new software we can manage this from one place.  I also want to discuss what you are installing, because it is important to get a general idea of what things are doing.  So let's go over all the new packages that we are installing for postgres to work:
* POSTGRESSQL:  This provides you with the core database server
* POSTGRESSQL-CONTRIB: This provides some additional features that are not included in the core. 
* LIBPQ-DEV: Language and headers for C language front-end development
* PYTHON-DEV: Python header files are included in this package, among other modules

[Overview of the packages we are installing](http://www.postgresql.org/download/linux/debian/)

[The additional modules that come with postgres-contrib](http://www.postgresql.org/docs/9.1/static/contrib.html)

[Requirements for compiling Psycopg on linux](http://initd.org/psycopg/docs/install.html)

Now that our software is installed, we can create a user + password and the database we will use in our projects.  We define these values inside of `set_db.exp` like so:

```
#!/usr/bin/expect -f

set timeout 10

set db_name [lindex $argv 0]
set db_user [lindex $argv 1]
set db_pass [lindex $argv 2]
set os_user [lindex $argv 3]

# information
puts "entering interactive terminal"

# change to postgres user
spawn sudo -i -u postgres
expect "postgres@"
send "psql\r"

# create role for os user
expect "postgres="
send "create role $os_user with login superuser password '$os_user';\r"

# create role for admin
expect "postgres="
send "create role $db_user with login superuser password '$db_pass';\r"

# create database
expect "postgres="
send "create database $db_name with owner $db_user;\r"

# exit interactive terminal
expect "postgres="
send "\\q\r"

# exit user postgres
expect "postgres@"
send "exit\r"

# give control back to user
interact
```

> **DISCUSSION:**  What is the above doing?
* switch to the `postgres` user - setup when you install postgres
* create a role for our os user w/ superuser abilities - dev only
* create a role for our db user w/ superuser abilities - dev only
* create a database with the db user as owner
* exit the session

You may have noticed that at the top we set 4 variables - `db_name`, `db_user`, `db_pass` and `os_user`.  These take values marked by `$argv` - in shell scripting this means that the value they are set to is based on the position of the argument passed.  Thus, this script expects arguments and needs to be called in order to execute it.  Lets call it inside of `provision.sh`.  

```
#-------------------------------------------------------------
# SETUP DATABASE
#-------------------------------------------------------------

# setup database
logit "setting up project database"
expect ${repo_dir}/vagrant/expects/set_db.exp ${db_name} ${db_user} ${db_password} ${os_user}
```

We actually added a new variable into the script that we do not have defined in our `provision.sh` scripts `CONFIG` section called `os_user`.  Lets define that in the `CONFIG` section and we also need `cookiecutter.json` to have this as a question.

**provision.sh**

`os_user="{{cookiecutter.os_user}}"`

**cookiecutter.json**

`"os_user": "vagrant",`

Great.  we also need to install a a django dependency inside of `requirements/base.txt` a package called `psycopg2`.  This is a Postgres adapter for Python and it allows us to use Python and Postgres together.  So add this to the `base.txt` requirements file.

Lets test out what we have by using the cookiecutter as is.

1.  Turn on the vagrant machine

    `vagrant up`
    
2.  Login to the vagrant machine

    `vagrant ssh`

4. Turn on the Django dev server
    
    `python manage.py runserver 0.0.0.0:8000`

If all went well we should be able to see our "Welcome to your new Django site" that we created in `part_06`.  This is good for now.  In the next guide we are going to explore using cookiecutter to give us a choice between multiple database backends to choose from and be smart enough to install and configure only what we need.   


