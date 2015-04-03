(function() {
    'use strict';

    /**
     * Module definition
     */
    angular
        .module('dashboard.account')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['$log'];

    /* @ngInject */
    function AccountController($log) {
        var account = this;

        $log.info('===== AccountController =====');
    }

})();
