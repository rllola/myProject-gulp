(function() {
    'use strict';

    angular
        .module('shared.navbar')
        .directive('navbarDirective', navbarDirective);
        /* <div navbar-directive>...</div>*/

    function navbarDirective () {
        var directive = {
            bindToController: true,
            controller: NavbarController,
            controllerAs: 'navbar',
            restrict: 'EA',
            scope: {
                'navline': '='
            },
            templateUrl: 'app/shared/navbar/navbar.view.html'
        };

        NavbarController.$inject = ['$log'];

        function NavbarController($log) {
            var navbar = this;

            $log.info('===== NavbarController =====');
        }

        return directive;
    }
})();
