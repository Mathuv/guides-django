# Part 9

This section is going to focus on building your project to support collaberation.  All great software is built with other people.  Thus, the best thing we can do, whether we plan on building projects by ourselves or with teams, is set up for both scenarios.  We are going to do the following in this part:

* Build documentation structure
* Add editor and git config files
* Add contributor files
* Add Licenses

### HOUSEKEEPING

We will pick up where we left off with the `part 8` cookiecutter.  If you are just starting this series, here is a quick way to get a hold of it. 

1.  Clone `django-starter` into a new repo on your local

    `git clone https://github.com/tkjone/django-starters.git <new-directory>`

2.  `cd` into `<new-directory>`

3.  Make the `part_08` template the HEAD
    
    `git filter-branch --subdirectory-filter series_1/part_08 HEAD -- --all`

4.  Cleanup your new git repository

    `git gc --aggressive`
    
    `git prune`

5.  Change your git remote settings

    `git remote update origin <your-repository-url-here>`


> **DISCUSSION:**  The above is a nice way of turning a subdirectory into a repository of it's own.  For more info see [git filter-branch documentation](https://git-scm.com/docs/git-filter-branch).  Please also note that `<new-directory>` is me telling you to give the directory a name, it's not the name of the directory.  

### Step-By-Step

Lets start by adding a license to this template.  No matter what you do, you should always use a license file.  This is paramount and super easy to do.  This is a simple task and we can get it out of the way easily.  Not sure, what kind of license to use?  That's why [this site exists](http://choosealicense.com/).  Essentially, most people will choose one of the following three licenses:

**MIT:** "A short, permissive software license. Basically, you can do whatever you want as long as you include the original copyright and license notice in any copy of the software/source.  There are many variations of this license in use." 

**Apache:** "You can do what you like with the software, as long as you include the required notices. This permissive license contains a patent license from the contributors of the code."

**GPL:** "You may copy, distribute and modify the software as long as you track changes/dates in source files. Any modifications to or software including (via compiler) GPL-licensed code must also be made available under the GPL along with build & install instructions."

**No License:**  If there is no license, or if your code has a simple `copywrite` statement, it is taken to mean you are not allowing anyone to use your code.  

