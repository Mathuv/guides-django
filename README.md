# Django Starters

Django Starters will walk users through the process of creating their own Django Templates that can be used to easily start new Django web development projects.  Specifically, we will focus on the minimum requirements for setting up a development environment, advanced project layouts, Django Project Settings and tooling systems. 

## Django-Starters

This repo contains guides which outline the design decisions and steps involved in creating `django-starter`.  What follows is an overview of the `Parts` currently available.  `Parts`'s 1-3 are meant to be introductions to Vagrant, and shell Provisioning.  `Part 4 +` are each cookiecutter templates that can be used to build django projects right away.  The final result is a flexible starting point for your Django projects called `django-starter`.

**Part 1**
> Vagrant and Django

**Part 2**
> Provisioning Vagrant

**Part 3**
> Intermediate Provisioning with Vagrant

**Part 4**
> Django + Vagrant w/ Cookiecutter

**Part 5**
> Part 4 + Project Layout w/ Cookiecutter 

**Part 6**
> Part 5 + 12 Factor App Envrionment Variables and Django Settings w/ Cookicutter

**Part 7**
> Part 6 + Postgres Database Setup w/ Cookiecutter

**Part 8**
> Part 7 + Multiple Database Support w/ Cookiecutter 

**Part 9**
> Part 8 + Collaboration files and documentation support

**Part 10**
> Part 9 + Advanced Django Settings - PYTHONPATH, .PYC files, Automate `createsuperuser` and `Python 2` and `Python 3` virtualenvironments

**Part 11**
> Part 10 + test framework (nose) and coverage report (coverage.py)

### Who this is for

Anyone who wants to learn about Django web development.  This repo is a refined version of the notes that I took when I started learning Django.  I hope that it can save you some time and questions and provide a quickstart into exploring some of the more advanced offerings of web development.  

### Goals

This repo is a way for me to give back to the web development community.  For so long I have been able to benefit from work that others freely make available online.  I want to acknowledge their efforts by sharing some of my own experiences.  In this process, I have a few goals that I want to work towards:

2.  **Open Discussion:**  I am going to make choices that work for me, but I want readers to have, at the least, the opporunity to see that there are other choices.  Therefore, I will attempt to have open discussion in my writing whenever possible exploring alternatives or clarifying what appear to be vague points.  Thus, if you are reading something and you think it is unclear, please create an issue and ask a question!  I would love to have a community generated FAQ section.
3.  **Maintenance:**  The first thing that I do before reading any web development guides is check the date.  Is it older than 6 months?  1 year?  It may still be useful, but depending on the technology it is likely out of date.  This rule does not apply to articles that are sharing patterns or general concepts, but for something like a particular tool in web development, this rule is critical.  I don't want that to happen to this repo so I will commit time to creating a process to test the code in this repo every few months to keep it up to date.  

### Note On Branch Structure

Currently there is a `master` branch a `django-starter-1.9.x` branch.  I have labelled the branches to correspond to the version of Django being used.  Thus, when the next version of Django comes out, version 1.10.x it will get it's own branch and the cookiecutters will be updated to use the latest.  

### Community Support

I am a believer in the community creating things together.  If you are reading through anything I have written here and find that it is incorrect, outdated or lacking in proper documentation, please feel free to create an issue or fork this repo and make a PR.





