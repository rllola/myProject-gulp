var gulp          = require('gulp');
var jshint        = require('gulp-jshint');
var jscs          = require('gulp-jscs');
var browserSync   = require('browser-sync');
var sass          = require('gulp-sass');
var wiredep       = require('wiredep').stream;
var reload        = browserSync.reload;
var taskListing   = require('gulp-task-listing');
var plato         = require('plato');
var compass       = require('gulp-compass');
var plumber       = require('gulp-plumber');
var imagemin      = require('gulp-imagemin');
var rev           = require('gulp-rev');
var revReplace    = require('gulp-rev-replace');
var useref        = require('gulp-useref');
var filter        = require('gulp-filter');
var uglify        = require('gulp-uglify');
var csso          = require('gulp-csso');
var del           = require('del');
var uncss         = require('gulp-uncss');
var templateCache = require('gulp-angular-templatecache');
var inject        = require('gulp-inject');
var Dgeni         = require('dgeni');
//var ngAnnotate  = require('gulp-ng-annotate');

// Constants path. Reusable and easy to change for everywhere !
var root        = './';
var temp        = './client/app/.tmp/';
var report      = './report/';
var app         = './client/app/';
var bower       = { directory : app + 'assets/bower/', json : './bower.json'};
var jsFiles     = [ app + 'features/**/*.js', app + 'shared/**/*.js', app + '*.js'];
var stylesFiles = ['./client/assets/styles/*.scss'];
var htmlFiles   = ['./client/index.html', app + 'features/**/*.html', app + 'shared/**/*.html'];

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
        .pipe(gulp.dest('client/assets/styles'))
        .pipe(reload({stream: true}));
});

/**
 * Compile scss into CSS & auto-inject into browsers
 * @return {Stream}
 */
gulp.task('compass', function() {
    console.log('==== Compass task ====');
    return gulp.src(stylesFiles)
        .pipe(plumber({
            errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
        .pipe(compass({
            css: 'client/assets/styles',
            sass: 'client/assets/styles',
            image: 'client/assets/img',
            //Not needed because download with bower
            //require: ['bootstrap-sass']
        }))
        .on('error', function(err) {
        // Would like to catch the error here
        })
        .pipe(gulp.dest('client/assets/styles'))
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
        server: './client'
    });

    gulp.watch(stylesFiles, ['compass']);
    gulp.watch(jsFiles, ['jscs','jshint']);
    gulp.watch('./client/**/*.html').on('change', reload);
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
 * Clean ! Clean build folder
 * @return {Stream}
 */
gulp.task('clean:build', function (done) {
    del('./build/**/*',done);
});

/**
 * Clean ! Clean build folder
 * @return {Stream}
 */
gulp.task('clean:tmp', function (done) {
    del( temp,done);
});


/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('templatecache', ['clean:tmp'], function() {
    var filenameTemplate = 'templates.js';
    var optionsTemplate = {
                            module: 'app.core',
                            root: 'app/',
                            standAlone: false
                        };
    //Need to be change to create automaticaly the templates modules and load it in app.core
    return gulp.src('./client/app/**/*.view.html')
        .pipe(templateCache(
            filenameTemplate,
            optionsTemplate
        ))
        .pipe(gulp.dest(temp));
});

/**
 * Minify and concat css
 * @return {Stream}
 */
gulp.task('build:css', function (done) {
    return gulp.src('./client/assets/styles/styles.css')
        .pipe(uncss({
            html: ['./client/index.html', './client/app/**/*.html']
        }))
        .pipe(csso())
        .pipe(gulp.dest('./build/assets/styles/'));
});

/**
 * Clean ! Clean build fonts folder
 * @return {Stream}
 */
gulp.task('clean:fonts', function (done) {
    del('./build/assets/fonts/*.*',done);
});

/**
 * Copy fonts
 * @return {Stream}
 */
gulp.task('build:fonts', ['clean:fonts'], function() {
    return gulp
        .src('./client/assets/fonts/*')
        .pipe(gulp.dest('./build/assets/fonts'));
});

/**
 * Clean ! Clean build inages
 * @return {Stream}
 */
gulp.task('clean:images', function (done) {
    del('./build/assets/img/*.*',done);
});

/**
 * Compress images
 * @return {Stream}
 */
gulp.task('build:images', ['clean:images'], function() {
    return gulp
        .src('./client/assets/img/*')
        .pipe(imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest('./build/assets/img'));
});

/**
 * Build ! Minify, uglify, uncss, replace name, and some other awesome sjit...
 */
gulp.task('build', ['clean:build', 'build:fonts', 'build:images', 'templatecache', 'test'], function() {
  var jsLibFilter = filter('**/lib.js');
  var jsAppFilter = filter('**/app.js');
  var cssFilter = filter('**/styles.css');
  var templateCache = temp + 'templates.js';
  console.log(templateCache)
  var userefAssets = useref.assets();

  return gulp.src('./client/index.html')
    .pipe(plumber())
    .pipe(inject(gulp.src(templateCache, {read: false}), {relative:true, name: 'templates'}))
    .pipe(userefAssets)      // Concatenate with gulp-useref
    .pipe(jsLibFilter)
    /*.pipe(uglify())  */           // Minify any javascript sources
    .pipe(jsLibFilter.restore())
    .pipe(jsAppFilter)
    /*.pipe(uglify())  */           // Minify any javascript sources
    .pipe(jsAppFilter.restore())
    .pipe(cssFilter)
    .pipe(uncss({
        html: ['./client/index.html', './client/app/**/*.html']
    }))
    .pipe(csso())               // Minify any CSS sources
    .pipe(cssFilter.restore())
    .pipe(rev())                // Rename the concatenated files
    .pipe(userefAssets.restore())
    .pipe(useref())
    .pipe(revReplace())       // Substitute in new filenames
    .pipe(gulp.dest('./build'));
});

gulp.task('go:build', ['build'], function(){
    console.log('==== Starting build server ====');
    browserSync({
        server: './build'
    });
});

gulp.task('clean:doc', function(done) {
    del('build/docs/**/*',done)
});


//This is fucked up ! Dgeni sucks !
gulp.task('doc', ['clean:doc'], function() {
  try {
    var dgeni = new Dgeni([require('./docs/dgeni-conf')]);
    return dgeni.generate();
  } catch(x) {
    console.log(x.stack);
    throw x;
  }
});

gulp.task('go:doc', ['doc'], function(){
    console.log('==== Starting doc server ====');
    browserSync({
        server: './build/docs'
    });
});

/**
 * Default useless task
 * Print all the tasks and substak by default
 */
gulp.task('default', ['help']);
