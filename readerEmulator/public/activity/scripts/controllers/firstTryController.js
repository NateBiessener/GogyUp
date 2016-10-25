var possible = "abcdefghijklmnopqrstuvwxyz";
myApp.controller('firstTryController', ['$scope', 'SpellingFactory', function($scope, SpellingFactory){
  console.log('in firstTryController');

  console.log(window.parent.stuff.word.fullWord);
  // var dataIn = window.parent.stuff;
  SpellingFactory.storeObject(window.parent.stuff);
  // spellcheck dummy words
  $scope.enteredWord = 'especially';
  console.log($scope.enteredWord);
  $scope.correctWord = SpellingFactory.loadObject().word.fullWord;
  // console.log($scope.correctWord);

  $scope.placedWord = "";
  // placeLetter function
  $scope.placeLetter = function(letter){
    console.log('in placeLetter');
    $scope.placedWord += letter;
  }; // end placeLetter function

  // displayWord function
  $scope.allLetter= SpellingFactory.displayWord();


  // spellchecking function
  $scope.checkSpelling = function(){
    console.log('in $scope.checkSpelling');
    console.log();
    if(true){
      $scope.hideGame = true;
      $scope.correctAnswer = true;
    } else {
      $scope.hideGame = true;
      $scope.incorrectAnswer = true;
    }

  }; // end checkSpelling function

}]); // end controller
