# My Project [![Build Status](https://travis-ci.org/rllola/myProject.svg?branch=master)](https://travis-ci.org/rllola/myProject)

[![Join the chat at https://gitter.im/rllola/myProject](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/rllola/myProject?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)   [![Codacy Badge](https://www.codacy.com/project/badge/76a6605a26ce4ac5ad97c6c77a9e5217)](https://www.codacy.com/public/contact_5/myProject)

Standard project start up for webdev with Angular, gulp, bower.

## Setup

Please clone the git repository :

```
$ git clone https://github.com/rllola/myProject.git
```

Start the Vagrant box :

```
$ vagrant up
```

Run :
```
$ npm install & bower install
```

It will add all the dependencies needed.

Go inside your vargrant box :

```
$ vagrant ssh
```

Reach the workspace folder :

```
$ cd workspace
```

In the folder, you should see all the files related to the project.

Then start your server :
```
gulp go
```

## Start working

Open your favorite broswer to see your page :
```
http://192.168.33.11:9000/
```

You can now modify your files, the changes will be automatically appears on your webpage.

