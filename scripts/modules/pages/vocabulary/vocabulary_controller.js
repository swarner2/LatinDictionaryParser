app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when("/vocabulary", {
      templateUrl: 'html/vocabulary.html',
      controller: 'vocabularyController'
    });
}]);

app.controller('vocabularyController',['$scope', function($scope){
  
}]);
