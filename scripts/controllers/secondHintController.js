myApp.controller('secondHintController', ['$scope', function($scope){
  console.log('in secondHintController');

  $scope.dummyWord = "policeman";
  $scope.dummyArray = $scope.dummyWord.split("");
  var dummyArray = $scope.dummyArray;
  console.log($scope.dummyArray);

  $scope.targetGrapheme = "ice";
  $scope.splitGrapheme = $scope.targetGrapheme.split("");
  var splitGraph = $scope.splitGrapheme;
  console.log($scope.splitGrapheme);

  var Graph = $scope.targetGrapheme;
  var Word = $scope.dummyWord;
  console.log(Graph, Word);

  var graphemeIndex = Word.indexOf(Graph);
  console.log(graphemeIndex);

  $scope.placeGrapheme = function(){
    var domArray = [];
    j = 0;
    for (var i = 0; i < dummyArray.length; i++) {
      if(i >= graphemeIndex && i <= (graphemeIndex + (Graph.length - 1))){
        domArray.push(splitGraph[j]);
        j++;
      } else {
        domArray.push("_");
      }
    }
    $scope.domArray = domArray;
    console.log($scope.domArray);
  };

}]); // end secondHintController
