myApp.controller('secondTryController', ['$scope', 'SpellingFactory', function($scope, SpellingFactory){
  console.log('in secondTryController');
  //pull dataIn from Factory
  var dataIn = SpellingFactory.loadObject();

  $scope.correctWord = dataIn.word.fullWord;

  $scope.allLetter = SpellingFactory.displayWord();

  // $scope.underline = "";
  // $scope.displayUnderline = function(){
  //   for(var i = 0; i < $scope.correctWord.length; i++){
  //     $scope.underline += "_ ";
  //   }
  // };
  //populates playing field with '_''s equal to the correct word's length
  $scope.placedWord = [];
  for (var i = 0; i < $scope.correctWord.length; i++) {
    $scope.placedWord.push('_');
  }
  //looks for first '_' in playing field and replaces with clicked letter
  $scope.placeLetter = function(letter){
    console.log('in placeLetter');
    $scope.placedWord[$scope.placedWord.indexOf('_')] = letter;
    console.log($scope.placedWord);
  }; // end placeLetter function
  //removes the clicked letter from the playing field
  $scope.removeLetter = function(index){
    $scope.placedWord[index] = '_';
  };// end removeLetter

  // spellchecking function
  $scope.checkSpelling = function(placedWord){
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

}]); // end controller
