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
    $scope.verbs = dictionary.verbs;
    $scope.words = [];
      $scope.verbs.forEach(function(word){$scope.words.push(word);});
      $scope.nouns.forEach(function(word){$scope.words.push(word);});
}]);
