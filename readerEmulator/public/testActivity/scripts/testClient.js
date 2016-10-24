console.log('testClient sourced');

var myApp = angular.module('myApp', []);

var appMgr = window.parent.g_appMgr;

myApp.controller('testController', ['$scope', function($scope){
  console.log('ng BOOM');
  appMgr.dataLoad('saveVarName', function(data){
    console.log('loaded data:', data);
  });
  $scope.anNIHILateMe = function(){
    appMgr.dataSave('saveVarName', $scope.text);
    appMgr.setActivityComplete();
  };
  $scope.text = window.parent.stuff;
}]);
