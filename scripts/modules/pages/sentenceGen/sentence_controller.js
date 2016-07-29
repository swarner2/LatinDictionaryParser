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

  $scope.test = function(input){
    var correctness = true;
    if(input === undefined){
      $scope.answerStyle = {'text-shadow' : '1px 5px 13px black'};
      return 'Type into the Search Box to answer the Qeustion!';
    }
    input = input.trim().replace(/\s\s*/g,' ').split('');
    answer = $scope.sentence.latin.join('').trim().replace(/\s\s*/g, ' ').split('');
    input.forEach(function(letter, i){
       if(letter !== answer[i]){correctness = false;}
    });
    console.log(correctness);
    if(correctness){
      $scope.answerStyle = {'text-shadow' : '5px 5px 23px #0555ff'};
    }
    else{
      $scope.answerStyle = {'text-shadow' : '2px 2px 10px red'};
    }
    return input.join('');
  };

  $scope.getHelp = function(noun, bool){
    //catch the prepositions
    if(noun === this.place.prep){noun = this.place;}
    //catch the endings
      // console.log(this.sentence.english);
      var checkEnding = this.sentence.english.filter(function(v){
        return v.ending == noun;
      });
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
  $scope.latinStyle = {'visibility' : 'hidden'};
  $scope.buttonText = 'Show Answer';
  $scope.toggleButton = function(){
    if($scope.buttonText === 'Show Answer'){
      $scope.latinStyle = {'visibility' : 'visible'};
      $scope.buttonText = 'Next Question';
    }
    else {
      $scope.buttonText = 'Show Answer';
      $scope.subject = nounUtilities.subject();
      $scope.place = nounUtilities.placeWhere();
      $scope.directObject = nounUtilities.directObject();
      $scope.sentence.latin = [
        $scope.subject.stem,
        $scope.subject.ending + " " ,
        $scope.place.prep,
        $scope.place.stem,
        $scope.place.ending + " ",
        $scope.directObject.stem,
        $scope.directObject.ending + " ",
      ];
     $scope.searchText = '';
    }
  };
}]);
