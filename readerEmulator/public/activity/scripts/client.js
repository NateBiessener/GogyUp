var myApp = angular.module('myApp', ['ngRoute']);

var appMgr = window.parent.g_appMgr;

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

myApp.controller('mainController', ['$scope', '$location', 'SpellingFactory', function($scope, $location, SpellingFactory){

  console.log(window.parent.stuff);

  $scope.speakSentence = function(){
    responsiveVoice.speak(window.parent.stuff.sentence);
  };

  $scope.speakWord = function(){
    responsiveVoice.speak(window.parent.stuff.word.fullWord);
  };

  //send dataIn to Factory
  SpellingFactory.storeObject(window.parent.stuff);
  appMgr.dataLoad(window.parent.stuff.activityTitle, function(data){
    console.log(data);
    if (data) {
      SpellingFactory.setDataOut(data);
      if (data.attempts.attemptTwo) {
        $location.url('/thirdTry');
      } else if (data.attempts.attemptOne) {
        $location.url('/secondTry');
      }
    }
  });
  var sentence = window.parent.stuff.sentence;
  var word = window.parent.stuff.word.fullWord;
  console.log(sentence);
  $scope.displaySentence = function(){
    $scope.showSentence = sentence.replace(word,"_______");
  };
  console.log($scope.displaySentence);
  $scope.getRidOfMe = function(){
    var currentTime = Date.now();
    SpellingFactory.finishTime(currentTime);
    var dataOut = SpellingFactory.getDataOut();
    appMgr.dataSave(dataOut.activityTitle, dataOut, function(){
      appMgr.setActivityComplete();
    });
  };
}]);
