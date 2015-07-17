'use strict';

var path = require('path');
var conf = require('./gulp/conf');

var _ = require('lodash');
var wiredep = require('wiredep');

function listFiles() {
    var wiredepOptions = _.extend({}, conf.wiredep, {
        dependencies: true,
        devDependencies: true
    });

    return wiredep(wiredepOptions).js
        .concat([
      path.join(conf.paths.src, '/app/**/*.module.js'),
      path.join(conf.paths.src, '/app/**/*.js'),
      path.join(conf.paths.src, '/**/*.spec.js'),
      path.join(conf.paths.src, '/**/*.mock.js'),
      path.join(conf.paths.src, '/**/*.html')
    ]);
}

module.exports = function (config) {

    var configuration = {
        files: listFiles(),

        singleRun: true,

        autoWatch: false,

        frameworks: ['jasmine', 'angular-filesort'],

        reporters: ['dots'],

        angularFilesort: {
            whitelist: [path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).js')]
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/',
            moduleName: 'brainatlasGallery'
        },

        browsers: ['PhantomJS', 'Chrome', 'Safari', 'Firefox'],

        plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-sauce-launcher',
      'karma-angular-filesort',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor'
    ],

        preprocessors: {
            'src/**/*.html': ['ng-html2js']
        }
    };

    // This block is needed to execute Chrome on Travis
    // If you ever plan to use Chrome and Travis, you can keep it
    // If not, you can safely remove it
    // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
    if (process.env.TRAVIS) {
        // Check for SauceLabs information.
        if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
            console.error('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
            process.exit(1);
        }

        configuration.customLaunchers = {
            sl_chrome_windows81: {
                base: 'SauceLabs',
                browserName: 'chrome',
                platform: 'Windows 8.1'
            },
            sl_chrome_windows7: {
                base: 'SauceLabs',
                browserName: 'chrome',
                platform: 'Windows 7'
            },
            sl_chrome_linux: {
                base: 'SauceLabs',
                browserName: 'chrome',
                platform: 'linux'
            },
            sl_chrome_osx1010: {
                base: 'SauceLabs',
                browserName: 'chrome',
                platform: 'OS X 10.10'
            },
            sl_chrome_osx1009: {
                base: 'SauceLabs',
                browserName: 'chrome',
                platform: 'OS X 10.9'
            },
            sl_firefox_windows81: {
                base: 'SauceLabs',
                browserName: 'firefox',
                platform: 'Windows 8.1'
            },
            sl_firefox_windows7: {
                base: 'SauceLabs',
                browserName: 'firefox',
                platform: 'Windows 7'
            },
            sl_firefox_linux: {
                base: 'SauceLabs',
                browserName: 'firefox',
                platform: 'linux'
            },
            sl_firefox_osx1010: {
                base: 'SauceLabs',
                browserName: 'firefox',
                platform: 'OS X 10.10'
            },
            sl_firefox_osx1009: {
                base: 'SauceLabs',
                browserName: 'firefox',
                platform: 'OS X 10.9'
            },
            sl_safari_osx1010: {
                base: 'SauceLabs',
                browserName: 'safari',
                platform: 'OS X 10.10'
            },
            sl_safari_osx1009: {
                base: 'SauceLabs',
                browserName: 'safari',
                platform: 'OS X 10.9'
            },
            sl_ie11_windows81: {
                base: 'SauceLabs',
                browserName: 'internet explorer',
                platform: 'Windows 8.1',
                version: '11'
            },
            sl_ie11_windows7: {
                base: 'SauceLabs',
                browserName: 'internet explorer',
                platform: 'Windows 7',
                version: '11'
            },
            sl_iphone_ios8_safari: {
                base: 'SauceLabs',
                browserName: 'iphone',
                version: '8.2'
            },
            sl_ipad_ios8_safari: {
                base: 'SauceLabs',
                browserName: 'ipad',
                version: '8.2'
            },
            sl_iphone_ios7_safari: {
                base: 'SauceLabs',
                browserName: 'iphone',
                version: '7.1'
            },
            sl_ipad_ios7_safari: {
                base: 'SauceLabs',
                browserName: 'ipad',
                version: '7.1'
            }
        };

        configuration.sauceLabs = {
            testName: 'Brainatlas unit tests',
            connectOptions: {
                tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
            }
        };

        configuration.reporters.push('saucelabs');
        configuration.browsers = Object.keys(configuration.customLaunchers);
        configuration.captureTimeout = 120000;
    }

    config.set(configuration);
};
