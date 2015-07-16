'use strict';

describe('Brainatlas directive', function () {

    var allThumbnails, leftArrow, rightArrow, getParent, getScrollLeft;

    beforeEach(function () {
        browser.get('/index.html');
        allThumbnails = element.all(by.css('.brainatlas-thumbnail'));
        leftArrow = element(by.css('.glyphicon-chevron-left'));
        rightArrow = element(by.css('.glyphicon-chevron-right'));

        getParent = function (el) {
            return el.element(by.xpath('..'));
        };

        var getThumbnailWrapperScrollLeft = function () {
            return document.querySelector('.brainatlas-thumbnail-wrapper').scrollLeft;
        };

        getScrollLeft = function () {
            return browser.findElement(by.css('.brainatlas-thumbnail-wrapper')).then(function () {
                return browser.executeScript(getThumbnailWrapperScrollLeft);
            });
        };

        this.addMatchers({
            toHaveClass: function (a) {
                return this.actual.getAttribute('class').then(function (cls) {
                    var patt = new RegExp('(^|\\s)' + a + '(\\s|$)');
                    return patt.test(cls);
                });
            }
        });
    });

    describe('displayed image', function () {
        it('should include displayed image', function () {
            var src = element(by.css('.display-img')).getAttribute('src');
            // Match placehold.it url with 3 digit x 3 digit image size.
            expect(src).toMatch(/http:\/\/placehold\.it\/\d{3}x\d{3}/);
        });

        it('should change image url when another image is clicked', function () {
            /**
             * @returns {String}   The `src` attribute of displayed image.
             */
            var getSrc = function () {
                return element(by.css('.display-img')).getAttribute('src');
            };
            var srcBefore = getSrc();
            // Click second thumbnail.
            allThumbnails.get(1).click();
            var srcAfter = getSrc();
            expect(srcBefore).not.toEqual(srcAfter);
        });
    });

    describe('thumbnails', function () {
        it('should set first element as active by default', function () {
            expect(getParent(allThumbnails.first())).toHaveClass('active');
        });

        it('should change active element on click', function () {
            expect(getParent(allThumbnails.first())).toHaveClass('active');
            // Click second thumbnail.
            allThumbnails.get(1).click();
            expect(getParent(allThumbnails.first())).not.toHaveClass('active');
            expect(getParent(allThumbnails.get(1))).toHaveClass('active');
        });
    });

    describe('navigation arrows', function () {
        it('should have an initial offset 0', function () {
            getScrollLeft().then(function (initialScrollLeft) {
                expect(initialScrollLeft).toBe(0);
            });
        });

        it('should increase offset when clicking right navigation arrow', function () {
            getScrollLeft().then(function (initialScrollLeft) {
                rightArrow.click().then(getScrollLeft).then(function (newScrollLeft) {
                    expect(initialScrollLeft).toBeLessThan(newScrollLeft);
                });
            });
        });

        it('should decrease offset when clicking left navigation arrow', function () {
            // Click right arrow to increase offset, because it can't go below initial 0.
            rightArrow.click().then(getScrollLeft).then(function (initialScrollLeft) {
                leftArrow.click().then(getScrollLeft).then(function (newScrollLeft) {
                    expect(initialScrollLeft).toBeGreaterThan(newScrollLeft);
                });
            });
        });

    });
});
