(function () {
    'use strict';

    angular
        .module('brainatlasGallery')
        .directive('brainatlas', brainatlas);

    /** @ngInject */
    function brainatlas() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/brainatlas/brainatlas.html',
            scope: {
                imageUrls: '='
            },
            controller: BrainatlasController
        };

        return directive;

        /** @ngInject */
        function BrainatlasController($scope, $element, $timeout) {
            // Config for panzoom directive.
            $scope.panzoomConfig = {
                zoomLevels: 20,
                scalePerZoomLevel: 1.1,
                neutralZoomLevel: 0,
                zoomStepDuration: 0.05,
                zoomToFitZoomLevelFactor: 1.0
            };
            $scope.panzoomModel = {};

            $scope.setImage = function (imageIndex) {
                console.log('set', imageIndex);
                $element.find('.display-img').attr('src', $scope.imageUrls[imageIndex]);
                $element.find('.brainatlas-thumbnail-container li.active').removeClass('active');
                $element.find('.brainatlas-thumbnail-container li').eq(imageIndex).addClass('active');
            };

            $timeout(function () { $scope.setImage(0); }, 0);
        }
    }

})();
