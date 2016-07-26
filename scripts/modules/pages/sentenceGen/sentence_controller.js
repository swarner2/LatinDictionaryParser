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
      latin : [$scope.subject, $scope.place, $scope.directObject ],
      english : [$scope.subject, $scope.directObject, $scope.place ],
  };


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
  };
}]);
