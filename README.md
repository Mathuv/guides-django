# Django Starters

An ideal local development environment is about advocating a system that allows you to work in a clear, reproduceable and maintainable way.  This repository explores my approach to setting up a local development environment for my Django projects. 

### The Optimal Django Setup Environment

Over time I have developed several Django starters which I use to start my projects.  At a certain point, I realized that in developing a system that works for me, I accumulated a lot of notes.  I recently started reading over my notes and instantly remembered the sometimes steep barrier to entry in the web development community.  I also remembered that there were a lot of generous people who shared their knowledge with me along the way and without them I couldn't have gotten to where I am.  Thus, I have taken my notes, cleaned them up and made them available in the form of guides within this repo.

Each of the directories in this repo is meant to illustrate the minimum requirements involved in setting up an effective local Django development environment.  Each directory is called a starter.  The idea is that each starter includes:

* A configured Vagrantfile
* A Django Project Layout
* An Exploration of the decisions that went into developing each starter

The following starters are currently available:

**starter_1**
> Quickly setup a vagrant machine and initialize a Django project using `django-admin startproject`


### Who this is for

At the moment, this project is geared towards <a href="http://zedshaw.com/2015/06/16/early-vs-beginning-coders/" target="_blank">early</a> to intermediate Django developers.  What is an early Django developer? At this point, you have already completed some tutorials like the <a href="https://docs.djangoproject.com/en/1.9/intro/tutorial01/" target="_blank">official Django tutorial</a> or <a href="http://tutorial.djangogirls.org/en/index.html" target="_blank">something similar</a> and maybe completed a small sized project with Django - like a blog.  Still don't know if you are an early Django developer?  Can you describe, with ease and clarity, what the `startproject` command does without referencing the Django documentation?  Yes?  You are good to go.

**NOTE:** Even if you haven't done anything with Django, this can still be a useful read.  Just because your a beginner does not mean you won't get anything out of it.  Give it a try!

### Goals

If this helps someone learn Django a little better, mission accomplished.  Thus, I am hoping that I can add something to the Django community and in support of this goal, I have tried to focus on a few things.

1.  One of my aims for this is objectivity.  I believe it is important to choose tools that work for you and your project.  With this in mind, there comes a point where you have to make a decision.  You, the reader, might not agree with some of the choices I have made.  Thus, in the name of objectivity and transparency, I have tried to flag as many sections where other choices could have been made.  When I come across these sections, I like to have a little discussion about why I did what I did and some of the alternatives available to you.

2.  I would like to keep this project well maintained.  In support of this effort, I will be setting up an automated process that will be able to test these templates on my behalf so they continue to be useful to the Django community.    

### Community Support

I am a believer in the community creating things together.  If you are reading through anything I have written here and find that it is incorrect, outdated or lacking in proper documentation, please feel free to make a PR.





