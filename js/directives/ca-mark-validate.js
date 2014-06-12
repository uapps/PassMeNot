angular.module('PassMeNot.directives.caMarkValidate', [])

  .directive('caMarkValidate', [function () {
	  return {
		  restrict: 'A',
		  require: 'ngModel',
		  scope: {
			  "caWeight": "="
		  },
		  link: function (scope, iElement, iAttrs, ctrl) {

			  var isNumeric = function(s){
				  return (+s).toString() === s
			  }

			  var validMark = function(mark){
				  if(mark == undefined) return true
				  if(!isNumeric(mark) || scope.caWeight == undefined || mark > 100) return false
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
	  }
  }])