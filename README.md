# My Project 

[![Join the chat at https://gitter.im/rllola/myProject-gulp](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/rllola/myProject-gulp?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Standard project start up for webdev with Angular, gulp, bower.

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

