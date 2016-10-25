myApp.controller('secondTryController', ['$scope', 'SpellingFactory', function($scope, SpellingFactory){
  console.log('in secondTryController');

  $scope.correctWord = window.parent.stuff.word.fullWord;

  $scope.allLetter = SpellingFactory.displayWord();
  // spellcheck dummy words
  $scope.comparisonWord = 'crap';
  console.log($scope.anotherWord);
//underlineHint function
  $scope.underline = "";
  $scope.displayUnderline = function(){
    for(var i = 0; i < $scope.correctWord.length; i++){
      $scope.underline += "_ ";
    }
  };

  $scope.placedWord = [];
  for (var i = 0; i < $scope.correctWord.length; i++) {
    $scope.placedWord.push('_');
  }

  $scope.placeLetter = function(letter){
    console.log('in placeLetter');
    $scope.placedWord[$scope.placedWord.indexOf('_')] = letter;
    console.log($scope.placedWord);
  }; // end placeLetter function

  $scope.removeLetter = function(index){
    $scope.placedWord[index] = '_';
  };// end removeLetter

  // spellchecking function
  $scope.checkSpelling = function(){
    console.log('in $scope.checkSpelling');

    if($scope.enteredWord === $scope.comparisonWord){
      $scope.hideGame = true;
      $scope.correctAnswer = true;
    } else {
      $scope.hideGame = true;
      $scope.incorrectAnswer = true;
    }

  }; // end checkSpelling function

  // array to repeat over to create first hint
  $scope.testWord = "bear";
  $scope.spacesArray = $scope.testWord.split("");
  console.log($scope.spacesArray);

}]); // end controller
