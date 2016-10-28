var possible = "abcdefghijklmnopqrstuvwxyz";
myApp.controller('firstTryController', ['$scope', 'SpellingFactory', function($scope, SpellingFactory){
  console.log('in firstTryController');

  console.log(window.parent.stuff.word.fullWord);

  //pull dataIn from Factory
  var dataIn = SpellingFactory.loadObject();

  $scope.correctWord = dataIn.word.fullWord;

  $scope.placedWord = [];
  $scope.placed = [];
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
}]); // end controller
