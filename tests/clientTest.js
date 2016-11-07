describe('mainController', function(){
  beforeEach(module('myApp'));

  describe('best spelling game ever', function(){
    it('says whether this is the best spelling game ever', function(){
      var bestSpellingGame = true;

      bestSpellingGame.should.equal(true);
    });
  });
});
