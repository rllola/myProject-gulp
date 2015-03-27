(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$log'];

    /* @ngInject */
    function DashboardController($log) {
        var dashboard = this;

        $log.info('===== DashboardController =====');
    }

})();
