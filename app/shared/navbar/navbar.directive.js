(function() {
    'use strict';

    angular
        .module('shared.navbar')
        .directive('navbarDirective', NavbarDirective);

    function NavbarDirective () {
        var directive = {
            bindToController: true,
            controller: NavbarController,
            controllerAs: 'navbar',
            restrict: 'EA',
            scope: {
                'navline': '='
            },
            templateUrl: 'shared/navbar/navbarTemplate.html'
        };

        function NavbarController() {

            var navbar = this;

            console.log('===== NavbarController =====');
        }

        return directive;
    }
})();
