(function () {
    'use strict';

    angular
        .module('brainatlasGallery')
        .directive('brainatlas', brainatlas);

    function brainatlas() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/brainatlas/brainatlas.html',
            scope: {
                imageUrls: '='
            },
            controller: ['$scope', '$element', '$timeout', BrainatlasController]
        };

        return directive;

        function BrainatlasController($scope, $element, $timeout) {
            // Config for panzoom directive.
            $scope.panzoomConfig = {
                zoomLevels: 20,
                scalePerZoomLevel: 1.2,
                neutralZoomLevel: 0,
                zoomStepDuration: 0.05,
                zoomToFitZoomLevelFactor: 1.0
            };
            // According to Panzoom docs, the model should be declared as empty object.
            $scope.panzoomModel = {};

            $scope.genes = function() {
                return _.keys($scope.imageUrls);
            };

            $scope.isGenesEmpty = function() {
                return $scope.genes().length === 0;
            };

            $scope.isSingeGene = function() {
                return $scope.genes().length === 1;
            };

            $scope.experiments = function(geneId) {
                geneId = arguments[0] === undefined ? $scope.selectedGene : geneId;
                return _.keys($scope.imageUrls[geneId]);
            };

            $scope.isSingleExperiment = function () {
                return $scope.experiments($scope.selectedGene).length === 1;
            };

            $scope.selectedGene = '';

            /**
             * Update displayed image.
             *
             * @param {String} imageUrl Url (`src`) to new image.
             */
            $scope.setImage = function (imageUrl) {
                $scope.displayedUrl = imageUrl;
            };

            /**
             * Scroll thumbnails wrapper.
             *
             * @param   {Boolean} direction false = left, true = right
             */
            $scope.scrollThumbnails = function (direction) {
                var el = $element.find('.brainatlas-thumbnail-wrapper');
                return el.stop().animate({
                    scrollLeft: el.scrollLeft() + 95 * (direction ? 1 : -1)
                }, 200);
            };

            // Call `setImage` with first image url (called when directive renders).
            $timeout(function () {
                $scope.setImage($scope.imageUrls[0]);
            }, 0);
        }
    }

})();
