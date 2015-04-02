(function () {
    'use strict';

    angular.module('app', [
        'app.home',
        'app.dashboard',
        'app.shared',
        'ui.router',
        'ngTouch'
    ]);

})();

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

(function () {
    'use strict';

    angular.module('app.home', [
        'app.core'
    ]);

})();

(function() {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$log'];

    /* @ngInject */
    function HomeController($log) {
        $log.info('===== HomeController =====');
    }

})();

(function () {
    'use strict';

    angular.module('dashboard.messages', []);

})();

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

(function () {
    'use strict';

    angular.module('app.dashboard', [
        'dashboard.messages',
        'app.core'
    ]);

})();

(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$log'];

    /* @ngInject */
    function DashboardController($log) {
        var dashboard = this;

        $log.info('===== DashboardController =====');
    }

})();

(function () {
    'use strict';

    //Will be added the angularTemplateCache on build task.
    angular.module('app.core', []);

})();

(function () {
    'use strict';

    angular.module('app.shared', [
        'shared.login',
        'shared.navbar'
    ]);

})();

(function () {
    'use strict';

    angular.module('shared.navbar', []);

})();

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

(function() {
    'use strict';

    angular
        .module('shared.login', ['ngResource']);
}());

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

(function() {
    'use strict';

    angular
        .module('shared.login')
        .factory('authenticationService', authenticationService);

    authenticationService.$inject = ['$log', '$resource'];

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

angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("app/features/dashboard/dashboard.view.html","    <div id=\"side-bar\" class=\"col-xs-3\">\n    <ul class=\"list-group\">\n      <li class=\"list-group-item\">Messages</li>\n      <li class=\"list-group-item\">Account</li>\n      <li class=\"list-group-item\">Logout</li>\n    </ul>\n    </div>\n    <div id=\"dashboard\" class=\"col-xs-8\">\n        <div class=\"container-fluid\">\n            <div class=\"row\">\n                <h1 class=\"text-center\">This is the dashboard !</h1>\n                <div ui-view></div>\n            </div>\n        </div>\n    </div>\n");
$templateCache.put("app/features/home/home.view.html","<div class=\"container-fluid\">\n    <section id=\"home\" class=\"row\">\n        <article class=\"container text-center\">\n            <h1>ALCA</h1>\n            <h4 class=\"\">This is a project with Angular, Gulp and Bower.</h4>\n        </article>\n    </section>\n    <section id=\"about\" class=\"row\">\n        <article class=\"container\">\n            <h1 class=\"\">About section</h1>\n        </article>\n    </section>\n    <section id=\"team\" class=\"row\">\n        <article class=\"container\">\n            <h1 class=\"\">Team section</h1>\n        </article>\n    </section>\n    <section id=\"contact\" class=\"row\">\n        <article class=\"container\">\n            <h1 class=\"\">Contact section</h1>\n        </article>\n    </section>\n</div>\n");
$templateCache.put("app/shared/login/login.view.html","<form name=\"loginForm\" ng-submit=\"login.submit(credentials)\" novalidate>\n    <h2 class=\"form-signin-heading\">Login</h2>\n    <label for=\"username\" class=\"sr-only\">Username</label>\n    <input id=\"username\" class=\"form-control\" ng-model=\"credentials.username\" placeholder=\"Username\" required=\"\" autofocus=\"\" type=\"text\">\n    <label for=\"password\" class=\"sr-only\">Password</label>\n    <input id=\"password\" class=\"form-control\" ng-model=\"credentials.password\" placeholder=\"Password\" required=\"\" type=\"password\">\n    <div class=\"checkbox\">\n        <label>\n            <input value=\"remember-me\" ng-model=\"credentials.remember\" type=\"checkbox\"> Remember me\n        </label>\n    </div>\n    <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Login</button>\n</form>\n");
$templateCache.put("app/shared/navbar/navbar.view.html","<nav class=\"navbar navbar-fixed-top navbar-inverse\">\n    <div class=\"navbar-header\">\n        <a href=\"/\" class=\"navbar-brand\"><span class=\"brand-title\"><img id=\"logo\" src=\"./assets/img/logo_simple_white.png\"/> ALCA<span></a>\n        <a class=\"btn navbar-btn navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-collapse\">\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n        </a>\n    </div>\n    <div class=\"navbar-collapse collapse\">\n        <div class=\"navbar-logo\">\n            <ul class=\"nav navbar-nav navbar-right\">\n                <li ui-sref-active=\"active\" ng-repeat=\"navline in navbar.navline\">\n                    <a ui-sref=\"{{navline.state}}\" ng-href=\"{{navline.link}}\">\n                        {{navline.text}}\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </div>\n</nav>\n");
$templateCache.put("app/features/dashboard/messages/messages.view.html","<div class=\"jumbotron text-center\">\n    <h1>Plein pleinn plein de messages !</h1>\n</div>\n");}]);