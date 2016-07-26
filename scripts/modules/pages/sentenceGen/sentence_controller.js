app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when("/sentence" , {
      templateUrl: 'html/sentence.html',
      controller: 'sentenceController'
    });
}]);

app.controller('sentenceController', ['$scope','utilities', 'nounUtilities', function($scope, utilities, nounUtilities){
  var randomNumber = utilities.random(['sg', 'pl']);
  $scope.helperText = {'visibility' : 'hidden'};
  $scope.nouns = dictionary.nouns;
  $scope.subject = nounUtilities.subject();
  $scope.place = nounUtilities.placeWhere();
  $scope.directObject = nounUtilities.directObject();
  $scope.sentence = {
      latin : [
        $scope.subject.stem,
        $scope.subject.ending + " " ,
        $scope.place.prep,
        $scope.place.stem,
        $scope.place.ending + " ",
        $scope.directObject.stem,
        $scope.directObject.ending + " ",
      ],
      english : [$scope.subject, $scope.directObject, $scope.place ],
  };


  $scope.getHelp = function(noun, bool){
    //catch the prepositions
    if(noun === this.place.prep){noun = this.place;}
    //catch the endings

    
    //catch the stems
    if(typeof noun === 'string'){
        noun = this.sentence.english.filter(function(v){
          return v.stem == noun;
        })[0];

    }
    console.log(typeof noun);
    $scope.help = noun;
    $scope.helperText = {
      "visibility" : 'hidden'
    };
    if (bool) {
      $scope.helperText = {
        "visibility" : 'visable'
      };
    }
  };
}]);
