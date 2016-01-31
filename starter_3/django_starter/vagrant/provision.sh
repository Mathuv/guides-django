#-------------------------------------------------------------
# CONFIGS
#-------------------------------------------------------------

repo_name="django_starter"
project_name="zooey_deschanel"
virtualenv_dir="/home/vagrant/.virtualenvs"
log_color="\e[1;36m"


#-------------------------------------------------------------
# UTILITIES
#-------------------------------------------------------------


#    SUMMARY:  Logging Utility
#    EXAMPLE:  logit "This is a console log"
#    PARAMETERS:
#       MSG - enter a string that you want logit to log
logit () {
    echo -e "${log_color} $1"
}


#-------------------------------------------------------------
# INSTALL SOFTWARE
#-------------------------------------------------------------

# INFO: update ubuntu
logit "Updating Ubuntu"
sudo apt-get update

# INFO: install pip
logit "Updating installing pip"
sudo apt-get install -y python-pip

# INFO: install virtualenvwrapper
logit "Installing virtualenvwrapper"
sudo pip install virtualenvwrapper

#-------------------------------------------------------------
# CONFIGURE VIRTUALENVWRAPPER
#-------------------------------------------------------------

# INFO: configuring .profile
logit "configuring .profile"
sed -i '10i # virtualenvwrapper configuration' /home/vagrant/.profile
sed -i '11i export WORKON_HOME=/home/vagrant/.virtualenvs' /home/vagrant/.profile
sed -i '12i source /usr/local/bin/virtualenvwrapper.sh' /home/vagrant/.profile

# INFO: relaod .profile
logit "Reloading .profile"
source /home/vagrant/.profile

#-------------------------------------------------------------
# SETUP DJANGO
#-------------------------------------------------------------

# INFO: initialize virtualenvironment
logit "Creating project virtual environment..."
mkvirtualenv ${project_name}

# INFO: activate virtualenv
logit "Activate virtual environment"
source ${virtualenv_dir}/${project_name}/bin/activate

# INFO: initialize virtualenvironment
logit "Installing Django"
pip install django

# INFO: move into django project
logit "Changing Directory to ${repo_name}"
cd django_starter

# INFO: initialize virtualenvironment
logit "Create django project layout for ${project_name}"
django-admin startproject ${project_name}

# INFO: log user into virtualenv when they ssh into VM
logit "Configuring .bashrc"
cat << EOF >> /home/vagrant/.bashrc
    # login to virtualenv
    source ${virtualenv_dir}/${project_name}/bin/activate
    # project directory
    cd ${repo_name}/${project_name}
EOF

# INFO: move into django project
logit "Changing to ${project_name} directory"
cd ${project_name}

# INFO: build initial Django DB tables
logit "Migrating Django DB"
python manage.py migrate

