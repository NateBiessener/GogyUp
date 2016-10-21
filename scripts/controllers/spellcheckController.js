var myApp = angular.module('myApp', []);

myApp.controller('spellcheck', ['$scope', function($scope){

  $scope.enteredWord = 'especially';
  console.log($scope.enteredWord);
  $scope.anotherWord = 'crap';
  console.log($scope.anotherWord);

  $scope.checkSpelling = function(){
    console.log('in $scope.checkSpelling');

    if($scope.enteredWord === $scope.anotherWord){
      alert('You win!');
    } else {
      alert('Try again!');
    }

  };

}]); // end spellcheckController
