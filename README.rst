***************
Django Starters
***************

Django Starters will walk users through the process of creating their own Django Templates that can be used to easily start new Django web development projects.  Specifically, we will focus on the minimum requirements for setting up a development environment, advanced project layouts, Django Project Settings and tooling systems.

The Guides
==========

This repo contains guides which outline the design decisions and steps involved in creating `django starter`_ and `django wagtail starter`_.  This repository is split into two series.

series 1
++++++++

Series 1 covers the process involved in creating `django starter`.  It consists of 9 parts that breakdown everything that was done and why.

`Part 1`_

Setting up Vagrant

`Part 2`_

Installing Django

`Part 3`_

Installing Postgres

`Part 4`_

Multiple Settings Files + Environment Variables

`Part 5`_

Multiple Requirements Files

`Part 6`_

Logs

`Part 7`_

Tests

`Part 8`_

Documentation

Series 2
++++++++

Series 2 is going to build on what we learned in `series 1`_.  The goal is to show you how to configure an existing Django project, the one we built in series 1, to use Wagtail.  This guide will walk you through the configuration process, creating your first page, and configuring a new site in Wagtail.

`S2 Part 1`_

Configure Django Project to Use Wagtail

`S2 Part 2`_

Create a New Page Class

`S2 Part 3`_

Create a Template for your new Page Class

`S2 Part 4`_

Create a new Site in Wagtail Admin


Who is this for?
================

Anyone who wants to learn about Django web development. This repo is a refined version of the notes that I took when I started learning Django. I hope that it can save you some time and questions and provide a quickstart into exploring some of the more advanced offerings of web development.

Goals
=====

This repo is a way for me to give back to the web development community. For so long I have been able to benefit from work that others freely make available online. I want to acknowledge their efforts by sharing some of my own experiences. In this process, I have a few goals that I want to work towards:

1. **Open Discussion:**   I am going to make choices that work for me, but I want readers to have, at the least, the opporunity to see that there are other choices. Therefore, I will attempt to have open discussion in my writing whenever possible exploring alternatives or clarifying what appear to be vague points. Thus, if you are reading something and you think it is unclear, please create an issue and ask a question! I would love to have a community generated FAQ section.

2. **Maintenance:**  The first thing that I do before reading any web development guides is check the date. Is it older than 6 months? 1 year? It may still be useful, but depending on the technology it is likely out of date. This rule does not apply to articles that are sharing patterns or general concepts, but for something like a particular tool in web development, this rule is critical. I don't want that to happen to this repo so I will commit time to creating a process to test the code in this repo every few months to keep it up to date.

Note on branch strcuture
========================

Currently there is a ``master`` branch a ``django-starter-1.9.x`` branch. I have labelled the branches to correspond to the version of Django being used. Thus, when the next version of Django comes out, version 1.10.x it will get it's own branch and the cookiecutters will be updated to use the latest.


Community Support
=================

I am a believer in the community creating things together. If you are reading through anything I have written here and find that it is incorrect, outdated or lacking in proper documentation, please feel free to create an issue or fork this repo and make a PR.

.. _django starter: https://github.com/tkjone/django-starter
.. _django wagtail starter: https://github.com/tkjone/django-wagtail-starter
.. _Part 1: https://github.com/tkjone/django-starters/blob/django-starters-1.9.x/series_1/part_01.rst
.. _Part 2: https://github.com/tkjone/django-starters/blob/django-starters-1.9.x/series_1/part_02.rst
.. _Part 3: https://github.com/tkjone/django-starters/blob/django-starters-1.9.x/series_1/part_03.rst
.. _Part 4: https://github.com/tkjone/django-starters/blob/django-starters-1.9.x/series_1/part_04.rst
.. _Part 5: https://github.com/tkjone/django-starters/blob/django-starters-1.9.x/series_1/part_05.rst
.. _Part 6: https://github.com/tkjone/django-starters/blob/django-starters-1.9.x/series_1/part_06.rst
.. _Part 7: https://github.com/tkjone/django-starters/blob/django-starters-1.9.x/series_1/part_07.rst
.. _Part 8: https://github.com/tkjone/django-starters/blob/django-starters-1.9.x/series_1/part_08.rst
.. _Part 9: https://github.com/tkjone/django-starters/blob/django-starters-1.9.x/series_1/part_09.rst
.. _Part 10: https://github.com/tkjone/django-starters/blob/django-starters-1.9.x/series_1/part_10.rst
.. _Part 11: https://github.com/tkjone/django-starters/blob/django-starters-1.9.x/series_1/part_11.rst
.. _Series 2: https://github.com/tkjone/django-starters/blob/django-starters-1.9.x/series_2/part_01.rst
.. _S2 Part 1: https://github.com/tkjone/guides-django/blob/django-starters-1.9.x/series_2/part_01.rst
.. _S2 Part 2: https://github.com/tkjone/guides-django/blob/django-starters-1.9.x/series_2/part_02.rst
.. _S2 Part 3: https://github.com/tkjone/guides-django/blob/django-starters-1.9.x/series_2/part_03.rst
.. _S2 Part 4: https://github.com/tkjone/guides-django/blob/django-starters-1.9.x/series_2/part_04.rst