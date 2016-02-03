# Django Starters

For a modern Django setup, you need an `environment`, `project layout` and `tooling system`.  The process of setting up this workflow is mainly about creating your directory structure and configuring everything correctly.  This process can be tedious and error prone.  Our saving grace comes in the form of `starters`.  Thee web development community is very fond of these and as a result, they go by many names:  `seeds`, `templates`, `boilerplate`, `cookiecutters` etc.    

The idea behind a `starter` is that it contains the exact project layout and configurations required to start new projects quickly.  Generally speaking, `starters` are better known for focusing on the `project layout` portion of the project.  What I want to provide with these starters is the other half of this process:  the `environment` and `tooling system`.  Thus, `Django starters` provides project skeletons that can be used to setup new Django projects.  Each one is designed to be reusable, confiugrable and promote best practices.     
Each project skeleton is called a cookiecutter.  Each cookiecutter will have a series of guides that explore the why's and wherefore's that go into this process.  

### How to Use

In this repo, I refer to the finished project templates as `cookiecutters`.  Each cookiecutter is backed by a series of guides.  I recommend starting at the first `cookiecutter`  to get a good understanding of what is happeing here.  Below is an overview of the cookiecutters available.


##### COOKIECUTTER 1:  VAGRANT + PROVISIONING + COOKIECUTTER

* development environment
* default django project layout

**starter_1**
> Quickly setup a vagrant machine and initialize a Django project using `django-admin startproject`

**starter_2**
> Starter_1 + provisioning script

**starter_3**
> Starter_3 + improved provisioning script

**starter_4**
> Starter_3 + improved provisioning script + cookiecutter


### Who this is for

At the moment, this project is geared towards <a href="http://zedshaw.com/2015/06/16/early-vs-beginning-coders/" target="_blank">early</a> to intermediate Django developers.  What is an early Django developer? At this point, you have already completed some tutorials like the <a href="https://docs.djangoproject.com/en/1.9/intro/tutorial01/" target="_blank">official Django tutorial</a> or <a href="http://tutorial.djangogirls.org/en/index.html" target="_blank">something similar</a> and maybe completed a small sized project with Django - like a blog.  Still don't know if you are an early Django developer?  Can you describe, with ease and clarity, what the `startproject` command does without referencing the Django documentation?  Yes?  You are good to go.

**NOTE:** Even if you haven't done anything with Django, this can still be a useful read.  Just because your a beginner does not mean you won't get anything out of it.  Give it a try!

### Goals

If this helps someone learn Django a little better, mission accomplished.  Thus, I am hoping that I can add something to the Django community and in support of this goal, I have tried to focus on a few things.

1.  One of my aims for this is objectivity.  I believe it is important to choose tools that work for you and your project.  With this in mind, there comes a point where you have to make a decision.  You, the reader, might not agree with some of the choices I have made.  Thus, in the name of objectivity and transparency, I have tried to flag as many sections where other choices could have been made.  When I come across these sections, I like to have a little discussion about why I did what I did and some of the alternatives available to you.

2.  I would like to keep this project well maintained.  In support of this effort, I will be setting up an automated process that will be able to test these templates on my behalf so they continue to be useful to the Django community.    

### Community Support

I am a believer in the community creating things together.  If you are reading through anything I have written here and find that it is incorrect, outdated or lacking in proper documentation, please feel free to make a PR.





