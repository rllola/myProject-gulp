(function () {
    'use strict';

    angular
        .module('app')
        .config(routerHelperProvider);

    function routerHelperProvider($stateProvider, $urlRouterProvider, $locationProvider) {
        //
        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/');
        //
        // Now set up the states
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'features/home/homeView.html',
                controller: 'HomeController',
                controllerAs: 'home',
                title: 'Home'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'features/dashboard/dashboardView.html',
                controller: 'DashboardController',
                controllerAs: 'dashboard',
                title: 'Dashboard'
            });

        // Remove the ugly # in the url
        $locationProvider.html5Mode(true);

        // Change the index.html title when we change state
        /*$rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                stateCounts.changes++;
                handlingStateChangeError = false;
                var title = config.docTitle + ' ' + (toState.title || '');
                $rootScope.title = title; // data bind to <title>
            }
        );*/
    }

})();
