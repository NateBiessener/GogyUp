myApp.controller('firstTryController', ['$scope', '$sce', 'SpellingFactory', function($scope, $sce, SpellingFactory){
  $scope.placedWord = [];
  $scope.placed = [];
  console.log('in firstTryController');

  console.log(appMgr.spellingData.word.fullWord);
  //pull dataIn from Factory
  var dataIn = SpellingFactory.loadObject();

  $scope.correctWord = dataIn.word.fullWord;

  // placeLetter function adds clicked letter to playing field
  $scope.placeLetter = function(letter, index){
    console.log('in placeLetter');
    $scope.placedWord.push({letter: letter, placedIndex: index});
    $scope.placed[index] = true;
    console.log($scope.placedWord);
  }; // end placeLetter function
  //removes clicked letter from playing field
  $scope.removeLetter = function(index, placedIndex){
    $scope.placedWord.splice(index, 1);
    $scope.placed[placedIndex] = false;
  };// end removeLetter
  // displayWord function
  $scope.allLetter = SpellingFactory.displayWord();
  // spellchecking function
  $scope.checkSpelling = function(placedWord){
    placedWord = placedWord.map(function(index){
      return index.letter;
    });
    console.log('in $scope.checkSpelling');
    console.log(placedWord);
    console.log($scope.correctWord);
    // save current attempt timestamp
    var currentTime = Date.now();
    SpellingFactory.timeSave(currentTime);

    if (placedWord.length > 0){
      placedWord = placedWord.reduce(function(start, index){
        return start + index;
      });
    }
    if(placedWord === $scope.correctWord){
      var sentence = appMgr.spellingData.sentence;
      $scope.correctAnswer = true;
      $scope.$parent.displaySent = $scope.underlineWords(sentence);
      $scope.$parent.fireworks = true;
      //  console.log($scope.$parent.showSentence);
      SpellingFactory.setComplete();
      SpellingFactory.setScore();
    } else {
      $scope.incorrectAnswer = true;
    }

  }; // end checkSpelling function
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
  $scope.underlineWords = function (sentence){
    console.log('in underlineWords');
    return $sce.trustAsHtml(sentence.replace(appMgr.spellingData.word.fullWord, '<u>'+appMgr.spellingData.word.fullWord+ '</u>'));
  };

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

  $scope.handleDrop = function(letter, index) {
    $scope.placeLetter(letter, index);
  };
}]); // end controller
