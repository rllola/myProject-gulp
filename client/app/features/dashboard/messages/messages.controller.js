(function() {
    'use strict';

    angular
        .module('dashboard.messages')
        .controller('MessagesController', MessagesController);

    MessagesController.$inject = ['$log'];

    /* @ngInject */
    function MessagesController($log) {
        var messages = this;

        $log.info('===== MessagesController =====');
    }

})();
