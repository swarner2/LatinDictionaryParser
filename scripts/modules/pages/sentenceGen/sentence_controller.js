app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when("/sentence" , {
      templateUrl: 'html/sentence.html',
      controller: 'sentenceController'
    });
}]);

app.controller('sentenceController', ['$scope', function($scope){
  $scope.nouns = dictionary.nouns;
  // $scope.verbs = dictionary.verbs;
  function randomWord(partOfSpeech){
    var index = Math.floor(Math.Random() * dictionary[partOfSpeech].length);
    return dictionary[partOfSpeech][index];
  }
  function getActor(){
  }
}]);
