myApp.controller('secondTryController', ['$scope', 'SpellingFactory', function($scope, SpellingFactory){
  console.log('in secondTryController');
  $scope.placedWord = [];
  $scope.placed = [];
  //pull dataIn from Factory

  var dataIn = SpellingFactory.loadObject();
  $scope.correctWord = dataIn.word.fullWord;

  // $scope.underline = "";
  // $scope.displayUnderline = function(){
  //   for(var i = 0; i < $scope.correctWord.length; i++){
  //     $scope.underline += "_ ";
  //   }
  // };
  //populates playing field with '_''s equal to the correct word's length
  for (var i = 0; i < $scope.correctWord.length; i++) {
    $scope.placedWord.push({letter: '_', placedIndex: -1});
  }
  //looks for first '_' in playing field and replaces with clicked letter
  $scope.placeLetter = function(letter, index){
    console.log('in placeLetter');
    placedWord = $scope.placedWord.map(function(index){
      return index.letter;
    });
    $scope.placedWord[placedWord.indexOf('_')] = {letter: letter, placedIndex: index};
    $scope.placed[index] = true;
    console.log($scope.placedWord);
  }; // end placeLetter function
  //removes the clicked letter from the playing field
  $scope.removeLetter = function(index, placedIndex){
    $scope.placedWord[index] = {letter: '_', placedIndex: -1};
    $scope.placed[placedIndex] = false;
  };// end removeLetter

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

    placedWord = placedWord.reduce(function(start, index){
      return start + index;
    });
    if(placedWord === $scope.correctWord){
      $scope.correctAnswer = true;
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
      }
    }
  };

  if (SpellingFactory.getDataOut().score) {
    $scope.correctAnswer = true;
    $scope.allLetter = [];
    $scope.placedWord = $scope.correctWord.split('').map(function(index){
      return {
        letter: index,
        placedIndex: -1
      }
    });
    $scope.correctPlacement($scope.placedWord);
    //***********FILL SENTENCE BLANK*******************//
  }
}]); // end controller