> **DISCUSSION:**  All the above are taken from [tl;dr legal](https://tldrlegal.com/).  Great resources, I recommend checking it out.

Knowing the above, we are going to setup our cookiecutter to ask us to choose between one of the four above licenses.  This is done is the same way as we did with our database choice question in `part 8`.  Let's start by adding a new question to our `cookiecutter.json`

**cookiecutter.json**

```
# ...
"license": ["MIT", "Apache", "GPLv3", "No License" ],
"current_year": "2015",
"full_legal_name_of_project_owner": "",
```

Now we can create a new files which is going to hold our licenses.  Inside that file we will create a bunch of if elses to accomodate our cookiecutter being able to support providing us the option of multiple license options.  

`cd {{cookiecutter.repo_name}} && touch LICENSE`

Update `LICENSE`

```
{% if cookiecutter.license == "MIT" -%}

# license here

{% elif cookiecutter.license == "Apache" -%}

# license here

{% elif cookiecutter.license == "GPLv3" -%}

# license here

{% elif cookiecutter.license == "No License" -%}

Copyright (c) {{cookiecutter.current_year}} {{cookiecutter.full_legal_name_of_project_owner}}

{% endif %}
```

> **DISCUSSION:** Each one of these licenses require that you add your name and year so you will need to connect those to the corresponding `cookiecutter` variables.  Take at look at the source code for this repository.

Now that we have our project generating a License for us, we can go onto some more fun things, like getting everyone code editors in line and working like one anothers.  Now, for commonly used IDE's, they will all respect an `editorconfig` file.  So let's create an `editorconfig` file in this project and update it with some baseline settings.

`touch .editorconfig`

```
# http://editorconfig.org

root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

[*.{py,rst,ini}]
indent_style = space
indent_size = 4

[*.py]
line_length=120
known_first_party={{ cookiecutter.repo_name }}
multi_line_output=3
default_section=THIRDPARTY

[*.{html,css,scss,json,yml}]
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

> **DISCUSSION:** For this file to be used, you will need to configure your IDE accordingly.  This is fine.  If we go to [editorconfig documentation](http://editorconfig.org/) we get a nice little breakdown of how to setup our IDEs.

We are now going to configure our `.gitattributes` file.  This one is actually very minimal

`touch .gitattributes`

```
* text=auto
```

> **DISCUSSION:** ADD DISCUSSION NOTES HERE

Lets also add a `.pylintrc` file

`touch .pylintrc`

```
[MASTER]
load-plugins=pylint_common, pylint_django{% if cookiecutter.use_celery == "y" %}, pylint_celery {% endif %}

[FORMAT]
max-line-length=120

[MESSAGES CONTROL]
disable=missing-docstring,invalid-name

[DESIGN]
max-parents=13
```

> **DISCUSSION:** ADD DISCUSSION NOTES HERE


We are now going to move toward adding files that acknowledge and guide people who may contribute to our project.  The first is creating a file where we acknowledge all the people who worked on this project

`touch humans.txt`

```
# humanstxt.org/
# The humans responsible & technology colophon

# TEAM

    <name> -- <role> -- <twitter>
    {{cookiecutter.author_name}} 

# THANKS

    <name>

# TECHNOLOGY COLOPHON

    CSS3, HTML5
    Apache Server Configs, jQuery, Modernizr, Normalize.css
```

So as we can see we have a little structure for this project showing where you can add names and a nice format to include those names.  Now we are going to add one of the most important parts of any project: documentation.  We will start by creating a directory to hold all of our documentation called `docs` and then we will create several files inside of `docs`  called - `architecture.md`, `contribute.md`, `css.md`, `deployment.md`, `install.md`.  We will also create another directory inside this one called `js`.  

`mkdir docs && touch docs/architecture.md docs/contribute.md docs/css.md docs/deployment.md docs/getting_started.md`

`mkdir -p docs/js`

Lets go over these files and what they are used for and why you need them, because I consider the minimum required for any project.  I will also show you how you can add to them in a meaningful way so they are not just empty files.

**architecture.md**

This file give a very highlevel over of the project, what depedencies are being used and how they all connect.  To get a little idea of what goes here, this is a structure that I like to use:

```
# {{cookiecutter.repo_name}} Architecture


### PROJECT STRUCTURE


**GULP DIRECTORY:**


**VAGRANT DIRECTORY:**


**CONFIG DIRECTORY:**


**REQUIREMENTS DIRECTORY:**


**LOGS DIRECTORY:**

### BACKEND FEATURES:

- Postgres
- django 1.8
...

### FRONT END FEATURES:

- jQuery == 1.11.3
...
```

> **DISCUSSION:**  There are three section to this file: Architecture, Backend Features, Front End Features.  The first section succinctly tells the user what is in each directory, the backend features are the technologies being used in the backend and the front end features are the features being used in the front end.  You may be thinking, if you are familiar with Django, that it is not needed to explain the `config` or `requirements` dir.  Don't.  You are not the only developer on the team and we can save confusion and time if we explain clearly and concisely what everything does.  

**contribute.md**

This is where we outline, at a medium-high level, how to fork the repo, our Git strategy for this project, making commits and PR's, how to ask questions etc.

```
Contributing
===========================================

###ISSUES

This project has issues.  Some are assigned, and others are not.  Take one that are not assigned, or are assigned to you!

If you spot a bug, or something that needs to be done, please create an issue.  This is done in bitbucket by running through the following steps:


login to your account
enter your repo
click on the left side menu icon that, when hovered over, says 'issues' 
+ create issue in top right corner


###COMMITS

Commits are part of the history of your project.  Every time you make a change that works toward solving an issue, make sure to commit it with an informative and easy to read message.  Please follow this format:


ISSUE <#> - <TYPE> - <BRIEF DESCRIPTION>

<LONG FORM DESCRIPTION>


Everything in angle brackets above is something your are going to change. Thus, the following is the ideal commit format


ISSUE #76 - TASK - SAMPLE COMMIT MESSAGE

More detailed explanatory text, if necessary.  Wrap it to about 72
characters or so.  In some contexts, the first line is treated as the
subject of an email and the rest of the text as the body.  The blank
line separating the summary from the body is critical (unless you omit
the body entirely); tools like rebase can get confused if you run the
two together.

Write your commit message in the imperative: "Fix bug" and not "Fixed bug"
or "Fixes bug."  This convention matches up with commit messages generated
by commands like git merge and git revert.

Further paragraphs come after blank lines.

- Bullet points are okay, too

- Typically a hyphen or asterisk is used for the bullet, followed by a
  single space, with blank lines in between, but conventions vary here

- Use a hanging indent

###PULL REQUESTS
```

> **DISCUSSION:** ADD MORE DETAIL LIKE WHAT GOES IN THE PROJECT

**css.md**

This is where we outline some need to knows about the css in our project.  For example, what kinds of units do we use? what is the style guide? What utility functions are available in the project?  If you add new CSS features that could be used by others, how to update this file accordingly.

> **DISCUSSION:** ADD MORE DETAIL LIKE WHAT GOES IN THE PROJECT

**deployment.md**

This outlines how to deploy to production

> **DISCUSSION:** ADD MORE DETAIL LIKE WHAT GOES IN THE PROJECT

**getting_started.md**

This is an overall of all the features, both front and backend, and how to configure and get everything working on your local machines

> **DISCUSSION:** ADD MORE DETAIL LIKE WHAT GOES IN THE PROJECT

**JS/**

This is actually optional. You can have a directory like this, or you can have a single `js.md` file.  I have a `js/` directory because I create many JS files and I intend to have a single `js.md` file per JS module.  This is because JS is becoming so complex that it deserves a very comprehensive documentation treatment.

> **DISCUSSION:** ADD MORE DETAIL LIKE WHAT GOES IN THE PROJECT

The above documentation is a manual process and there are alternatives like documentation generators, but that is a giant topic that, in order to setup correctly, would be a series unto itslef.  

Now, all we did is change configuration files, so we can be sure that the project is going to work as always, but if you want to verify lets run through the steps 

1.  Turn on the vagrant machine

    `vagrant up`
    
2.  Login to the vagrant machine

    `vagrant ssh`

4. Turn on the Django dev server
    
    `python manage.py runserver 0.0.0.0:8000`