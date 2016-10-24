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

  // start placeGrapheme information
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

  // placeGrapheme function
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
  }; // end placeGrapheme function

}]); // end controller
