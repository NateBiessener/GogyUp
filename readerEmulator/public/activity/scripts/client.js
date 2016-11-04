var myApp = angular.module('myApp', []);

var appMgr = window.parent.g_appMgr;

myApp.controller('mainController', ['$scope', '$sce', 'SpellingFactory', function($scope, $sce, SpellingFactory){
  //marshall variables
  $scope.placedWord = [];
  $scope.placed = [];
  $scope.firstHint = false;
  $scope.secondHint = false;

  // console.log(appMgr.spellingData);

  $scope.speakSentence = function(){
    responsiveVoice.speak(appMgr.spellingData.sentence);
    SpellingFactory.speakSentenceClick();
  };

  $scope.speakWord = function(){
    responsiveVoice.speak(appMgr.spellingData.word.fullWord);
    SpellingFactory.speakWordClick();
  };

  //send dataIn to Factory
  SpellingFactory.storeObject(appMgr.spellingData);
  //***BROKEN, FOR NOW...****//
  var objectIn = appMgr.spellingData;
  $scope.correctWord = objectIn.word.fullWord;
  appMgr.dataLoad(appMgr.spellingData.activityTitle, function(data){
    // console.log(data);
    if (data) {
      SpellingFactory.setDataOut(data);

      if (data.score) {
        switch (data.score) {
          case 3:
            // $location.url('firstTry');
            break;
          case 2:
            // $location.url('secondTry');
            break;
          case 1:
            // $location.url('thirdTry');
            break;
          default:
            console.log('invalid score passed in');
        }
      } else if (data.attempts.attemptTwo) {
        // $location.url('/thirdTry');
      } else if (data.attempts.attemptOne) {
        // $location.url('/secondTry');
      }
    }
  });

  //***MAKE THIS CLEANER***//
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

  //used to toggle dislexia font
  $scope.dataSentence = true;


  var generateLetterTiles = function(){
    var possible = "abcdefghijklmnopqrstuvwxyz";
    console.log('in generateLetterTiles');
    var wordArray = [];
    //make word into an array of letters
    for(var i= 0; i< objectIn.word.fullWord.length; i++){
      wordArray.push(objectIn.word.fullWord.charAt(i));
    }
    var correctWordArray = wordArray;
    console.log(correctWordArray);
    //generate 2 random letters to add to array
    for( var j=0; j < 2; j++){
      wordArray.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }
    //shuffle letters into different positions on the array
    var shuffle = function(wordArray) {
      var m = wordArray.length, t, i;

      // While there remain elements to shuffle…
      while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = wordArray[m];
        wordArray[m] = wordArray[i];
        wordArray[i] = t;
      }
      var collapsed = wordArray.reduce(function(start, index){
        return start + index;
      });
      if (collapsed.includes(objectIn.word.fullWord)) {
        console.log('rescrambling');
        wordArray = generateLetterTiles();
      }
      return wordArray;
    }
    //the letters in wordArray will be mixed around
    return shuffle(wordArray);
  }; // end displayWord function
  //generate letter tiles onLoad
  $scope.allLetter = generateLetterTiles();

  //remove letter from generated tiles and place in playing field
  $scope.placeLetter = function(letter, index){
    console.log($scope.firstHint, $scope.secondHint);
    if ($scope.firstHint || $scope.secondHint){
      placedWord = $scope.placedWord.map(function(index){
        return index.letter;
      });
      if (placedWord.indexOf('_') >= 0) {
        $scope.placedWord[placedWord.indexOf('_')] = {letter: letter, placedIndex: index};
        $scope.placed[index] = true;
      }
    }
    else {
      $scope.placedWord.push({letter: letter, placedIndex: index});
      $scope.placed[index] = true;
    }
  }; // end placeLetter function

  $scope.removeLetter = function(index, placedIndex){
    if ($scope.firstHint || $scope.secondHint){
      $scope.placedWord[index] = {letter: '_', placedIndex: -1};
      $scope.placed[placedIndex] = false;
    }
    else {
      $scope.placedWord.splice(index, 1);
      $scope.placed[placedIndex] = false;
    }
  };// end removeLetter

  //changes class for correct letters so that they display as green tiles
  $scope.correctPlacement = function(placedWord){
    placedWord = placedWord.map(function(index){
      return index.letter;
    });
    $scope.change = [];
    for(var i = 0; i < $scope.correctWord.length; i++){
      if(placedWord[i] == $scope.correctWord[i]){
        console.log(true);
        $scope.change[i] = true;
      }//end if statement
    }//end for loop
  };//end correctPlacement

  $scope.checkSpelling = function(placedWord){
    var reducedWord = placedWord.map(function(index){
      return index.letter;
    });

    reducedWord = reducedWord.reduce(function(start, index){
      return start + index;
    });

    if(reducedWord === $scope.correctWord){
      $scope.correctAnswer = true;
      $scope.$parent.fireworks = true;
      var sentence = appMgr.spellingData.sentence;
      $scope.displaySent = $scope.underlineWords(sentence);
      SpellingFactory.setComplete();
      SpellingFactory.setScore();
    } else {
      $scope.correctPlacement(placedWord);
      $scope.$parent.shakeIt = true;
      $scope.incorrectAnswer = true;
    }

    // save current attempt timestamp
    var currentTime = Date.now();
    SpellingFactory.timeSave(currentTime);
  }; // end checkSpelling function

  $scope.tryAgain = function(){
    $scope.incorrectAnswer = false;
    $scope.$parent.shakeIt = false;

    $scope.placedWord = [];
    for (var i = 0; i < $scope.placed.length; i++) {
      $scope.placed[i] = false;
    }

    if (!($scope.firstHint || $scope.secondHint)){
       $scope.firstHint = true;
       for (var i = 0; i < $scope.correctWord.length; i++) {
         $scope.placedWord.push({letter: '_', placedIndex: -1});
         $scope.change[i] = false;
       }
    }
    else if ($scope.firstHint) {
      $scope.firstHint = false;
      $scope.secondHint = true;

      var placeGrapheme = function(){
        var targetArray = $scope.correctWord.split("");
        var splitGraph = objectIn.graphemeToLearn.split("");
        var graphemeIndex = $scope.correctWord.indexOf(objectIn.graphemeToLearn);

        j = 0;
        for (var i = 0; i < targetArray.length; i++) {
          if(i >= graphemeIndex && i <= (graphemeIndex + (objectIn.graphemeToLearn.length - 1))){
            $scope.placedWord.push({letter: splitGraph[j], placedIndex: i});
            j++;
          } else {
            $scope.placedWord.push({letter: "_", placedIndex: -1});
          }
          $scope.change[i] = false;
        }
        // console.log($scope.placedWord);
      } // end placeGrapheme function
      placeGrapheme();
    }
    else {
      $scope.finalIncorrect = true;
    }
    $scope.shakeIt = false;
  }

  $scope.underlineWords = function (sentence){
    console.log('in underlineWords');
    return $sce.trustAsHtml(sentence.replace(appMgr.spellingData.word.fullWord, '<u>'+appMgr.spellingData.word.fullWord+ '</u>'));
  };

  $scope.handleDrop = function(letter, index) {
    $scope.placeLetter(letter, index);
  };
}]);


