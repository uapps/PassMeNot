angular.module('PassMeNot', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {templateUrl: 'partials/main.html', controller: 'Controller'})
			.when('/:subjects/:aims', {templateUrl: 'partials/main.html', controller: 'Controller'})
			.otherwise({redirectTo: '/'})
	}])

    .factory('Store', function() {
        return {
            get: function(name) {
                return JSON.parse(atob(localStorage[name]))
            },
            set: function(name, value) {
                if (value) localStorage[name] = btoa(JSON.stringify(value))
            },
            has: function(name) {
                return !!localStorage[name]
            },
            empty:function(name) {
                localStorage[name] = null
            },
            valid: function(name, value) {
                var valid;
                try {
                    if (value) valid = JSON.parse(atob(value))
                    else valid = JSON.parse(atob(localStorage[name]))
                } catch(err) {
                    valid = false
                }
                return valid
            }
        }
    })

	.controller('Controller', ['$scope', '$routeParams', 'Store', function ($scope, $routeParams, Store) {
		$scope.initialize = function() {
			if (Store.has('subjects') && Store.valid('subjects')) $scope.subjects = Store.get('subjects')
			else $scope.subjects = []
            if (Store.has('aims') && Store.valid('aims')) $scope.aims = Store.get('aims')
            else $scope.aims = [40]
		}

		$scope.add = function(){
			var pos = indexOf($scope.subject.name)
			if(pos) $scope.subjects[pos] = angular.copy($scope.subject)
			else $scope.subjects.push(angular.copy($scope.subject))
			$scope.subject = {}
			$scope.addSubject.$setPristine()
		}

		$scope.remove = function(name){
			var pos = indexOf(name)
			if(pos) $scope.subjects.splice(pos, 1)
		}

        $scope.addAim = function(newAim) {
            $scope.aims.push(newAim)
            $scope.newAim = ''
        }

        $scope.removeAim = function(aim) {
            for (var i = 0; i < $scope.aims.length; i++) {
                if ($scope.aims[i] == aim) {
                    $scope.aims.splice(i, 1)
                    break
                }
            }
        }

        $scope.acceptsMoreAims = function() {
            return $scope.aims.length > 2
        }

        $scope.calculateExamMark = function(desiredOverallMark, subject) {
            var x = subject.caPercent * (subject.caMark / 100)
            return (((desiredOverallMark - x) / (100 - subject.caPercent)) * 100).toPrecision(3)
        }

		$scope.$watch('subjects', function() {
            var subjects = angular.copy($scope.subjects)
			Store.set('subjects', subjects)
		}, true);

        $scope.$watch('aims', function() {
            var aims= angular.copy($scope.aims)
            Store.set('aims', aims)
        }, true);

		indexOf = function(name){
			for(var key in $scope.subjects){
				if($scope.subjects[key].name == name)
					return key
			}
			return false
		}

		if ($routeParams.subjects && Store.valid('subjects', $routeParams.subjects
            && $routeParams.aims && Store.valid('aims', $routeParams.aims))) {
            var subjects = JSON.parse(atob($routeParams.subjects))
            var aims= JSON.parse(atob($routeParams.aims))
			Store.set('subjects', subjects)
            Store.set('aims', aims)
		}

		$scope.initialize()
	}])

	.directive('caMarkValidate', [function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			scope: {
				"caPercent": "="
			},
			link: function (scope, iElement, iAttrs, ctrl) {

				var isNumeric = function(s){
					return (+s).toString() === s
				}

				var validMark = function(mark){
					if(mark == undefined) return true
					if(!isNumeric(mark) || scope.caPercent == undefined || mark > 100) return false
					return true
				}

				ctrl.$parsers.unshift(function(value) {
					var valid = validMark(value)
					ctrl.$setValidity('maxMark', valid)
					return valid ? value : undefined
				})

				ctrl.$formatters.unshift(function(value){
					ctrl.$setValidity('maxMark', validMark(value))
					return value
				})

			}
		};
	}])