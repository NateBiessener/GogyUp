var possible = "abcdefghijklmnopqrstuvwxyz";
myApp.controller('firstTryController', ['$scope', 'SpellingFactory', function($scope, SpellingFactory){
  console.log('in firstTryController');

  console.log(window.parent.stuff.word.fullWord);
  var dataIn = window.parent.stuff;

  // var dataIn = window.parent.stuff;
  SpellingFactory.storeObject(window.parent.stuff);
  // spellcheck dummy words

  $scope.correctWord = SpellingFactory.loadObject().word.fullWord;

  $scope.placedWord = "";
  // placeLetter function
  $scope.placeLetter = function(letter){
    console.log('in placeLetter');
    $scope.placedWord += letter;
    console.log($scope.placedWord);
  }; // end placeLetter function

  // displayWord function
  $scope.allLetter= SpellingFactory.displayWord();


  // spellchecking function
  $scope.checkSpelling = function(placedWord){
    console.log('in $scope.checkSpelling');
    console.log(placedWord);
    console.log($scope.correctWord);

    if(placedWord === $scope.correctWord){
      $scope.hideGame = true;
      $scope.correctAnswer = true;
    } else {
      $scope.hideGame = true;
      $scope.incorrectAnswer = true;
    }

  }; // end checkSpelling function

}]); // end controller
