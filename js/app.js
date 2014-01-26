angular.module('PassMeNot', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {templateUrl: 'partials/main.html', controller: 'Controller'})
			.when('/:state', {templateUrl: 'partials/main.html', controller: 'Controller'})
			.otherwise({redirectTo: '/:state'})
	}])

	.controller('Controller', ['$scope', '$routeParams', function ($scope, $routeParams) {
		$scope.initialize = function() {
			if (hasStore() && validStore()) $scope.subjects = getStore()
			else $scope.subjects = []
		}

		$scope.add = function(){
			if($scope.subject){
				$scope.subject.percent40 = calculateExamMark(40)
				$scope.subject.percent55 = calculateExamMark(55)
				$scope.subject.percent70 = calculateExamMark(70)

				var pos = indexOf($scope.subject.name)
				if(pos) $scope.subjects[pos] = angular.copy($scope.subject)
				else $scope.subjects.push(angular.copy($scope.subject))
				$scope.subject = null
			}
		}
		$scope.remove = function(name){
			var pos = indexOf(name)
			if(pos) $scope.subjects.splice(pos, 1)
		}

		$scope.$watch('subjects', function() {
			setStore()
		}, true);

		indexOf = function(name){
			for(var key in $scope.subjects){
				if($scope.subjects[key].name == name)
					return key
			}
			return false
		}

		calculateExamMark = function(desiredOverallMark) {
			return ((100*(desiredOverallMark-$scope.subject.caMark))/(100-$scope.subject.caPercent))
		}

		setStore = function(store) {
			if (store) localStorage['store'] = store
			else localStorage['store'] = btoa(JSON.stringify(angular.copy($scope.subjects)))
			$scope.state = localStorage['store']
		}

		getStore = function() {
			return JSON.parse(atob(localStorage['store']))
		}

		hasStore = function() {
			return !!localStorage['store']
		}

		emptyStore = function() {
			localStorage['store'] = null
		}

		validStore = function(store) {
			try {
				if (store) valid = JSON.parse(atob(store))
				else valid = JSON.parse(atob(localStorage['store']))
			} catch(err) {
				valid = false
			}
			return valid
		}

		if ($routeParams.state && validStore($routeParams.state)) {
			setStore($routeParams.state)
		}

		$scope.initialize()
	}])