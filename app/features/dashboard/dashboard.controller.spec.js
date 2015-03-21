/* jshint -W117, -W030 */
describe('DashboardController', function() {

    var scope,
        controller;

    beforeEach(module('app.dashboard'));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('DashboardController', {
            $scope: scope
        });
    }));

    it('Verify if controller is defined', function () {
        expect(controller).toBeDefined();
    });
});
