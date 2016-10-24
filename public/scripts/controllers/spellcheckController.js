myApp.controller('spellcheckController', ['$scope', function($scope){

  $scope.enteredWord = 'especially';
  console.log($scope.enteredWord);
  $scope.anotherWord = 'crap';
  console.log($scope.anotherWord);

  $scope.checkSpelling = function(){
    console.log('in $scope.checkSpelling');

    if($scope.enteredWord === $scope.anotherWord){
      $scope.hideGame = true;
      $scope.correctAnswer = true;
    } else {
      $scope.hideGame = true;
      $scope.incorrectAnswer = true;
    }

  };

}]); // end spellcheckController
