myApp.controller('secondHintController', ['$scope', function($scope){
  console.log('in secondHintController');

  $scope.graphemeWord = ['g', 'r', 'ea', 'se'];

  $scope.dummyWord = "grease";
  $scope.dummyArray = $scope.dummyWord.split("");
  console.log($scope.dummyArray);

  $scope.targetGrapheme = "ea";
  $scope.splitGrapheme = $scope.targetGrapheme.split("");
  console.log($scope.splitGrapheme);

  var Graph = $scope.targetGrapheme;
  var Word = $scope.dummyWord;
  console.log(Graph, Word);

  Word.indexOf(Graph);
  console.log(Word.indexOf(Graph));

  // $scope.placeGrapheme = function(array, target){
  //   console.log('in $scope.placeGrapheme');
  //
  //   for (var i = 0; i < array.length; i++) {
  //     if(array[i] === target){
  //       $scope.position = i;
  //     }
  //     return $scope.position;
  //   }
  //
  //   console.log($scope.position);
  //
  // };

}]); // end secondHintController
