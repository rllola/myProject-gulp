/**
 * Contain all the constant use in gulpfile.js and karma.conf.js
 *
 */
module.exports = function() {
    // Constants path. Reusable and easy to change for everywhere !
    var root        = './';
    var temp        = './.tmp/';
    var report      = './report/';
    var app         = './app/';
    var bower       = { directory : app + 'assets/bower/', json : './bower.json'};
    var jsFiles     = ['./app/features/**/*.js','./app/shared/**/*.js','./app/*.js'];
    var stylesFiles = ['app/assets/styles/*.scss'];
    var htmlFiles   = ['./app/index.html','./app/features/**/*.html', './app/shared/**/*.html'];
};
