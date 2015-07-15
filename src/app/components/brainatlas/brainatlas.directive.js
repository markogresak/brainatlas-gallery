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
        function BrainatlasController($scope) {
            // Config for panzoom directive.
            $scope.panzoomConfig = {
                zoomLevels: 20,
                scalePerZoomLevel: 1.1,
                neutralZoomLevel: 0,
                zoomStepDuration: 0.05,
                zoomToFitZoomLevelFactor: 1.0
            };
            $scope.panzoomModel = {};

            console.log('urls:', $scope.imageUrls);
        }
    }

})();
