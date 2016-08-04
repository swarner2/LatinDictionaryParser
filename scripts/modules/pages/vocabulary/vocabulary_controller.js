app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when("/vocabulary", {
      templateUrl: 'html/vocabulary.html',
      controller: 'vocabularyController'
    });
}]);

app.controller('vocabularyController',['$scope','cards', function($scope, cards){
  // $scope.usedVerbs = dictionary.verbs;
  $scope.words = cards.getCards([dictionary.nouns, dictionary.verbs]);
}]);
