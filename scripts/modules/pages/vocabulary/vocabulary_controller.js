app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when("/vocabulary", {
      templateUrl: 'html/vocabulary.html',
      controller: 'vocabularyController'
    });
}]);

app.controller('vocabularyController',['$scope', function($scope){
   $scope.formatValue = function(attribute, value){
      return attribute === 'types' ? value.join() : value;
    };
    $scope.nouns = dictionary.nouns;
}]);
