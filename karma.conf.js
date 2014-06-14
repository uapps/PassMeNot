'use strict';

module.exports = function (config) {
    config.set({
        basePath: './',
        plugins: ['karma-jasmine', 'karma-phantomjs-launcher'],
        frameworks: ['jasmine'],
        files: [
            'lib/angular/angular.js',
            'lib/angular/angular-route.js',
            'lib/angular/angular-animate.js',
            'lib/angular/angular-mocks.js',
            'node_modules/jasmine-expect/dist/jasmine-matchers.js',

            'js/**/*.js',
            'specs/unit/**/*-spec.js'
        ],
        exclude: [],
        preprocessors: {},
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false
    });
};