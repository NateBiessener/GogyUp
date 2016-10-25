myApp.controller('secondTryController', ['$scope', 'SpellingFactory', function($scope, SpellingFactory){
  console.log('in secondTryController');

  $scope.correctWord = window.parent.stuff.word.fullWord;

  $scope.allLetter = SpellingFactory.displayWord();

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
