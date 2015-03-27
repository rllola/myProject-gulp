var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var jscs        = require('gulp-jscs');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var wiredep     = require('wiredep').stream;
var reload      = browserSync.reload;
var taskListing = require('gulp-task-listing');
var plato       = require('plato');
var compass     = require('gulp-compass');
var plumber     = require('gulp-plumber');
var minify      = require('gulp-minify-css');
//var ngAnnotate  = require('gulp-ng-annotate');

// Constants path. Reusable and easy to change for everywhere !
var root        = './';
var temp        = './.tmp/';
var report      = './report/';
var app         = './app/';
var bower       = { directory : app + 'assets/bower/', json : './bower.json'};
var jsFiles     = ['./app/features/**/*.js','./app/shared/**/*.js','./app/*.js'];
var stylesFiles = ['app/assets/styles/*.scss', './app/features/**/*.scss'];
var htmlFiles   = ['./app/index.html','./app/features/**/*.html', './app/shared/**/*.html'];

//TODO : Create a tasks directory and several gulp.task file because this gulpfile isn't pretty : picky-gulp example

/**
 * Print all the task and subtask available with the command `gulp help`
 */
gulp.task('help', taskListing);

/**
 * Wire-up the bower dependencies
 * @return {Stream}
 */
gulp.task('wiredep', function() {
    console.log('==== Wiredep task ====');

    return gulp
        .src(app + 'index.html')
    	.pipe(wiredep({
      		directory: bower.directory,
      		bowerJson: require(bower.json),
    	}))
    	.pipe(gulp.dest(app))
    	.pipe(reload({stream: true}));
});


/**
 * Check the javascript code quality with .jshintrc as config file
 * @return {Stream}
 */
gulp.task('jshint', function () {
	console.log('==== Jshint task ====');
  	return gulp.src(jsFiles)
    	.pipe(jshint('.jshintrc'))
    	.pipe(jshint.reporter('jshint-stylish'), {verbose: true})
        .pipe(reload({stream: true}));
});

/**
 * Check the javascript code quality with .jscsrc as config file
 * @return {Stream}
 */
gulp.task('jscs', function () {
	console.log('==== Jscs task ====');
  	return gulp.src(jsFiles)
        .pipe(plumber({
            errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
    	.pipe(jscs())
        .on('error', function(err) {
        // Would like to catch the error here
        });
});

/**
 * Compile sass into CSS & auto-inject into browsers
 * @return {Stream}
 */
gulp.task('sass', function() {
	console.log('==== Sass task ====');
    return gulp.src(stylesFiles)
        .pipe(sass())
        .pipe(gulp.dest('app/assets/styles'))
        .pipe(reload({stream: true}));
});


gulp.task('compass', function() {
    console.log('==== Compass task ====');
    return gulp.src(stylesFiles)
        .pipe(plumber({
            errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
        .pipe(compass({
            css: 'app/assets/styles',
            sass: 'app/assets/styles',
            image: 'app/assets/img',
            //Not needed because download with bower
            //require: ['bootstrap-sass']
        }))
        .on('error', function(err) {
        // Would like to catch the error here
        })
        .pipe(gulp.dest('app/assets/styles'))
        .pipe(reload({stream: true}));

});

/**
 * Static Server + watching scss/html files + watching jshint
 * @return {Stream}
 */
gulp.task('go', ['wiredep','compass', 'jshint', 'jscs'], function() {
    //var karma = require('karma').server;

    /*karma.start({
        configFile: __dirname + '/karma.conf.js',
        exclude: [],
        singleRun: false
    }, null);*/
    // Test on changes .... not sure good to pus it here...

	console.log('==== Starting dev server ====');
    browserSync({
        server: './app'
    });

    gulp.watch(stylesFiles, ['compass']);
    gulp.watch(jsFiles, ['jscs','jshint']);
    gulp.watch('./app/**/*.html').on('change', reload);
});

/**
 * Create plato report and open a server
 */
gulp.task('plato', function() {
    console.log('==== Plato task ====');
    console.log('Analyzing source with Plato');
    var options = {
        title: 'Plato Inspections Report'
    };

    function platoCompleted(report) {
        var overview = plato.getOverviewReport(report);
        console.log(overview.summary);
        browserSync({
            server: './report/plato',
            ui: false
        });
    };

    plato.inspect(jsFiles, report+'plato/', options, platoCompleted);
});

gulp.task('doc', function() {
    // To be continued... Because fucking dgeni doesn't work !
});

/**
 * Launch test and coverage with karma and jasmine
 */
gulp.task('test', function() {
    console.log('==== Test task ====');
    console.log('Launching test server');
    var excludeFiles = [];
    var karma = require('karma').server;

    karma.start({
        configFile: __dirname + '/karma.conf.js',
        exclude: excludeFiles,
        singleRun: true
    }, karmaCompleted);

    ////////////////

    function karmaCompleted(karmaResult) {
        console.log('Karma completed');
        if (karmaResult === 1) {
            console.log('karma: tests failed with code ' + karmaResult);
        } else {
            /*browserSync({
                server: './report/',
                ui: false
            });*/
            //console.log('Browse to http://localhost:3000/ to see the test unit results');
        }
    }
});

/**
 * Build ! Minify, uglify, ...
 * @return {Stream}
 */
gulp.task('build', function () {
    return null;
});


/**
 * Default useless task
 * Print all the tasks and substak by default
 */
gulp.task('default', ['help']);
