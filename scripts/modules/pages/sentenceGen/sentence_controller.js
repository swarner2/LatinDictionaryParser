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
    // console.log(this);
    // console.log(this.$$prevSibling.nounPart);
    // console.log(this.$index);
    if(noun === this.place.prep){noun = this.place;}
    //catch the endings
      // console.log(this.sentence.english);
      var checkEnding = this.sentence.english.filter(function(v){
        // console.log(v.ending);
        return v.ending == noun;
      });

    // console.log(checkEnding);
    //catch the stems
    if(typeof noun === 'string'){
        noun = this.sentence.english.filter(function(v){
          return v.stem == noun;
        })[0];
    }
    //catch the endings
    //they start out as undefined from catch the stems
    if(noun === undefined){
      stem = this.$$prevSibling.nounPart;
      endingInfo = this.sentence.english.filter(function(v){
        return v.stem == stem;
      })[0];
      var noun = {};
      noun.firstDict = this.nounPart;
      noun.gender = endingInfo.gender;
      noun.number = endingInfo.number;
      noun.case = endingInfo.case;
      noun.declension = endingInfo.declension;
    }
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
