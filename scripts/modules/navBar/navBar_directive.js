app.directive('navBar', function(){
  return {
    scope : {
      searchText : '='
    },
    templateUrl: 'html/navBar_directive.html',
    controller: ['$scope', function($scope){
    }]
  };
});
