var myApp = angular.module('myApp', ['ngRoute']);

myApp.directive('draggable', function() {
  return function(scope, element) {
    // this gives us the native JS object
    var el = element[0];

    el.draggable = true;

    el.addEventListener(
      'dragstart',
      function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', this.id);
        this.classList.add('drag');
        return false;
      },
      false
    );

    el.addEventListener(
      'dragend',
      function(e) {
        this.classList.remove('drag');
        return false;
      },
      false
    );
  }
});

myApp.directive('droppable', function() {
  return {
    scope: {
      drop: '&',
      bin: '='
    },
    link: function(scope, element) {
      // again we need the native object
      var el = element[0];

      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
          // allows us to drop
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      );

      el.addEventListener(
        'drop',
        function(e) {
          // Stops some browsers from redirecting.
          if (e.stopPropagation) e.stopPropagation();

          this.classList.remove('over');
          // console.log(this);
          // var binId = this.id;
          var item = document.getElementById(e.dataTransfer.getData('Text'));
          // for (var prop in item) {
          //   console.log(prop, item[prop]);
          // }
          var letter = item.innerText;
          var index = item.id[item.id.length - 1];
          // this.appendChild(item);
          // call the passed drop function
          scope.$apply(function(scope) {
            var fn = scope.drop();
            if ('undefined' !== typeof fn) {
              fn(letter, index);
            }
          });

          return false;
        },
        false
      );
    }
  }
});

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

myApp.controller('mainController', ['$scope', '$location', '$sce', 'SpellingFactory', function($scope, $location, $sce, SpellingFactory){

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
      if (data.score) {
        switch (data.score) {
          case 3:
            $location.url('firstTry');
            break;
          case 2:
            $location.url('secondTry');
            break;
          case 1:
            $location.url('thirdTry');
            break;
          default:
            console.log('invalid score passed in');
        }
      } else if (data.attempts.attemptTwo) {
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
    $scope.displaySent = $sce.trustAsHtml(sentence.replace(word,"_______"));
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
