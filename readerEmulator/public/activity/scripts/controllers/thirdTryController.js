myApp.controller('thirdTryController', ['$scope', 'SpellingFactory', function($scope, SpellingFactory){
  console.log('in thirdTryController');

  $scope.allLetter = SpellingFactory.displayWord();
  // pull dataIn from Factory
  var dataIn = SpellingFactory.loadObject();

  $scope.correctWord = dataIn.word.fullWord;
  console.log($scope.correctWord);

  $scope.targetWord = $scope.correctWord;
  $scope.targetArray = $scope.targetWord.split("");
  var targetArray = $scope.targetArray;
  console.log($scope.targetArray);
  $scope.targetGrapheme = dataIn.graphemeToLearn;
  $scope.splitGrapheme = $scope.targetGrapheme.split("");
  var splitGraph = $scope.splitGrapheme;
  console.log($scope.splitGrapheme);
  //
  var Graph = $scope.targetGrapheme;
  console.log(Graph, $scope.correctWord);
  var graphemeIndex = $scope.correctWord.indexOf(Graph);
  console.log(graphemeIndex);

  $scope.placedWord = [];
  placeGrapheme();
  //looks for first '_' in playing field and replaces with clicked letter
  $scope.placeLetter = function(letter){
    console.log('in placeLetter');
    $scope.placedWord[$scope.placedWord.indexOf('_')] = letter;
    console.log($scope.placedWord);
  }; // end placeLetter function
  //removes the clicked letter from the playing field
  $scope.removeLetter = function(index){
    $scope.placedWord[index] = '_';
  };// end removeLetter

  // spellchecking function
  $scope.checkSpelling = function(placedWord){
    console.log('in $scope.checkSpelling');
    console.log(placedWord);
    console.log($scope.correctWord);
    // save current attempt timestamp
    var currentTime = Date.now();
    SpellingFactory.timeSave(currentTime);

    placedWord = placedWord.reduce(function(start, index){
      return start + index;
    });
    if(placedWord === $scope.correctWord){
      $scope.correctAnswer = true;
      SpellingFactory.setComplete();
      SpellingFactory.setScore();
    } else {
      $scope.incorrectAnswer = true;
      SpellingFactory.setComplete();
    }

  }; // end checkSpelling function

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
  } // end placeGrapheme function

}]); // end controller
