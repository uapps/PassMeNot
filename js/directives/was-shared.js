angular.module('PassMeNot.directives.was-shared', [])

    .directive('wasShared', [function () {
        return {
            link: function (scope, element) {
                element.bind('click', function () {
                    element.replaceWith(
                        "<small class='pull-right text-success'>saved</small>"
                    )
                });
            }
        }
    }]);