(function() {
    'use strict';

    angular
        .module('shared.login')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$log','$resource'];

    function authenticationService($log, $resource) {
        var service = {
            authenticate : authenticate,
            isAuthenticated : isAuthenticated,
            helloWorld : helloWorld
        };

        return service;

        //////////////////

        function authenticate(credentials) {
            //Talk to your API with $resource
            var answer = false;

            /*var Login = $resource('http://echo.jsontest.com/key/value/one/two');
            var login = Login.get(function() {
                login.abc = true;
                login.$save();
            });
            $log.log(login);*/

            if (credentials.username === 'lola' && credentials.password === 'beer') {
                answer = true;
            }

            return answer;
        }

        function isAuthenticated() {
            /*
                Your logic here
            */
            return true;
        }

        function helloWorld() {
            $log.info('Hello World !');
        }

    }
}());
