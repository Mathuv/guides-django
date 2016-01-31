# Starter 3

We are going to start where we left off with `starter_2`.  We now have a provisioning script that allows to us to start a VM, setup virtualenvwrapper and initialize a Django project.  Now, you might be thinking, great, I have a provisioning script.  But what if I want to start a new project using the `starter_1` or `starter_2`?  Wouldn't I have to go into each one and change the project names and adjsut the provisioning script?  Yeah, you would and given the state of our current provisioning script that will be a tedious and error prone process.  That is what this starter is going to cover: making our provisioning script a little smarter

`Starter_3` is going is going to go through the provisioning script and clean it up so that it is is more reusable.

### Housekeeping

Nothing new here

### Step-By-Step

I would actually start with `starter_2` and add to that one, seeing as everything we are doing here is really just improving the previous starter.