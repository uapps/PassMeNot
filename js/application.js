'use strict'

angular.module('PassMeNot', [
	'ngRoute',
	'ngAnimate',
	'PassMeNot.controllers',
	'PassMeNot.services',
	'PassMeNot.directives'
])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {templateUrl: 'partials/main.html', controller: 'MainCtrl'})
			.when('/:subjects/:aims', {templateUrl: 'partials/main.html', controller: 'MainCtrl'})
			.otherwise({redirectTo: '/'})
	}])