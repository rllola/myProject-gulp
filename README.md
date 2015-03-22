# My Project 

Standard project start up for webdev with Angular, gulp, bower.

[![Build Status](https://travis-ci.org/rllola/myProject-gulp.svg?branch=master)](https://travis-ci.org/rllola/myProject-gulp)
[![Codacy Badge](https://www.codacy.com/project/badge/ff56aa3d381b4cb8913eac6d7b588e8d)](https://www.codacy.com/public/contact_5/myProject-gulp)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/rllola/myProject-gulp?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Setup

Please clone the git repository :

```
$ git clone https://github.com/rllola/myProject-gulp.git
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
http://localhost:3000/
```

You can now modify your files, the changes will be automatically appears on your webpage.

