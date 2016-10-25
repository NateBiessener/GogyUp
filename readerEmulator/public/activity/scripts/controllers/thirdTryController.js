myApp.controller('thirdTryController', ['$scope', 'SpellingFactory', function($scope, SpellingFactory){
  console.log('in thirdTryController');

  console.log(window.parent.stuff.word.fullWord);
  var dataIn = window.parent.stuff;
  var correctWord = window.parent.stuff.word.fullWord;
  $scope.allLetter = SpellingFactory.displayWord();
  // spellcheck
  $scope.correctWord = dataIn.word.fullWord;
  console.log($scope.correctWord);

  $scope.targetWord = correctWord;
  $scope.targetArray = $scope.targetWord.split("");
  var targetArray = $scope.targetArray;
  console.log($scope.targetArray);
  $scope.targetGrapheme = window.parent.stuff.graphemeToLearn;
  $scope.splitGrapheme = $scope.targetGrapheme.split("");
  var splitGraph = $scope.splitGrapheme;
  console.log($scope.splitGrapheme);
  //
  var Graph = $scope.targetGrapheme;
  console.log(Graph, correctWord);
  var graphemeIndex = correctWord.indexOf(Graph);
  console.log(graphemeIndex);

  $scope.placedWord = [];
  placeGrapheme();
  // for (var i = 0; i < $scope.correctWord.length; i++) {
  //   $scope.placedWord.push('_');
  // }

  $scope.placeLetter = function(letter){
    console.log('in placeLetter');
    $scope.placedWord[$scope.placedWord.indexOf('_')] = letter;
    console.log($scope.placedWord);
  }; // end placeLetter function

  $scope.removeLetter = function(index){
    $scope.placedWord[index] = '_';
  };// end removeLetter

  // spellchecking function
  $scope.checkSpelling = function(placedWord){
    console.log('in $scope.checkSpelling');
    console.log(placedWord);
    console.log($scope.correctWord);
    placedWord = placedWord.reduce(function(start, index){
      return start + index;
    });
    if(placedWord === $scope.correctWord){
      $scope.correctAnswer = true;
    } else {
      $scope.incorrectAnswer = true;
    }

  }; // end checkSpelling function

  // start placeGrapheme information
  // $scope.dummyWord = "policeman";
  // $scope.dummyArray = $scope.dummyWord.split("");
  // var dummyArray = $scope.dummyArray;
  // console.log($scope.dummyArray);
  //
  // $scope.targetGrapheme = "ice";
  // $scope.splitGrapheme = $scope.targetGrapheme.split("");
  // var splitGraph = $scope.splitGrapheme;
  // console.log($scope.splitGrapheme);
  //
  // var Graph = $scope.targetGrapheme;
  // var Word = $scope.dummyWord;
  // console.log(Graph, Word);

  // placeGrapheme function


  function placeGrapheme(){
    j = 0;
    for (var i = 0; i < targetArray.length; i++) {
      if(i >= graphemeIndex && i <= (graphemeIndex + (Graph.length - 1))){
        $scope.placedWord.push(splitGraph[j]);
        j++;
      } else {
        $scope.placedWord.push("_");
      }
    }
    // console.log($scope.placedWord);
  }; // end placeGrapheme function

}]); // end controller
