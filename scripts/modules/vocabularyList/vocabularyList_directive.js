app.directive('vocabularyList', function(){
  return {
    scope : {
      
    },
    templateUrl: 'html/vocabularyList_directive.html',
    controller: ['$scope', function($scope){
        $scope.nouns = dictionary.nouns;
    }]
  };
});
