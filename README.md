# Django Starters

Django Starters will walk users through the process of creating their own Django Templates that can be used to easily start new Django web development projects.  Specifically, we will focus on the minimum requirements for setting up a development environment, advanced project layouts, settings and tooling systems. 

## Django-Starters

This repo contains guides which outline the design decisions and steps involved in creating `django-starter`.  What follows is an overview of the `Parts` currently available.  `Parts`'s 1-3 are meant to be introductions to Vagrant, and shell Provisioning.  `Part 4 +` are each cookiecutter templates that can be used to build django projects right away.  The final result is a flexible starting point for your Django projects called `django-starter`.

**Part 1**
> This guide will show users how to start using vagrant and django

**Part 2**
> This guide will show users how to make a provisioning script for Vagrant

**Part 3**
> This guide will show users how to make a smarter provisioning script for vagrant

**Part 4**
> This guide will introduce users to a scaffolding tool called cookiecutter

**Part 5**
> This guide will show users how to use cookiecutter to build a simple django project layout

**Part 6**
> This guide will show users envrionment variables and optimized settings 

**Part 7**
> This guide will show users how to configure Django to use Postgres

**Part 8**
> This guide will show users how to build a cookiecutter that supports multiple databases

**Part 9**
> This guide will show users how to setup documentation and collaboration dot files

**Part 10**
> This guide will show users how to setup PYTHONPATH, solve pesky problems with .pyc files, automate the creation of a django superuser and setup two virtualenvironments - python 2 and python 3.

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





