var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var jscs        = require('gulp-jscs');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var wiredep     = require('wiredep').stream;
var reload      = browserSync.reload;
var taskListing = require('gulp-task-listing');
var plato       = require('plato');

// Constants path. Reusable and easy to change for everywhere !
var root        = './';
var temp        = './.tmp/';
var report      = './report/';
var app         = './app/';
var bower       = { directory : app + 'assets/bower/', json : './bower.json'};
var jsFiles     = ['./app/features/**/*.js','./app/shared/**/*.js','./app/*.js'];
var stylesFiles  = ['app/assets/styles/*.scss']

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
    	.pipe(jshint.reporter('jshint-stylish'), {verbose: true});
});

/**
 * Check the javascript code quality with .jscsrc as config file
 * @return {Stream}
 */
gulp.task('jscs', function () {
	console.log('==== Jscs task ====');
  	return gulp.src(jsFiles)
    	.pipe(jscs());
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

/**
 * Static Server + watching scss/html files + watching jshint
 * @return {Stream}
 */
gulp.task('go', ['wiredep','sass', 'jshint', 'jscs'], function() {
	console.log('==== Starting dev server ====');
    browserSync({
        server: './app'
    });

    gulp.watch(stylesFiles, ['sass']);
    gulp.watch(jsFiles, ['jshint']);
    gulp.watch(app + '*.html').on('change', reload);
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
            server: './report'
        });
        console.log('Browse to http://localhost:3000/ to see Plato results');
    };

    plato.inspect(jsFiles, report, options, platoCompleted);
});

gulp.task('doc', function() {
    // To be continued... Because fucking dgeni doesn't work !
});

/**
 * Default useless task
 * Print all the tasks and substak by default
 */
gulp.task('default', ['help']);
