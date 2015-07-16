(function () {
    'use strict';

    describe('brainatlas', function () {

        var imageUrls, el, outerScope, scope;

        beforeEach(function () {
            imageUrls = _.range(10).map(function () {
                return 'http://placehold.it/' + _.random(100, 600) + 'x' + _.random(100, 600);
            });
        });

        beforeEach(module('brainatlasGallery'));
        beforeEach(inject(function ($compile, $rootScope, $timeout) {
            el = angular.element(
                '<div class="widget-wrapper">' +
                    '<brainatlas image-urls="imageUrls"></brainatlas>' +
                '</div>'
            );
            outerScope = $rootScope.$new();
            outerScope.imageUrls = imageUrls;
            $compile(el)(outerScope);
            outerScope.$digest();
            scope = el.find('.brainatlas-wrapper').scope();
            $timeout.flush(0);
            spyOn(scope, 'setImage').and.callThrough();
            spyOn(scope, 'scrollThumbnails').and.callThrough();
        }));

        it('should be compiled', function () {
            expect(el.html()).not.toEqual(null);
        });

        it('should have scope object with `imageUrls` member', function () {
            expect(scope).toEqual(jasmine.any(Object));

            expect(scope.imageUrls).toEqual(jasmine.any(Array));
            expect(scope.imageUrls).toEqual(imageUrls);
        });

        it('should define panzoom configuration objects', function () {
            expect(scope.panzoomConfig).toEqual(jasmine.any(Object));
            expect(scope.panzoomModel).toEqual(jasmine.any(Object));
        });

        it('should define functions setImage and scrollThumbnails', function () {
            expect(scope.setImage).toEqual(jasmine.any(Function));
            expect(scope.scrollThumbnails).toEqual(jasmine.any(Function));
        });

        it('should set first image as displayed image', function () {
            // Check for scope value.
            expect(scope.displayedUrl).toEqual(imageUrls[0]);
            // Check for src value.
            expect(el.find('.display-img').eq(0).attr('src')).toEqual(imageUrls[0]);
        });

    });
})();
