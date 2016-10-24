myApp.controller('firstHintController', ['$scope', function($scope){
  console.log('in firstHintController');

  $scope.dummyWord = "bear";
  $scope.dummyArray = $scope.dummyWord.split("");
  console.log($scope.dummyArray);

}]); // end firstHintController
