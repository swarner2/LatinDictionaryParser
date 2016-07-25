app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when("/sentence" , {
      templateUrl: 'html/sentence.html',
      controller: 'sentenceController'
    });
}]);

app.controller('sentenceController', ['$scope', function($scope){
  var randomNumber = random(['sg', 'pl']);
  $scope.nouns = dictionary.nouns;
  $scope.subject = subject();
  $scope.place = placeWhere();
  $scope.directObject = directObject();
  // $scope.verbs = dictionary.verbs;
  // $scope.sentence.latin = subject.stem + subject.ending + " in " + place.stem + place.ending + " " + directObject.stem + directObject.ending;

  function subject(){
    var subject = pickNoun('person');
    if(randomNumber === 'sg'){
      subject.stem = subject.firstDict;
      subject.ending = '';
    }
    else {
      subject.ending = grammar.nominative[randomNumber][subject.declension + subject.gender];
    }
    return subject;
  }
  function placeWhere(){
    var place = pickNoun('place');
    place.ending = grammar.ablative[randomNumber][place.declension + place.gender];
    return place;
  }
  function directObject(){
    var directObject = pickNoun('any');
    directObject.ending = grammar.accusative[randomNumber][directObject.declension + directObject.gender];
    if (directObject.ending === 'firstDict') {
      directObject.stem = directObject.firstDict;
      directObject.ending = '';
    }
    return directObject;
  }
  //random takes an array and gives back a random value of that array
  function random(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }
  //pickNoun takes a string to check the type of a noun
  //any takes all nouns
  function pickNoun(type){
    if (type === 'any') { return random(dictionary.nouns); }
    return random(dictionary.nouns.filter( function(x){
      return x.types == type;
    }));
  }

}]);
