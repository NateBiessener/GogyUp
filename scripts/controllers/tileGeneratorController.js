console.log('sourced');
var myApp = angular.module('myApp', []);
// var word = word.fullWord;
var word = "letter";
var possible = "abcdefghijklmnopqrstuvwxyz";
myApp.controller("tileGeneratorController", ["$scope", function($scope){
console.log("in tile Generator");
var wordArray = [];

$scope.displayWord = function(){
  console.log('in displayWord');
  console.log(word);
  //make word into an array of letters
  $scope.word = word;
  for(var i= 0; i< word.length; i++){
  wordArray.push(word.charAt(i));
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
};
}]);
