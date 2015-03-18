(function() {
    'use strict';

    angular
        .module('shared.login')
        .factory('loginervice', loginService);

    function loginService() {
        var service = {

        };

        return service;

        function error() {
            // Login has failed
        }

        function success() {
            // Login has succed
        }

    }
}());
