# Part 11

Django comes with a testing framework.  I don't actually add to much in the way of new dependencies for tests, because what Django provides is actually very good.  My goal in revieing these is meant for the event you look over my cookiecutters for comparison and see the few extra lines in `requirements/dev.txt` and `config/dev.py` and are wondering why they are different.  Again, I like things minimal and usually begin to implement larger systems when the need is truly there. 

What we will be covering

* coverage.py setup
* Nose setup

### HOUSEKEEPING

We will pick up where we left off with the `Part 10` cookiecutter.  If you are just starting this series, here is a quick way to get a hold of it. 

1.  Clone `django-starter` into a new repo on your local

    `git clone https://github.com/tkjone/django-starters.git <new-directory>`

2.  `cd` into `<new-directory>`

3.  Make the `part_10` template the HEAD
    
    `git filter-branch --subdirectory-filter series_1/part_10 HEAD -- --all`

4.  Cleanup your new git repository

    `git gc --aggressive`
    
    `git prune`

5.  Change your git remote settings

    `git remote update origin <your-repository-url-here>`


> **DISCUSSION:**  The above is a nice way of turning a subdirectory into a repository of it's own.  For more info see [git filter-branch documentation](https://git-scm.com/docs/git-filter-branch).  Please also note that `<new-directory>` is me telling you to give the directory a name, it's not the name of the directory.  

# Step-by-Step

Django comes with a [test framework](https://docs.djangoproject.com/en/1.9/topics/testing/) out of the box.  I like to add [coverage](https://coverage.readthedocs.org/en/coverage-4.0.3/) to the mix for some nice HTML output and I also enjoy [django-nose](https://github.com/django-nose/django-nose) for the cool extensions it applies to the out-of-the-box Django test framework.  This is based on the python test framework [nose](https://nose.readthedocs.org/en/latest/).

Currently our project does not have a place for tests.  Thus, we have to create a directory where our tests are going to live.  To keep things simple, we will call that directory `tests` and create it in our repo's root directory.

`mkdir tests`

1.  Installing `Coverage.py` - Update `requirements/dev.txt`
    

        # test tools
        coverage>=4.0.3


2.  Setup a configuration file for `coverage.py` and update the file

    `touch .coveragerc`


        [run]
        omit = ../*migrations*

        [html]
        directory = {{cookiecutter.repo_name}}/tests/report
        title =  {{cookiecutter.repo_name}} report`


    > **DISCUSSION**  The above does three things:
    > 
    >   * When we run coverage.py we are going to ignore migration files
    >   * Test coverage outputs an HTML report.  There can be a lot of files that it generates and we would like to keep things organized.  Thus, we tell it to put all of the files it generates into our directory called `tests`.
    >   * We set the title to appear at the top of the HTML report

3. Coverage is setup so we can add nose to the mix.  Go to `requirements/dev.txt` and update:

    `django-nose`

4. We now have to tell Django that we want to use this new dependency in our project and then we will configure it as well.  We can do both of these inside of `config/dev.py`


        # ------------------------------------------------------------------------------
        # TESTING
        # ------------------------------------------------------------------------------

        # this app is used for site wide functional testing
        INSTALLED_APPS += ('django_nose', )
        TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'

        # running tests will also run coverage + only include the apps listed below.
        # inclusive will scan all files in working dir to see which are not being covered
        NOSE_ARGS = [
            '--verbosity=2',
            '--with-coverage',
            # '--cover-package=add packages here',
            '--cover-inclusive',
        ]


    > **DISCUSSION:** A line by line run through of the above:
    >  * We tell Django that we want to use `django-nose` by adding it to `INSTALLED_APPS`
    >  * `TEST_RUNNER` tells Django which test framework to use.  We are telling it to use Nose.
    >  * `nose` take command line arguments.  These are nice little specifications that we can tell `nose` to use when it runs.  Unfortunatley, it can be annoying typing these in every time.  Fortunatley, we are provided with a variable so we can specify the command line options we want nose to run when we run through our test cases - enter `NOSE_ARGS`.  These are the settings I like to use.
    >    - verbosity: how much information to output when you run tests.  2 is default.  I specified for new developers.
    >    - with-coverage: run coverage.py
    >    - cover-package: specifically tell coverage.py which packages to provide output for.  Ideally, all your django applications you built and are testing should be specified here.  This is commented because when you use this cookiecutter there are no apps to start with.  When create new apps, make sure to add here.





