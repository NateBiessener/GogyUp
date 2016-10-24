var myApp = angular.module('myApp', []);

// angular routing
myApp.config(['$routeProvider', function($routeProvider){

  $routeProvider.
    when('/firstTry', {
      templateUrl: '../views/firstTry.html',
      controller: 'firstTryController'
    }).
    when('/secondTry', {
      templateUrl: '../views/secondTry.html',
      controller: 'secondTryController'
    }).
    when('/thirdTry', {
      templateUrl: '../views/thirdTry.html',
      controller: 'thirdTryController'
    }).
    otherwise({
      redirectTo: '/firstTry'
    });
}]); // end angular routing
