app.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when("/home", {
      templateUrl: 'html/home.html',
      controller: 'homeController'
    })
    .when("/", {
        templateUrl: 'html/home.html',
        controller: 'homeController'
    });
}]);

app.controller('homeController',function(){});
