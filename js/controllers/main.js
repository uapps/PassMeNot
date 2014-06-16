angular.module('PassMeNot.controllers.main', [])

  .controller('MainCtrl', ['$scope', 'Store', 'Share', '$timeout', '$location',
      function ($scope, Store, Share, $timeout, $location) {

          $scope.subjects = [ ]
          $scope.aims = [ ]
          $scope.subject = { }
          $scope.identity = angular.identity
          $scope.sharedGrades = Share.isShared()

          $scope.initialize = function () {
              if ($scope.sharedGrades) {
                  $timeout(function() {
                      try {
                          var shared = Share.getShared()
                          $scope.subjects = shared['subjects']
                          $scope.aims = shared['aims']
                      } catch(e) {
                          $location.path('/')
                      }
                  }, 10)
              }
              $scope.restore()
          }

          $scope.toggle = function() {}

          $scope.backToResults = function() {
              $location.path('/')
          }

          $scope.restore = function() {
              if (Store.has('subjects') && Store.valid('subjects') && !$scope.sharedGrades) $scope.subjects = Store.get('subjects')
              else $scope.subjects = []
              if (Store.has('aims') && Store.valid('aims') && !$scope.sharedGrades) $scope.aims = Store.get('aims')
              else $scope.aims = []
          }

          $scope.shareUrl = function () {
              return Share.url()
          }

          $scope.add = function() {
              if ($scope.subject.outOfWeight) $scope.subject.caMark = parseInt((($scope.subject.caMark / $scope.subject.caWeight) * 100).toFixed(0))
              var pos = indexOf($scope.subject.name)
              if(pos) $scope.subjects[pos] = angular.copy($scope.subject)
              else $scope.subjects.unshift(angular.copy($scope.subject))
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
              if (!$scope.sharedGrades) {
                  var subjects = angular.copy($scope.subjects)
                  Store.set('subjects', subjects)
              }
          }, true)

          $scope.$watch('aims', function() {
              if (!$scope.sharedGrades) {
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

          $scope.addFromShare = function(subject) {
            var subjects = Store.has('subjects') ? Store.get('subjects') : []
            subjects.push(subject)
            Store.set('subjects', subjects)
          }

          $scope.initialize()
      }])