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
  for(var i= 0; i< word.length; i++){
  wordArray.push(word.charAt(i));
}
for( var j=0; j < 2; j++){
        wordArray.push(possible.charAt(Math.floor(Math.random() * possible.length)));
      }
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
shuffle(wordArray);
$scope.allLetter= wordArray;
};
}]);
