angular.module('PassMeNot.directives.caMarkValidate', [])

  .directive('caMarkValidate', [function () {
	  return {
		  restrict: 'A',
		  require: 'ngModel',
		  scope: {
			  "caWeight": "=",
              "outOfWeight": "="
		  },
		  link: function (scope, iElement, iAttrs, ctrl) {

			  var isNumeric = function(s){
				  return (+s).toString() === s
			  }

			  var validMark = function(mark){
                  var MAX = 100;
				  if(mark == undefined) return true
                  if(scope.outOfWeight) MAX = scope.caWeight
				  if(!isNumeric(mark) || scope.caWeight == undefined || mark > MAX) return false
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

              scope.$watch('outOfWeight', function() {
                  if (iElement.val()) ctrl.$setValidity('maxMark', validMark(iElement.val()))
              })

		  }
	  }
  }])