# Starter 3

We are going to start where we left `starter_2`.  We now have a provisioning script that allows to us to start a VM, setup virtualenvwrapper and initialize a Django project migrations and all.  Now, you might be thinking, great, I have a provisioning script.  But what if I want to start a new project using the `starter_1` or `starter_2`?  Wouldn't I have to go into each one and change the project names and adjsut the provisioning script?  Yeah, you would and given the state of our current provisioning script that will be a tedious and error prone process.  That is what we are going to take another step toward making the process less awkward.  

`Starter_3` is going is going to go through the provisioning script and clean it up so that it is is more reusable.

### Instruction for Immediate Use