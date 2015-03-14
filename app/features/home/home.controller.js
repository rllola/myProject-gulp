(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    function HomeController() {
        console.log('Welcome');
    }

})();
