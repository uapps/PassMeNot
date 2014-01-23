angular.module('PassMeNot', [])
	.controller('Controller', function ($scope) {
		$scope.subjects = []

		$scope.add = function(){
			if($scope.subject){
				$scope.subject.percent40 = calculateExamMark(40)
				$scope.subject.percent55 = calculateExamMark(55)
				$scope.subject.percent70 = calculateExamMark(70)

				var pos = indexOf($scope.subject.name)
				if(pos)
					$scope.subjects[pos] = angular.copy($scope.subject)
				else
					$scope.subjects.push(angular.copy($scope.subject))

				$scope.subject = null
			}
		}
		$scope.remove = function(name){
			var pos = indexOf(name)
			if(pos)
				$scope.subjects.splice(pos, 1)
		}

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
	})