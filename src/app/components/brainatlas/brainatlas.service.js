/* global _, $ */

(function() {
    'use strict';

    angular
        .module('brainatlasGallery')
        .factory('BrainatlasImages', ['$http', '$q', function($http, $q) {
            return function(geneIds) {
                // Check if geneIds is an array and wrap the value in array if it's not, remove falsey values and
                // convert to object { geneId: ... } - the value is not important.
                geneIds = _.invert(_.compact(_.isArray(geneIds) ? geneIds : [geneIds]));
                if (_.isEmpty(geneIds)) {
                    // Resolve immediately with empty object.
                    return $q.resolve({});
                }
                // Base url of brainmap API.
                var baseUrl = 'http://api.brain-map.org/api/v2';
                /**
                 * @param  {string} geneId Id of selected gene.
                 * @return {string}        Url to SectionDataSet API query for given gene.
                 */
                var sectionDataUrl = function(geneId) {
                    return baseUrl + "/data/query.json?criteria=model::SectionDataSet,rma::criteria," +
                        "[failed$eq'false'],products[abbreviation$eq'Mouse'],genes[entrez_id$eq{}]".replace('{}', geneId);
                };
                /**
                 * @param  {number} sectionId Id of selected section/experiment.
                 * @return {string}           Url to SectionImage API query for given sectionId.
                 */
                var sectionImagesUrl = function(sectionId) {
                    return baseUrl + '/data/query.json?criteria=model::SectionImage,rma::criteria,' +
                        '[data_set_id$eq{}]'.replace('{}', sectionId);
                };
                // Base url to image download API endpoint.
                var imgApiUrl = baseUrl + '/section_image_download/';
                /**
                 * @param  {number}  downsample Factor of image reducing (0-6).
                 * @param  {number}  quality    Quality of outputted image (0-100).
                 * @param  {boolean} expression Is this image an expression (true) or ISH (false).
                 * @param  {number}  id         Id of selected section.
                 * @return {string}             Url to image with id and selected params - can be used as `img src="..."`.
                 */
                var imageUrl = _.curry(function(downsample, quality, expression, id) {
                    return imgApiUrl + id + '?' + $.param({ downsample: downsample, quality: quality, expression: expression });
                });
                // Regular: downsample 2, quality 70 (API default); thumbnail: downsample: 6 (max); full: original.
                var fns = { imgx: imageUrl(2, 70), imgxThumbnail: imageUrl(6, 70), imgxFull: imageUrl(0, 100) };
                /**
                 * @param  {object} img Response from SectionImage API query.
                 * @return {object}     Object of image metadata and image urls.
                 */
                var imageUrls = function(img) {
                    /**
                     * @param  {boolean} expValue API expression value.
                     * @param  {string}  name     Name of expression object to replace template with.
                     * @return {array}            Array of [key, image url] pairs - converted to object later.
                     */
                    var expFn = function(expValue, name) {
                        return _.map(fns, function(fn, key) { return [key.replace('x', name), fn(expValue, img.id)]; });
                    };
                    // Add width, height and 3 image urls for each ISH and Expression.
                    return _.extend({ width: img.width, height: img.height }, _.object(_.flatten(_.map({ ISH: false, Expression: true }, expFn))));
                };
                // Map gene id's to $http promises, return promise resolving with dict of {geneId: data} when all requests finish.
                // Inverted parameter order is used because `geneIds` structure: { geneId: {value} }.
                return $q.all(_.mapValues(geneIds, function(_i, geneId) {
                    // Return $http request resolving when image data for all section data is fetched.
                    return $http.get(sectionDataUrl(geneId)).then(function(sectionDataResponse) {
                        // Map all sectionData ids to image data request promises.
                        return $q.all(_.mapValues(_.invert(_.map(sectionDataResponse.data.msg, 'id')), function(_i, sectionId) {
                            // Return $http request promise for sectionId's image data request.
                            return $http.get(sectionImagesUrl(sectionId)).then(function(sectionImagesResponse) {
                                // Map SectionImage API response to image metadata + urls objects.
                                return _.map(sectionImagesResponse.data.msg, imageUrls);
                            });
                        }));
                    });
                }));
            };
        }]);
})();
