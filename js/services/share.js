angular.module('PassMeNot.services.share', [])

    .factory('Share', ['$location', '$window', '$routeParams',
        function ($location, $window, $routeParams) {
            return {
                url: function () {
                    var url = $window.location.href;
                    var subjects = $window.localStorage.subjects;
                    var aims = $window.localStorage.aims;
                    return url + subjects + '/' + aims
                },

                isShared: function () {
                    return !!($routeParams.subjects && $routeParams.aims);
                },

                getShared: function () {
                    var subjects = JSON.parse(atob($routeParams.subjects));
                    var aims = JSON.parse(atob($routeParams.aims));
                    return {subjects: subjects, aims: aims};
                }
            }
        }]);