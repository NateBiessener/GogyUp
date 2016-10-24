myApp.controller('thirdTryController', ['$scope', function($scope){
  console.log('in thirdTryController');

  // spellcheck dummy words
  $scope.enteredWord = 'especially';
  console.log($scope.enteredWord);
  $scope.anotherWord = 'crap';
  console.log($scope.anotherWord);

  // spellchecking function
  $scope.checkSpelling = function(){
    console.log('in $scope.checkSpelling');

    if($scope.enteredWord === $scope.anotherWord){
      $scope.hideGame = true;
      $scope.correctAnswer = true;
    } else {
      $scope.hideGame = true;
      $scope.incorrectAnswer = true;
    }

  }; // end checkSpelling function

}]); // end controller
