var possible = "abcdefghijklmnopqrstuvwxyz";
myApp.controller('firstTryController', ['$scope', 'SpellingFactory', function($scope, SpellingFactory){
  console.log('in firstTryController');

  console.log(window.parent.stuff.word.fullWord);

  //pull dataIn from Factory
  var dataIn = SpellingFactory.loadObject();

  $scope.correctWord = dataIn.word.fullWord;

  $scope.placedWord = [];
  // placeLetter function adds clicked letter to playing field
  $scope.placeLetter = function(letter){
    console.log('in placeLetter');
    $scope.placedWord.push(letter);
    console.log($scope.placedWord);
  }; // end placeLetter function
  //removes clicked letter from playing field
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
    if (placedWord.length > 0){
      placedWord = placedWord.reduce(function(start, index){
        return start + index;
      });
    }
    if(placedWord === $scope.correctWord){
      $scope.correctAnswer = true;
    } else {
      $scope.incorrectAnswer = true;
    }

  }; // end checkSpelling function

}]); // end controller
