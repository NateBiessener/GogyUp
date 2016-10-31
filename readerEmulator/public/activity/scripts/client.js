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

  // console.log(appMgr.spellingData);

  $scope.speakSentence = function(){
    responsiveVoice.speak(appMgr.spellingData.sentence);
  };

  $scope.speakWord = function(){
    responsiveVoice.speak(appMgr.spellingData.word.fullWord);
  };

  //send dataIn to Factory
  SpellingFactory.storeObject(appMgr.spellingData);
  appMgr.dataLoad(appMgr.spellingData.activityTitle, function(data){
    // console.log(data);
    if (data) {
      SpellingFactory.setDataOut(data);
      if (data.attempts.attemptTwo) {
        $location.url('/thirdTry');
      } else if (data.attempts.attemptOne) {
        $location.url('/secondTry');
      }
    }
  });
  var sentence = appMgr.spellingData.sentence;
  var word = appMgr.spellingData.word.fullWord;
  console.log(sentence);
  $scope.displaySentence = function(){
    $scope.showSentence = sentence.replace(word,"_______");
  };
  // console.log($scope.displaySentence);
  $scope.getRidOfMe = function(){
    var currentTime = Date.now();
    SpellingFactory.finishTime(currentTime);
    var dataOut = SpellingFactory.getDataOut();
    appMgr.dataSave(dataOut.activityTitle, dataOut, function(){
      appMgr.setActivityComplete();
    });
  };

  $scope.allLetter = SpellingFactory.displayWord();
}]);
