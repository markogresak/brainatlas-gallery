(function () {
    'use strict';

    angular.module('brainatlasGallery').controller('MainController', function ($scope) {
        $scope.imageUrls = _.range(10).map(function () {
            return 'http://placehold.it/' + _.random(100, 600) + 'x' + _.random(100, 600);
        });
    });
})();
