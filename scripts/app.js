var app = angular.module("myApp", []);

app.controller("wordController", ["$scope", function($scope){
  $scope.nouns = dictionary.nouns;
}]);