//*************** ALL THE PARTIAL CONTROLLER CODE ***************//
myApp.controller('firstTryController', ['$scope', '$sce', 'SpellingFactory', function($scope, $sce, SpellingFactory){
  $scope.placedWord = [];
  $scope.placed = [];
  console.log('in firstTryController');

  console.log(appMgr.spellingData.word.fullWord);
  //pull dataIn from Factory
  var dataIn = SpellingFactory.loadObject();



  //*************** HINT ONE, MAKE IT WORK *********************//
  for (var i = 0; i < $scope.correctWord.length; i++) {
    $scope.placedWord.push({letter: '_', placedIndex: -1});
  }

  //*************** HINT TWO, MAKE IT WORK *******************//





  //





  //removes clicked letter from playing field



  // spellchecking function





  if (SpellingFactory.getDataOut().score) {
    $scope.correctAnswer = true;
    $scope.allLetter = [];
    $scope.placedWord = $scope.correctWord.split('').map(function(index){
      return {
        letter: index,
        placedIndex: -1
      };
    });
    $scope.correctPlacement($scope.placedWord);
    $scope.$parent.displaySent = $scope.underlineWords(appMgr.spellingData.sentence);
  }




//**************** MOVE TO DATALOAD CALLBACK ***************//
//2ND HINT
  if (SpellingFactory.getDataOut().complete) {
    //if score is greater than 0
    if (SpellingFactory.getDataOut().score) {
      $scope.correctAnswer = true;
      $scope.allLetter = [];
      $scope.placedWord = $scope.correctWord.split('').map(function(index){
        return {
          letter: index,
          placedIndex: -1
        };
      });
      $scope.correctPlacement($scope.placedWord);
       } else {
      $scope.incorrectAnswer = true;
    }
  }

//**************** MOVE TO DATALOAD CALLBACK ***************//
//1ST HINT
if (SpellingFactory.getDataOut().score) {
  $scope.correctAnswer = true;
  $scope.allLetter = [];
  $scope.placedWord = $scope.correctWord.split('').map(function(index){
    return {
      letter: index,
      placedIndex: -1
    };
  });
  $scope.correctPlacement($scope.placedWord);
  $scope.$parent.displaySent = $scope.underlineWords(appMgr.spellingData.sentence);
}

}]); // end controller






//SAFE
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
