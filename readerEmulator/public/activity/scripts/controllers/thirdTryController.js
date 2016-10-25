myApp.controller('thirdTryController', ['$scope', 'SpellingFactory', function($scope, SpellingFactory){
  console.log('in thirdTryController');

  console.log(window.parent.stuff.word.fullWord);
  var dataIn = window.parent.stuff;
  var correctWord = window.parent.stuff.word.fullWord;
  $scope.allLetter = SpellingFactory.displayWord();
  // spellcheck
  $scope.correctWord = dataIn.word.fullWord;
  console.log($scope.correctWord);

  $scope.underline = "";
//underline hint function
  $scope.displayUnderline = function(){
    for(var i = 0; i < correctWord.length; i++){
      $scope.underline += "_ ";
    }
  };
  var grapheme = correctWord.indexOf("ea");
  console.log(grapheme);
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
