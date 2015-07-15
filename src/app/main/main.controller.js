(function () {
    'use strict';


    angular.module('brainatlasGallery').controller('MainController', function ($scope) {
        var randomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        var randomPlaceholder = function () {
            return 'http://placehold.it/' + randomInt(100, 600) + 'x' + randomInt(100, 600);
        };

        $scope.imageUrls = _.range(10).map(randomPlaceholder);
    });
})();
