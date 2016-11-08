describe('mainController', function(){
  beforeEach(module('myApp'));

  describe('best spelling game ever', function(){
    it('says whether this is the best spelling game ever', function(){
      var bestSpellingGame = true;

      bestSpellingGame.should.equal(true);
    });
  });
});

// describe('some test that needs a fixture', function(){
//   // If base path is different from the default `spec/fixtures`
//   before(function(){
//     fixture.setBase('fixtures');
//   });
//
//   beforeEach(function(){
//     this.result = fixture.load('test1.html', 'test1.json');
//   });
//
//   afterEach(function(){
//     fixture.cleanup();
//   });
//
//   it('plays with the html fixture', function(){
//     expect(fixture.el.firstChild).to.equal(this.result[0][0]);
//   });
//
// });
