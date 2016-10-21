console.log('script sourced');

var myApp = angular.module('myApp', []);

myApp.controller('emulatorController', ['$scope', '$http', '$q', function($scope, $http, $q){
  console.log('angular up');

  $scope.spellingGame = function(){
    console.log('in spellingGame click with', this);
  };
}]);
