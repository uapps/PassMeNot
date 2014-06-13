angular.module('PassMeNot.directives.tiles', [])

  .directive('tiles', [ '$timeout', function($timeout) {
	  return {
		  restrict: 'E',
		  transclude: true,
		  replace: true,
		  controller: [ '$scope', '$element', function($scope, $element) {
			  var MAX_TILES = 2
			  $scope.flipped = false
			  var tiles = $scope.tiles = [ ]
			  this.addTile = function(tile) {
				  if (tiles.length == MAX_TILES) return
				  if (tiles.length == 0) tile.selected = true
				  tiles.push(tile)
			  }
			  $scope.toggleTiles = function() {
				  angular.forEach($scope.tiles, function(tile) {
					  tile.selected = !tile.selected
				  })
			  }
			  $scope.toggle = function() {
				  var element = angular.element($element).addClass('flip')
				  $timeout(function() {
					  $timeout(function() {element.removeClass('flip flip-back')}, 125)
					  $scope.flipped = !$scope.flipped
					  $scope.toggleTiles()
					  element.addClass('flip-back')
				  }, 125)
			  }
		  }],
		  template: '<div class="form-box" ><div ng-transclude></div></div>'
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