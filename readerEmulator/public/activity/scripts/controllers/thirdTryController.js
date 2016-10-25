myApp.controller('thirdTryController', ['$scope', 'SpellingFactory', function($scope, SpellingFactory){
  console.log('in thirdTryController');

  console.log(window.parent.stuff.word.fullWord);
  var dataIn = window.parent.stuff;

  $scope.allLetter = SpellingFactory.displayWord();
  // spellcheck
  $scope.correctWord = dataIn.word.fullWord;
  console.log($scope.correctWord);

  $scope.placedWord = [];
  for (var i = 0; i < $scope.correctWord.length; i++) {
    $scope.placedWord.push('_');
  }

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
