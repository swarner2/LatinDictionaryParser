app.directive('noteCard', function(){
  return {
    templateUrl : "html/noteCard_directive.html",
    controller : ["$scope", function($scope){
      $scope.formatValue = function(attribute, value){
         return attribute === 'types' ? value.join() : value;
       };

    }],
  };
});
