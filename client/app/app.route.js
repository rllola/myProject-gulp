/*jshint multistr: true */
(function () {
    'use strict';

    angular
        .module('app')
        .config(router);

    function router($stateProvider, $urlRouterProvider, $locationProvider) {
        //
        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/');

        //
        // Now set up the states
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/features/home/home.view.html',
                controller: 'HomeController',
                controllerAs: 'home',
                title: 'Home'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/features/dashboard/dashboard.view.html',
                controller: 'DashboardController',
                controllerAs: 'dashboard',
                title: 'Dashboard'
            })
            .state('dashboard.messages', {
                url: '/messages',
                templateUrl: 'app/features/dashboard/messages/messages.view.html',
                controller: 'MessagesController',
                controllerAs: 'messages',
            })
            .state('dashboard.account', {
                url: '/account',
                templateUrl: 'app/features/dashboard/account/account.view.html',
                controller: 'AccountController',
                controllerAs: 'account',
            })
            .state('login', {
                url: '/login',
                template: ' <div class="container">\
                                <div login-directive class="jumbotron" style="margin-top:150px;">\
                                </div>\
                            </div>'
            })
            .state('register', {
                url: '/register',
                template: ' <div class="container">\
                                <div class="jumbotron" style="margin-top:150px;">\
                                    Register\
                                </div>\
                            </div>'
            });

        // Remove the ugly # in the url
        //$locationProvider.html5Mode(true);
    }

})();
