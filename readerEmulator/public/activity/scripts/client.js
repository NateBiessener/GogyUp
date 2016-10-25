var myApp = angular.module('myApp', ['ngRoute']);

var appMgr = window.parent.g_appMgr;

myApp.controller('mainController', ['$scope', function($scope){
  var sentence = window.parent.stuff.sentence;
  var word = window.parent.stuff.word.fullWord
  console.log(sentence);
  $scope.displaySentence = function(){
    $scope.showSentence = sentence.replace(word,"_______");
  };
  console.log($scope.displaySentence);
  $scope.getRidOfMe = function(){
    appMgr.setActivityComplete();
  };
}]);
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
