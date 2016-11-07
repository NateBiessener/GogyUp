describe('mainController', function(){
  beforeEach(module('myApp'));

  describe('placeLetter()', function(){
    it('place letter in array', inject(function($controller){
      var scope = {};
      console.log('here in test');

      var firstTryController = $controller('firstTryController', {
        $scope: scope

      });

      scope.placeLetter('X');

      scope.placedWord.should.contain('X');
    }));
  });
});
