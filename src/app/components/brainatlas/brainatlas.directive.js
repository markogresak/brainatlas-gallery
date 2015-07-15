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
            // According to Panzoom docs, the model should be declared as empty object.
            $scope.panzoomModel = {};

            /**
             * Set `imageIndex` as active image.
             *
             * @param {Number} imageIndex Index of next active image.
             */
            $scope.setImage = function (imageIndex) {
                // Change `src` of displayed image.
                $element.find('.display-img').attr('src', $scope.imageUrls[imageIndex]);
                // Toggle active class.
                $element.find('.brainatlas-thumbnail-container li.active').removeClass('active');
                $element.find('.brainatlas-thumbnail-container li').eq(imageIndex).addClass('active');
            };

            // Call `setImage` with index 0 when directive renders.
            $timeout(function () { $scope.setImage(0); }, 0);
        }
    }

})();
