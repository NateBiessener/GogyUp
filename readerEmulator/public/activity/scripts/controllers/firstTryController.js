var possible = "abcdefghijklmnopqrstuvwxyz";
myApp.controller('firstTryController', ['$scope', 'SpellingFactory', function($scope, SpellingFactory){
  console.log('in firstTryController');

  console.log(window.parent.stuff.word.fullWord);
  // var dataIn = window.parent.stuff;
  SpellingFactory.storeObject(window.parent.stuff);
  // spellcheck dummy words
  $scope.enteredWord = 'especially';
  console.log($scope.enteredWord);
  $scope.correctWord = SpellingFactory.loadObject().word.fullWord;
  // console.log($scope.correctWord);

  $scope.placedWord = "";
  // placeLetter function
  $scope.placeLetter = function(letter){
    console.log('in placeLetter');
    $scope.placedWord += letter;
  }; // end placeLetter function

  // displayWord function
  $scope.displayWord = function(){
    console.log('in displayWord');
    var wordArray = [];
    //make word into an array of letters
    for(var i= 0; i< $scope.correctWord.length; i++){
    wordArray.push($scope.correctWord.charAt(i));
  }
    //generate 2 random letters to add to array
    for( var j=0; j < 2; j++){
            wordArray.push(possible.charAt(Math.floor(Math.random() * possible.length)));
          }
          //shuffle letters into different positions on the array
          function shuffle(wordArray) {
            var m = wordArray.length, t, i;

            // While there remain elements to shuffle…
            while (m) {

              // Pick a remaining element…
              i = Math.floor(Math.random() * m--);

              // And swap it with the current element.
              t = wordArray[m];
              wordArray[m] = wordArray[i];
              wordArray[i] = t;
            }

            return wordArray;
          }
          //the letters in wordArray will be mixed around
    shuffle(wordArray);
    $scope.allLetter= wordArray;
  }; // end displayWord function
  
  // spellchecking function
  $scope.checkSpelling = function(){
    console.log('in $scope.checkSpelling');
    console.log();
    if(true){
      $scope.hideGame = true;
      $scope.correctAnswer = true;
    } else {
      $scope.hideGame = true;
      $scope.incorrectAnswer = true;
    }

  }; // end checkSpelling function

}]); // end controller
