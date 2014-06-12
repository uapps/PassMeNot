angular.module('PassMeNot.controllers.main', [])

  .controller('MainCtrl', ['$scope', '$routeParams', 'Store', '$timeout', 'Share',
        function ($scope, $routeParams, Store, $timeout, Share) {

	  $scope.identity = angular.identity;
	  $scope.subject = {};
      $scope.sharedGrades = Share.isShared();

      $scope.initialize = function () {
          if ($scope.sharedGrades) {
              $scope.subjects = JSON.parse(atob($routeParams.subjects))
              $scope.aims = JSON.parse(atob($routeParams.aims))
          }

          if (Store.has('subjects') && Store.valid('subjects') && !$scope.sharedGrades)
              $scope.subjects = Store.get('subjects')
          if (Store.has('aims') && Store.valid('aims') && !$scope.sharedGrades)
              $scope.aims = Store.get('aims')
      }

      $scope.shareUrl = function () {
          return Share.url();
      }

	  $scope.add = function() {
		  var pos = indexOf($scope.subject.name)
		  if(pos) $scope.subjects[pos] = angular.copy($scope.subject)
		  else $scope.subjects.push(angular.copy($scope.subject))
		  $scope.subject = { }
	  }

	  $scope.remove = function(name){
		  var pos = indexOf(name)
		  if(pos) $scope.subjects.splice(pos, 1)
	  }

	  $scope.addAim = function() {
		  var form = this.addAimForm
		  var newAim = form.newAim.$modelValue

		  if(form.$valid){
			  if($scope.aims.indexOf(newAim) == -1) {
				  $scope.aims.push(newAim)
			  }
			  form.$setPristine()
		  }
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
		  var totalFromCa = subject.caWeight * (subject.caMark / 100)
		  return (((desiredOverallMark - totalFromCa) / (100 - subject.caWeight)) * 100).toPrecision(3)
	  }

	  $scope.$watch('subjects', function() {
          if (!$routeParams.aims && !$routeParams.subjects) {
              var subjects = angular.copy($scope.subjects)
              Store.set('subjects', subjects)
          }
	  }, true)

	  $scope.$watch('aims', function() {
          if (!$routeParams.aims && !$routeParams.subjects) {
              var aims = angular.copy($scope.aims)
              Store.set('aims', aims)
          }
	  }, true)

	  var indexOf = function(name){
		  for(var key in $scope.subjects){
			  if($scope.subjects[key].name == name)
				  return key
		  }
		  return false
	  }

	  $scope.initialize()
  }])