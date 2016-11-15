var myApp = angular.module('myApp', []);

var appMgr = window.parent.g_appMgr;

myApp.controller('mainController', ['$scope', '$sce', 'SpellingFactory', function($scope, $sce, SpellingFactory){
  //marshall variables
  $scope.placedWord = [];
  $scope.placed = [];
  $scope.change = [];
  $scope.firstHint = false;
  $scope.secondHint = false;
  //used to toggle dyslexia font
  $scope.dyslexia = false;

  var sentence = appMgr.spellingData.sentence;
  var word = appMgr.spellingData.word.fullWord;

  // console.log(appMgr.spellingData);

  //send dataIn to Factory
  SpellingFactory.storeObject(appMgr.spellingData);

  var objectIn = appMgr.spellingData;
  $scope.correctWord = objectIn.word.fullWord;

  $scope.displaySent = $sce.trustAsHtml(sentence.replace(word,'<span style="text-decoration: underline;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'));
  // console.log($scope.displaySentence);


  $scope.speakSentence = function(){
    responsiveVoice.speak(appMgr.spellingData.sentence, 'US English Female');
    SpellingFactory.speakSentenceClick();
  };

  $scope.speakWord = function(){
    responsiveVoice.speak(appMgr.spellingData.word.fullWord, 'US English Female');
    SpellingFactory.speakWordClick();
  };

  $scope.getRidOfMe = function(){
    var currentTime = Date.now();
    SpellingFactory.finishTime(currentTime);
    var dataOut = SpellingFactory.getDataOut();
    appMgr.dataSave(dataOut.activityTitle, dataOut, function(){
      appMgr.setActivityComplete(dataOut);
    });
  };

  var generateLetterTiles = function(){
    var possible = "abcdefghijklmnopqrstuvwxyz";
    // console.log('in generateLetterTiles');
    var wordArray = [];
    //make word into an array of letters
    for(var i= 0; i< objectIn.word.fullWord.length; i++){
      wordArray.push(objectIn.word.fullWord.charAt(i));
    }
    //generate 2 random letters to add to array
    for( var j=0; j < 2; j++){
      wordArray.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }
    //shuffle letters into different positions on the array
    //the letters in wordArray will be mixed around
    return shuffle(wordArray);
  }; // end generateLetterTiles function

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
      // console.log('rescrambling');
      wordArray = shuffle(wordArray);
    }
    return wordArray;
  };
  //generate letter tiles onLoad
  $scope.allLetter = generateLetterTiles();

  //remove letter from generated tiles and place in playing field
  $scope.placeLetter = function(letter, index, targetIndex){
    if ($scope.firstHint || $scope.secondHint){
      placedWord = $scope.placedWord.map(function(index){
        return index.letter;
      });
      //only add to playing field if there is an '_' left
      if (placedWord.indexOf('_') >= 0) {
        if (targetIndex >= 0) {
          if ($scope.placedWord[targetIndex].letter === '_') {
            $scope.placedWord[targetIndex] = {letter: letter, placedIndex: index};
          }
          else {
            $scope.placedWord.splice(placedWord.indexOf('_'), 1);
            $scope.placedWord.splice(targetIndex, 0, {letter: letter, placedIndex: index});
          }
        }
        else{
          $scope.placedWord[placedWord.indexOf('_')] = {letter: letter, placedIndex: index};
        }
        $scope.placed[index] = true;
      }
    }
    else {
      if (targetIndex >= 0) {
        $scope.placedWord.splice(Number(targetIndex) + 1, 0, {letter: letter, placedIndex: index});
      }
      else{
        $scope.placedWord.push({letter: letter, placedIndex: index});
      }
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
    for(var i = 0; i < $scope.correctWord.length; i++){
      if(placedWord[i] == $scope.correctWord[i]){
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
    } else if($scope.secondHint){
      $scope.displaySent = $scope.underlineWords(appMgr.spellingData.sentence);
      $scope.correctPlacement(placedWord);
      SpellingFactory.setComplete();
      $scope.finalIncorrect = true;
      $scope.$parent.shakeIt = true;
    }
    else {
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
      showFirstHint();
    }
    else if ($scope.firstHint) {
      showSecondHint();
    }

    $scope.$parent.shakeIt = false;
  };

  function showFirstHint(){
    $scope.firstHint = true;
    for (var i = 0; i < $scope.correctWord.length; i++) {
      $scope.placedWord.push({letter: '_', placedIndex: -1});
      $scope.change[i] = false;
    }
  }

  //returns starting index of grapheme in word
  function findGrapheme(grapheme, word){
    for (var i = 0; i < word.length; i++) {
      //if the start of the grapheme is at i, check the rest of the grapheme agains the rest of the word
      if (grapheme[0] === word[i]) {
        for (var n = 0; n < grapheme.length; n++) {
          //if grapheme[n] is not an underscore and doesn't match its corresponding position in word, go back to looping through the word
          if (!(grapheme[n] === '_' || grapheme[n] === word[i + n])) {
            break;
          }
          //if we reached the end of the grapheme without breaking, we've found our location within word, so we return i
          if (n === grapheme.length - 1) {
            return i;
          }
        }
      }
    }
    //if we did not find the grapheme, return -1 to indicate grapheme is not in word
    return -1;
  }

  function showSecondHint(){
    $scope.firstHint = false;
    $scope.secondHint = true;

    var graphemeIndex = findGrapheme(objectIn.graphemeToLearn, $scope.correctWord);

    var j = 0;
    for (var i = 0; i < $scope.correctWord.length; i++) {
      if(i >= graphemeIndex && i <= (graphemeIndex + (objectIn.graphemeToLearn.length - 1))){
        $scope.placedWord.push({letter: objectIn.graphemeToLearn[j], placedIndex: i});
        j++;
      } else {
        $scope.placedWord.push({letter: "_", placedIndex: -1});
      }
      $scope.change[i] = false;
    }
    // console.log($scope.placedWord);
  } // end placeGrapheme function

  $scope.underlineWords = function (sentence){
    // console.log('in underlineWords');
    return $sce.trustAsHtml(sentence.replace(appMgr.spellingData.word.fullWord, '<u>'+appMgr.spellingData.word.fullWord+ '</u>'));
  };

  $scope.handleDrop = function(letter, data, target) {
    //tiles already in the playingfield will have a placedIndex property, so we only add to the field if it's not already there
    if (!data.placedindex) {
      $scope.placeLetter(letter, data.index);
    }
  };

  $scope.handleDropOut = function(letter, data, target) {
    //only call $scope.removeLetter if the tile is a placed tile
    if (data.placedindex) {
      $scope.removeLetter(data.index, data.placedindex);
    }

  };

  $scope.handleSortDrop = function(letter, data, target){
    if (data.placedindex) {
      var temp = $scope.placedWord[data.index];
      if (data.index < target.dataset.index) {
        for (i = Number(data.index); i < target.dataset.index; i++){
          $scope.placedWord[i] = $scope.placedWord[i+1];
        }
      }
      else {
        for (i = Number(data.index); i > target.dataset.index; i--){
          $scope.placedWord[i] = $scope.placedWord[i-1];
        }
      }
      $scope.placedWord[target.dataset.index] = temp;
    }
    else {
      $scope.placeLetter(letter, data.index, target.dataset.index);
    }
  };

  $scope.handleLeftDrop = function(letter, data, target){
    if (data.placedindex) {
      $scope.handleSortDrop(letter, data, {dataset: { index: 0 } });
    }
    else {
      $scope.placeLetter(letter, data.index, 0);
    }
  };

  $scope.handleRightDrop = function(letter, data, target){
    if (data.placedindex) {
      $scope.handleSortDrop(letter, data, {dataset: { index: $scope.placedWord.length - 1 } });
    }
    else {
      $scope.placeLetter(letter, data.index, $scope.placedWord.length - 1);
    }
  };

  appMgr.dataLoad(appMgr.spellingData.activityTitle, function(data){
    // console.log(data);
    if (data) {
      SpellingFactory.setDataOut(data);

      if (data.complete) {
        //if score > 0
        if (data.score) {
          $scope.$parent.fireworks = true;
          $scope.correctAnswer = true;
          $scope.allLetter = [];
          $scope.placedWord = $scope.correctWord.split('').map(function(index){
            return {
              letter: index,
              placedIndex: -1
            };
          });
          $scope.correctPlacement($scope.placedWord);
          $scope.displaySent = $scope.underlineWords(appMgr.spellingData.sentence);
        }
        else if(data.score === 0){
          $scope.finalIncorrect = true;
          $scope.allLetter = [];
          $scope.placedWord = $scope.correctWord.split('').map(function(index){
            return {
              letter: index,
              placedIndex: -1
            };
          });
          $scope.displaySent = $scope.underlineWords(appMgr.spellingData.sentence);
        }
      } else if (data.attempts.attemptTwo) {
        showSecondHint();
      } else if (data.attempts.attemptOne) {
        showFirstHint();
      }
    }
  });

}]); // end controller

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
  };
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

          var dropEl = this;
          var item = document.getElementById(e.dataTransfer.getData('Text'));
          var letter = item.innerText;
          var data = item.dataset;

          // call the passed drop function
          scope.$apply(function(scope) {
            var fn = scope.drop();
            if ('undefined' !== typeof fn) {
              fn(letter, data, dropEl);
            }
          });

          return false;
        },
        false
      );
    }
  };
});
