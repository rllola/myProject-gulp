(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$log'];

    /* @ngInject */
    function HomeController($log) {
        $log.info('===== HomeController =====');
    }

})();
