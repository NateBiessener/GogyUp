console.log('sourced');
var myApp = angular.module('myApp', []);
// var word = word.fullWord;
var word = "letter";

myApp.controller("tilePlacementController", ["$scope", function($scope){
console.log("in tilePlacement");
console.log(word.length);
$scope.displayPlacement = function(){
  console.log("in displayPlacement");
  var inputArray = [];
  for(var i = 0; i < word.length; i++){
    inputArray.push("_");
  }
  $scope.displayInput = inputArray; 
};

}]);
