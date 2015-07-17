'use strict';

var paths = require('./.yo-rc.json')['generator-gulp-angular'].props.paths;

// An example configuration file.
exports.config = {
    // The address of a running selenium server.
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

    // Capabilities to be passed to the webdriver instance.
    multiCapabilities: [{
        'browserName': 'chrome'
    }, {
        'browserName': 'firefox'
    }],

    baseUrl: 'http://localhost:3000',

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: [paths.e2e + '/**/*.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};

// If running on TravisCI, use only firefox.
if (process.env.TRAVIS) {
    exports.config.multiCapabilities = [{
        'browserName': 'firefox'
    }];
    exports.config.sauceUser = process.env.SAUCE_USERNAME;
    exports.config.sauceKey = process.env.SAUCE_ACCESS_KEY;
    exports.config.capabilities = {
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER
    };
}
