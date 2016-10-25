var possible = "abcdefghijklmnopqrstuvwxyz";
myApp.controller('firstTryController', ['$scope', 'SpellingFactory', function($scope, SpellingFactory){
  console.log('in firstTryController');

  console.log(window.parent.stuff.word.fullWord);

  SpellingFactory.storeObject(window.parent.stuff);
  // spellcheck dummy words

  $scope.correctWord = SpellingFactory.loadObject().word.fullWord;

  $scope.placedWord = [];
  // placeLetter function
  $scope.placeLetter = function(letter){
    console.log('in placeLetter');
    $scope.placedWord.push(letter);
    console.log($scope.placedWord);
  }; // end placeLetter function

  $scope.removeLetter = function(index){
    $scope.placedWord.splice(index, 1);
  };// end removeLetter

  // displayWord function
  $scope.allLetter = SpellingFactory.displayWord();

  // spellchecking function
  $scope.checkSpelling = function(placedWord){
    console.log('in $scope.checkSpelling');
    console.log(placedWord);
    console.log($scope.correctWord);
    placedWord = placedWord.reduce(function(start, index){
      return start + index;
    });
    if(placedWord === $scope.correctWord){
      $scope.correctAnswer = true;
    } else {
      $scope.incorrectAnswer = true;
    }

  }; // end checkSpelling function

}]); // end controller
