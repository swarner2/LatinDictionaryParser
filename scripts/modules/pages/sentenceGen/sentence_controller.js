app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when("/sentence" , {
      templateUrl: 'html/sentence.html',
      controller: 'sentenceController'
    });
}]);

app.controller('sentenceController', ['$scope', function($scope){
  var randomNumber = random(['sg','pl']);
  $scope.nouns = dictionary.nouns;
  $scope.subject = pickNoun('person');
  $scope.place = pickNoun('place');
  $scope.placeEnding = grammar.ablative[randomNumber][$scope.place.declension + $scope.place.gender];
  $scope.directObject = pickNoun('person');
  // $scope.verbs = dictionary.verbs;

  //random takes an array and gives back a random value of that array
  function random(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  //pickNoun takes a string to check the type of a noun
  function pickNoun(type){
    return random(dictionary.nouns.filter( function(x){
      return x.types == type;
    }));
  }

}]);
