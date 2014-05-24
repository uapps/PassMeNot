angular.module('pass-me-not.templates', ['/pass-me-not/share.html']);

angular.module("/pass-me-not/share.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("/pass-me-not/share.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">Share your grades with your friends !</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    Send your friends the following link\n" +
    "    <div class=\"\"></div>\n" +
    "    <textarea rows=\"4\" class=\"form-control\">{{url}}{{subjects}}/{{aims}}</textarea>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-danger btn-block\" ng-click=\"close()\">Close</button>\n" +
    "</div>");
}]);
