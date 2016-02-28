#-------------------------------------------------------------
# CONFIGS
#-------------------------------------------------------------

repo_name="myproject"
project_name=""
repo_dir="/home/vagrant/myproject"
project_dir="/home/vagrant/myproject/src/server"
django_reqs="/home/vagrant/myproject/src/server/requirements/dev.txt"
virtualenv_dir="/home/vagrant/.virtualenvs"
db_engine="postgres"
db_user="dev"
db_password="myproject_dev"
db_host="localhost"
db_name="myproject"
os_user="vagrant"
python_2="/usr/bin/python"
python_3="/usr/bin/python3"
software=(
    "python-pip"

    "expect"
    "python-dev"
    "python3-dev"
    "postgresql"
    "postgresql-contrib"
    "libpq-dev"


    "libjpeg-dev"
    "libtiff-dev"
    "zlib1g-dev"
    "libfreetype6-dev"
    "liblcms2-dev" )

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

# install software
for i in "${software[@]}"
do
   logit "Installing $i"
   sudo apt-get install -y $i
done

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
# SETUP DATABASE
#-------------------------------------------------------------

# setup database
logit "setting up project database"
expect ${repo_dir}/tools/vagrant/expects/set_db.exp ${db_name} ${db_user} ${db_password} ${os_user}


#-------------------------------------------------------------
# CREATE VIRTUAL ENVIRONMENTS
#-------------------------------------------------------------

# INFO: initialize virtualenvironment - Python 2
logit "Creating ${repo_name} Python 2 virtual environment"
mkvirtualenv -r ${django_reqs} ${repo_name}2

# INFO: initialize virtualenvironment - Python 3
logit "Creating ${repo_name} Python 3 virtual environment..."
mkvirtualenv -r ${django_reqs} --python=${python_3} ${repo_name}3

# setup the python path and django_settings_module
logit "Configuring postactivate hook for virtualenv..."
cat << EOF >> ${virtualenv_dir}/postactivate
    # django settings
    export PYTHONPATH="$PYTHONPATH:${repo_dir}/src/server"
    export DJANGO_SETTINGS_MODULE="config.settings.dev"
EOF

# remove django_settings_module when user deactivate virtualenv
logit "Configuring postdeactivate hook for virtualenv..."
cat << EOF >> ${virtualenv_dir}/postdeactivate
    # unset project environment variables
    unset DJANGO_SETTINGS_MODULE
EOF

#-------------------------------------------------------------
# DJANGO SETUP
#-------------------------------------------------------------

# INFO: activate virtualenv
logit "Activate virtual environment"
source ${virtualenv_dir}/${repo_name}3/bin/activate

# INFO: move into django project
logit "Changing ${repo_name} folder"
cd ${repo_name}

# INFO: log user into virtualenv when they ssh into VM
logit "Configuring .bashrc"
cat << EOF >> /home/vagrant/.bashrc
    # login to virtualenv
    workon ${repo_name}3
    # project directory
    cd ${repo_dir}
    export PYTHONDONTWRITEBYTECODE=1
EOF

# INFO: build initial Django DB tables
logit "Migrating Django DB"
python ${repo_dir}/src/server/manage.py migrate

#-------------------------------------------------------------
# CREATE SUPER USER
#-------------------------------------------------------------
# createsuperuser
logit "creating project superuser"
expect ${repo_dir}/tools/vagrant/expects/set_admin.exp ${os_user} ${repo_name} ${repo_dir} ${db_user} admin@gmail.com ${db_password}

logit "provisioning complete"
