'use strict';

describe('Brainatlas directive', function () {

    var allThumbnails, getParent;

    beforeEach(function () {
        browser.get('/index.html');
        allThumbnails = element.all(by.css('.brainatlas-thumbnail'));

        getParent = function (el) {
            return el.element(by.xpath('..'));
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
