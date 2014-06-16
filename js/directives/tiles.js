angular.module('PassMeNot.directives.tiles', [])

  .directive('tiles', [ '$timeout', function($timeout) {
	  return {
		  restrict: 'E',
		  transclude: true,
		  replace: true,
          scope: {
              className: '@',
              animation: '@',
              toggle: '='
          },
		  controller: [ '$scope', '$element', function($scope, $element) {
			  var tiles = $scope.tiles = [ ]
			  this.addTile = function(tile) {
				  if (tiles.length == 0) tile.selected = true
				  tiles.push(tile)
			  }
			  $scope.deselectTiles = function() {
				  angular.forEach($scope.tiles, function(tile) {
					  if (tile.selected) tile.selected = false
				  })
			  }
			  $scope.toggle = function(index) {
				  var element = angular.element($element).addClass($scope.animation)
				  $timeout(function() {
					  $timeout(function() {element.removeClass($scope.animation + ' ' + $scope.animation + '-back')}, 125)
					  $scope.deselectTiles()
                      $scope.tiles[index].selected = true
					  element.addClass($scope.animation + '-back')
				  }, 125)
			  }
		  }],
		  template: '<div class="{{className}}" ><div ng-transclude></div></div>'
	  }
  }])

  .directive('tile', [function() {
	  return {
		  restrict: 'E',
		  require: '^tiles',
		  transclude: true,
		  scope: {
              'toggle': '='
          },
		  replace: true,
          controller: [ '$scope', function($scope) {
          }],
		  link: function(scope, element, attrs, tilesCtrl) {
			  scope.selected = false
			  tilesCtrl.addTile(scope)
		  },
		  template: '<div ng-class="{hide:!selected}" ng-transclude></div>'
	  }
  }])