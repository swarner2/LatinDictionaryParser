app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when("/sentence" , {
      templateUrl: 'html/sentence.html',
      controller: 'sentenceController'
    });
}]);

app.controller('sentenceController', ['$scope', function($scope){
  var randomNumber = random(['sg', 'pl']);
  $scope.helperText = {'visibility' : 'hidden'};
  $scope.nouns = dictionary.nouns;
  $scope.subject = subject();
  $scope.place = placeWhere();
  $scope.directObject = directObject();
  $scope.sentence = {
      latin : [$scope.subject, $scope.place, $scope.directObject ],
      english : [$scope.subject, $scope.directObject, $scope.place ],
  };
  // $scope.verbs = dictionary.verbs;
  // + " in " + place.stem + place.ending + " " + directObject.stem + directObject.ending;



  function subject(){
    var subject = pickNoun('person');
    if(randomNumber === 'sg'){
      subject.stem = subject.firstDict;
      subject.ending = '';
      subject.meaning = 'the ' + subject.meaning + ' verbs';
    }
    else {
      subject.meaning = 'the ' + subject.meaning + 's verb';
      subject.ending = grammar.nominative[randomNumber][subject.declension + subject.gender];
    }
    return subject;
  }

  function placeWhere(){
    var prep = ' in';
    var place = pickNoun('place');
    place.ending = grammar.ablative[randomNumber][place.declension + place.gender];
    place.meaning = randomNumber === 'sg' ? prep + ' the ' + place.meaning : prep + ' the ' + place.meaning + 's';
    return place;
  }

  function directObject(){
    var directObject = pickNoun('any');
    directObject.ending = grammar.accusative[randomNumber][directObject.declension + directObject.gender];
    if (directObject.ending === 'firstDict') {
      directObject.stem = directObject.firstDict;
      directObject.ending = '';
    }
    directObject.meaning = randomNumber === 'sg' ? ' the ' + directObject.meaning : ' the ' + directObject.meaning + 's';
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
  $scope.getHelp = function(noun, bool){
    $scope.help = noun;
    $scope.helperText = {
      "visibility" : 'hidden'
    };
    if (bool) {
      $scope.helperText = {
        "visibility" : 'visable'
      };
    }
    //"First Entry: " + word.firstDict + ", stem/declension: " + word.stem + " /" + word.declension;
  };
}]);
