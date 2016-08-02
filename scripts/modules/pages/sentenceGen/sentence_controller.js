app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when("/sentence" , {
      templateUrl: 'html/sentence.html',
      controller: 'sentenceController'
    });
}]);

app.controller('sentenceController', [
  '$scope','utilities', 'nounUtilities', '$rootScope',
  function($scope, utilities, nounUtilities, $rootScope){

  $scope.helperText = {'visibility' : 'hidden'};
  $scope.nouns = dictionary.nouns;

  $scope.sentence = new nounUtilities.transitiveSentence($scope);

  $scope.test = function(input){
    var correctness = true;
    if(input === undefined){
      $scope.answerStyle = {'text-shadow' : '1px 5px 13px black'};
      return 'Type into the Search Box to answer the Question!';
    }
    input = input.trim().replace(/\s\s*/g,' ').split('');
    answer = $scope.sentence.latin.join('').trim().replace(/\s\s*/g, ' ').split('');
    input.forEach(function(letter, i){
       if(letter !== answer[i]){correctness = false;}
    });
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
    if(noun === this.sentence.placeWhere.prep){
      noun = this.sentence.placeWhere;
    }

    //catch the endings
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
    var isEnding = false;
    if(noun === undefined){
      isEnding = true;
      stem = this.$$prevSibling.nounPart;
      endingInfo = this.sentence.english.filter(function(v){
        return v.stem == stem;
      })[0];
      var noun = {};
      noun.gender = endingInfo.gender;
      noun.number = endingInfo.number;
      noun.case = endingInfo.case;
      noun.declension = endingInfo.declension;
    }

    $scope.help = isEnding === true ? noun : noun.noun;

    //set visibility of the card
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
      $scope.sentence = new nounUtilities.transitiveSentence($scope);
      $rootScope.searchText = '';
      $scope.latinStyle = {'visibility' : 'hidden'};
      $rootScope.$digest();
    }
  };
}]);
