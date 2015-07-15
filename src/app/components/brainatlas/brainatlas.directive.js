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
            },
            controller: BrainatlasController
        };

        return directive;

        /** @ngInject */
        function BrainatlasController($scope, $element) {
            // Config for panzoom directive.
            $scope.panzoomConfig = {
                zoomLevels: 12,
                scalePerZoomLevel: 1.5,
                neutralZoomLevel: 0,
                zoomStepDuration: 0.1
            };
            $scope.panzoomModel = {};

            $element.find('img').on('dragstart', _.constant(false));
        }
    }

})();
