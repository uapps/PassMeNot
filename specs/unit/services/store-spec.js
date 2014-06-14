'use strict';

describe('Store', function () {
    beforeEach(function () {
        module('PassMeNot');

        delete localStorage['test'];
    });

    it('Should place an object in local storage', inject(function (Store) {
        Store.set('test', {name: 'alan'});
        expect(localStorage['test']).toBeDefined();
    }));

    it('Should get an object from local storage', inject(function (Store) {
        Store.set('test', {name: 'alan'});
        expect(Store.get('test')).toBeObject();
    }));

    it('Should check the presence on an object in local storage', inject(function (Store) {
        Store.set('test', {name: 'alan'});
        expect(Store.has('test')).toBeTrue();
    }));

    it('Should remove an object from local storage', inject(function (Store) {
        Store.set('test', {name: 'alan'});
        Store.empty('test');
        expect(Store.has('test')).toBeFalse();
    }));
});