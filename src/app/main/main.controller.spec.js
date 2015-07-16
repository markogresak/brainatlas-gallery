(function () {
    'use strict';

    describe('controllers', function () {

        var controller, scope;

        beforeEach(module('brainatlasGallery'));
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('MainController', {
                $scope: scope
            });
        }));


        it('should define 10 imageUrls', function () {
            expect(scope.imageUrls).toEqual(jasmine.any(Array));
            expect(scope.imageUrls.length).toEqual(10);
        });
    });
})();
