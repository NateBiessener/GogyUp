var myApp = angular.module('myApp', []);

myApp.controller('spellcheckController', ['$scope', function($scope){

  $scope.enteredWord = 'especially';
  $scope.receivedWord = 'not';

  $scope.checkSpelling = function(){
    console.log('in $scope.checkSpelling');

    if($scope.enteredWord === $scope.receivedWord){
      alert('You win!');
    } else {
      alert('Try again!');
    }

  };

}]); // end spellcheckController
