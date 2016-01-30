#-------------------------------------------------------------
# INSTALL SOFTWARE
#-------------------------------------------------------------

# INFO: update ubuntu
echo -e "\e[1;36m Updating Ubuntu"
sudo apt-get update

# INFO: install pip
echo -e "\e[1;36m installing pip"
sudo apt-get install -y python-pip

# INFO: install virtualenvwrapper
echo -e "\e[1;36m installing virtualenvwrapper"
sudo pip install virtualenvwrapper

#-------------------------------------------------------------
# CONFIGURE VIRTUALENVWRAPPER
#-------------------------------------------------------------

# INFO: configuring .profile
echo -e "\e[1;36m configuring .profile"
sed -i '10i# virtualenvwrapper configuration' /home/vagrant/.profile
sed -i '11iexport WORKON_HOME="/home/vagrant/.virtualenvs"' /home/vagrant/.profile
sed -i '12isource /usr/local/bin/virtualenvwrapper.sh' /home/vagrant/.profile

# INFO: relaod .profile
echo -e "\e[1;36m importing profile variables"
source /home/vagrant/.profile

#-------------------------------------------------------------
# SETUP DJANGO
#-------------------------------------------------------------

# INFO: initialize virtualenvironment
echo -e "\e[1;36m Creating project virtual environment..."
mkvirtualenv zooey_deschanel

# INFO: activate virtualenv
echo -e "\e[1;36m Activate virtual environment"
source /home/vagrant/.virtualenvs/zooey_deschanel/bin/activate

# INFO: initialize virtualenvironment
echo -e "\e[1;36m Installing Django"
pip install django

# INFO: move into django project
cd django_starter

# INFO: initialize virtualenvironment
echo -e "\e[1;36m Create django project layout zooey_deschanel"
django-admin startproject zooey_deschanel

# INFO: log user into virtualenv when they ssh into VM
echo -e "\e[1;36m setting up bashrc"
cat << EOF >> /home/vagrant/.bashrc
    # login to virtualenv
    source /home/vagrant/.virtualenvs/zooey_deschanel/bin/activate
    # project directory
    cd django_starter/zooey_deschanel
EOF

# INFO: move into django project
cd zooey_deschanel

# INFO: build initial Django DB tables
echo -e "\e[1;36m migrating Django DB"
python manage.py migrate

