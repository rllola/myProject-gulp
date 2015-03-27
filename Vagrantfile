# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

$setup = <<SCRIPT
apt-get update
apt-get install -y python-software-properties
apt-add-repository -y ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs
apt-get install -y phantomjs firefox
npm install npm -g
apt-get install -y ruby-compass
gem install compass
gem install bootstrap-sass
npm install -g bower
npm install -g gulp
SCRIPT

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"

  #config.vm.network "private_network", ip: "192.168.33.11"
  # If you want to access from another device, set your VM on public_network. Choose bridge wlan for wifi then check the ip address with ifconfig.
  config.vm.network "public_network"


  # forward default port 3000 to host 3000.
  # If changed you must update gulpfile.js to match
  config.vm.network :forwarded_port, :host => 3000, :guest => 3000
  # forward broswer-sync port 3001 to host 3001.
  # If changed you must update gulpfile.js to match
  config.vm.network :forwarded_port, :host => 3001, :guest => 3001
  # forward livereload port 35729 to host 35729.
  # If changed you must update gulpfile.js to match
  # config.vm.network :forwarded_port, :host => 35729, :guest => 35729

  config.vm.provider "virtualbox" do |vb|
     vb.name = "Front End box dev"
     vb.customize ["modifyvm", :id, "--memory", "2048"]
     vb.customize ["modifyvm", :id, "--nicpromisc2", "allow-all"]
  end

  #Sync the current folder in the vagrant user folder of the VM
  config.vm.synced_folder ".", "/home/vagrant/workspace"

  config.vm.provision :shell, inline: $setup
end
