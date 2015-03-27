module.exports = function(config) {
    var gulpConfig = require('./gulp.config')();

    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // frameworks to use
        // some available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        //frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],
        frameworks: ['jasmine'],

        /*plugins: [
            "karma-coverage",
            "karma-pierce-reporter"
        ],*/

        // list of files / patterns to load in the browser
        files: [

            './app/assets/bower/jquery/dist/jquery.js',
            './app/assets/bower/angular/angular.js',
            './app/assets/bower/angular-touch/angular-touch.js',
            './app/assets/bower/bootstrap-sass/assets/javascripts/bootstrap.js',
            './app/assets/bower/angular-ui-router/release/angular-ui-router.js',
            './app/assets/bower/angular-mocks/angular-mocks.js',

            './app/app.module.js',
            './app/app.route.js',

            './app/features/**/*.module.js',
            './app/features/**/*.controller.js',
            './app/features/**/*.controller.spec.js'
            //'./app/shared/**/*.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/!(*.spec).js': 'coverage',
            'app/features/**/!(*.spec).js': 'coverage',
            'app/dashboard/**/!(*.spec).js': 'coverage',
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'coverage'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'coverage'],

        coverageReporter: {
            dir: './report/coverage',
            reporters: []
        },

        // reporter options
        mochaReporter: {
            output: 'autowatch'
        },

        coverageReporter: {
            dir: './report/coverage',
            subdir: ".",
            reporters: [
                { type: "html", file: "index.html" },
                { type: "text-summary" } // optional, if you want text output as well
            ],
        },

        // Create an html report
       dhtmlReporter: {
            outputFile: '/report/index.html',
            exclusiveSections: true,
            openReportInBrowser: true
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
        // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        //        browsers: ['Chrome', 'ChromeCanary', 'FirefoxAurora', 'Safari', 'PhantomJS'],
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
