(function() {
    'use strict';

    angular
        .module('shared.login')
        .directive('loginDirective', loginDirective);
        /* <div login-directive>....</div>*/

    function loginDirective () {
        var directive = {
            bindToController: true,
            controller: LoginController,
            controllerAs: 'login',
            restrict: 'EA',
            scope: {
            },
            templateUrl: 'app/shared/login/login.view.html'
        };

        LoginController.$inject = ['$log', 'authenticationService', '$state'];
        /* ngInject */
        function LoginController($log, authenticationService, $state) {
            $log.info('===== LoginController =====');

            var login = this;
            login.submit = submit;

            function submit(credentials) {
                $log.info(credentials);

                authenticationService.helloWorld();

                /*authenticationService.login(credentials).then(function () {
                    $log.info('Creditentials valid : Redirecting to dashboard');
                    $state.go('dashboard');
                }, function () {
                    $log.error('Failed to login');
                });*/
            }
        }

        return directive;

    }
})();
