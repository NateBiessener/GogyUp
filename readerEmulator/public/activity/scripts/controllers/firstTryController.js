var possible = "abcdefghijklmnopqrstuvwxyz";
myApp.controller('firstTryController', ['$scope', '$sce', 'SpellingFactory', function($scope, $sce, SpellingFactory){
  console.log('in firstTryController');

  console.log(window.parent.stuff.word.fullWord);
  // $scope.displaySomething = function(){
  //   console.log('hi');
  //   $scope.$parent.showSentence = window.parent.stuff.sentence;
  // };
  //pull dataIn from Factory
  var dataIn = SpellingFactory.loadObject();

  $scope.correctWord = dataIn.word.fullWord;

  $scope.placedWord = [];
  // placeLetter function adds clicked letter to playing field
  $scope.placeLetter = function(letter){
    console.log('in placeLetter');
    $scope.placedWord.push(letter);
    console.log($scope.placedWord);
  }; // end placeLetter function
  //removes clicked letter from playing field
  $scope.removeLetter = function(index){
    $scope.placedWord.splice(index, 1);
  };// end removeLetter
  // displayWord function
  $scope.allLetter = SpellingFactory.displayWord();
  // spellchecking function
  $scope.checkSpelling = function(placedWord){
    console.log('in $scope.checkSpelling');
    console.log(placedWord);
    console.log($scope.correctWord);
    // save current attempt timestamp
    var currentTime = Date.now();
    SpellingFactory.timeSave(currentTime);

    if (placedWord.length > 0){
      placedWord = placedWord.reduce(function(start, index){
        return start + index;
      });
    }
    if(placedWord === $scope.correctWord){
      var sentence = window.parent.stuff.sentence;
      $scope.correctAnswer = true;
      // $scope.$parent.showSentence = window.parent.stuff.sentence;
      // console.log($scope.underlineWords(sentence));
      $scope.$parent.displaySent = $scope.underlineWords(sentence);
       $scope.$parent.showSentence = $scope.underlineWords(sentence);
      //  console.log($scope.$parent.showSentence);
      SpellingFactory.setComplete();
      SpellingFactory.setScore();
    } else {
      $scope.incorrectAnswer = true;
    }

  }; // end checkSpelling function
  $scope.correctPlacement = function(placedWord){
    $scope.change = [];
    for(var i = 0; i < $scope.correctWord.length; i++){
      if(placedWord[i] == $scope.correctWord[i]){
        console.log(true);
        $scope.change[i] = true;
      }//end if statement
    }//end for loop
  };//end correctPlacement
  $scope.underlineWords = function (sentence){
    console.log('in underlineWords');
    return $sce.trustAsHtml(sentence.replace(window.parent.stuff.word.fullWord, '<u>'+window.parent.stuff.word.fullWord+ '</u>'));
};
}]); // end controller
