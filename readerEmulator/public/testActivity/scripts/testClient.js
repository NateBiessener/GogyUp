console.log('testClient sourced');

var myApp = angular.module('myApp', []);


myApp.controller('testController', ['$scope', function($scope){
  console.log('ng BOOM');
  $scope.anNIHILateMe = function(){
    console.log('all is none');
    window.parent.destroy();
  };
}]);
