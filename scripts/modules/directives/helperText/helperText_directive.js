app.directive('helperText',function(){
  return {
    templateUrl: "html/helperText_directive.html",
    controller: ['$scope', function($scope){
      console.log($scope.sentence);
        $scope.words = [];
      for(var key in $scope.sentence){
        if (Array.isArray($scope.sentence[key])) {
        }
        else {
            $scope.words.push($scope.sentence[key]);
        }
      }
    }]
  };
});
