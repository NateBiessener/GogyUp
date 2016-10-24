myApp.controller('secondTryController', ['$scope', function($scope){
  console.log('in secondTryController');

  // spellcheck dummy words
  $scope.enteredWord = 'especially';
  console.log($scope.enteredWord);
  $scope.comparisonWord = 'crap';
  console.log($scope.anotherWord);

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

  // array to repeat over to create spaces
  $scope.testWord = "bear";
  $scope.spacesArray = $scope.testWord.split("");
  console.log($scope.spacesArray);

}]); // end controller
