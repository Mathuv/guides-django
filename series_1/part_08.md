# Part 8

In `Part 7` we learned how to configure Postgres in Django.  Before `Part 7` we were using the minimal `sqllite3` database.  Now, this can be a good little database to use for something like a POC where you don't need the horsepower of Postgres.  Thus, instead of just saying don't use it, I want to show you how you can choose everytime you start your project.

This part is going to show how to get `cookiecutter` to ask you multiple choice questions.  Specifically, we will have it ask us which database we want to use and, based on our answer, only install what we require for that database to work.  

### HOUSEKEEPING

We will pick up where we left off with the `part_07` cookiecutter.  If you are just starting this series, here is a quick way to get a hold of it. 

1.  Clone `django-starter` into a new repo on your local

    `git clone https://github.com/tkjone/django-starters.git <new-directory>`

2.  `cd` into `<new-directory>`

3.  Make the `part_07` template the HEAD
    
    `git filter-branch --subdirectory-filter part_07 HEAD-- --all`

4.  Cleanup your new git repository

    `git gc --aggressive`
    
    `git prune`

5.  Change your git remote settings

    `git remote update origin <your-repository-url-here>`


> **DISCUSSION:**  The above is a nice way of turning a subdirectory into a repository of it's own.  For more info see [git filter-branch documentation](https://git-scm.com/docs/git-filter-branch).  Please also note that `<new-directory>` is me telling you to give the directory a name, it's not the name of the directory.  

### STEP-BY-STEP

We know that we want a choice between `postgres` and `sqllite3` so lets configure `cookiecutter.json` to ask us a multiple choice question.

**cookiecutter.json**

```
# before
"db_engine": "postgres",

# after
"db_engine": ["sqlite", "postgres" ],
```

> **DISCUSSION:** For the above, `cookiecutter` is going to default to `sqllite3` if nothing is selected by the user.  

Now that cookiecutter is asking us something we have to go through our code and make sure it is accordingly configured based on the database engine chosen.  This is done in three places:

1. `provision.sh`
2. `common.py`
3. `requirements/base.txt`

Lets update our `provision.sh`.

**0. before**

```
software=(
    "expect"
    "python-pip"
    "python-dev"
    "postgresql"
    "postgresql-contrib"
    "libpq-dev" )
```

**0. after**

```
software=(
    "python-pip"
    {% if cookiecutter.db_engine == "postgres" -%}
        "expect"
        "python-dev"
        "postgresql"
        "postgresql-contrib"
        "libpq-dev"
    {% endif %} )
```

**1. before**

```
#-------------------------------------------------------------
# SETUP DATABASE
#-------------------------------------------------------------

# setup database
logit "setting up project database"
expect ${repo_dir}/vagrant/expects/set_db.exp ${db_name} ${db_user} ${db_password} ${os_user}
```

**1. after**

```
{% if cookiecutter.db_engine == "postgres" -%}
#-------------------------------------------------------------
# SETUP DATABASE
#-------------------------------------------------------------

# setup database
logit "setting up project database"
expect ${repo_dir}/vagrant/expects/set_db.exp ${db_name} ${db_user} ${db_password} ${os_user}
{% endif %}
```

We can now go through and update our `common.py`

**0. before**

```
DATABASES = {
    'default': env.db("DATABASE_URL", default="{{cookiecutter.db_engine}}://{{cookiecutter.db_user}}:{{cookiecutter.db_password}}@{{cookiecutter.db_host}}/{{cookiecutter.db_name}}")
}
```

**0. after**

```
{% if cookiecutter.db_engine == "postgres" -%}
DATABASES = {
    'default': env.db("DATABASE_URL", default="{{cookiecutter.db_engine}}://{{cookiecutter.db_user}}:{{cookiecutter.db_password}}@{{cookiecutter.db_host}}/{{cookiecutter.db_name}}")
}

{% else -%}
DATABASES = {
    'default': env.db("DATABASE_URL", default="{{cookiecutter.db_engine}}://{{cookiecutter.repo_root_path}}/db.sqlite3")
}
{% endif %}
```

And now we make some adjustments to our `requirements/base.text`

**0. before**

```
psycopg2
```

**0. after**

```
{% if cookiecutter.db_engine == "postgres" -%}
psycopg2
{% endif %}
```

Alright, let's spin up this bad boy.  If you want to see what this is doing, you can run up two new projects.  One will use `postgres` and the second will run `sqllite` and then you can really see how this is happening. 

1.  Turn on the vagrant machine

    `vagrant up`
    
2.  Login to the vagrant machine

    `vagrant ssh`

4. Turn on the Django dev server
    
    `python manage.py runserver 0.0.0.0:8000` 


