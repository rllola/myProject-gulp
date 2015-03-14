(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController() {
        console.log('Welcome');
    }

})();
