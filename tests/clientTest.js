describe('mainController', function(){
  beforeEach(module('myApp'));
  var SpellingFactory = {};
  beforeEach(inject(function($injector) {
   SpellingFactory = $injector.get('SpellingFactory');

  }));

  beforeEach(function(){
    appMgr = {};
    appMgr.spellingData = {
      "activityTitle": 'people_1',
      "word": {
        "fullWord": 'people',
        "graphemes": ['p','eo','p','le']   // ie. [“c”, “a”, “t”]
      },
      "graphemeToLearn": 'eo',
      "sentence": 'I look at all the lonely people'
    };
    appMgr.setActivityComplete = function(dataOut){
      console.log(dataOut);
      // $('iframe').remove();
    };

    //saves objectToSave to appMgr.saveVarName, then calls callback
    appMgr.dataSave = function(saveVarName, objectToSave, callback){
      appMgr[saveVarName] = objectToSave;
      if (callback) {
        callback();
      }
    };

    //if passed a callback, runs callback(appMgr.varName)
    appMgr.dataLoad = function(varName, callback){
      if (callback) {
        callback(appMgr[varName]);
      }
    };
  });

  var $controller;
  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  describe('removeLetter()', function(){
    it('should replace a letter with "_" when there is a hint', function(){
      var scope = {};
      var controller = $controller('mainController', {$scope: scope});
      scope.placedWord = [{letter: 'a', placedIndex: 0}, {letter: 'b', placedIndex: 1}];
      scope.placed = [true, true];
      scope.firstHint = true;
      scope.removeLetter(0, 1);
      scope.placedWord.should.deep.equal([{letter: '_', placedIndex: -1}, {letter: 'b', placedIndex: 1}]);
      scope.placed.should.deep.equal([true, false]);
    });

    it('should remove a letter when there is no hint', function(){
      var scope = {};
      var controller = $controller('mainController', {$scope: scope});
      scope.placedWord = [{letter: 'a', placedIndex: 0}, {letter: 'b', placedIndex: 1}];
      scope.placed = [true, true];
      scope.removeLetter(0, 1);
      scope.placedWord.should.deep.equal([{letter: 'b', placedIndex: 1}]);
      scope.placed.should.deep.equal([true, false]);
    });
  });

  describe('placeLetter()', function(){
    it('should place a letter at the target index +1 when there is no hint', function(){
      var scope = {};
      var controller = $controller('mainController', {$scope: scope});
      scope.placedWord = [{letter: 'a', placedIndex: 0}, {letter: 'b', placedIndex: 1}];
      scope.placed = [true, true];
      scope.placeLetter('c', 3, 0);
      scope.placedWord[1].should.deep.equal({letter: 'c', placedIndex: 3});
      scope.placed[3].should.equal(true);
    });

    it('should place a letter at the end of the array when there is no hint or target', function(){
      var scope = {};
      var controller = $controller('mainController', {$scope: scope});
      scope.placedWord = [{letter: 'a', placedIndex: 0}, {letter: 'b', placedIndex: 1}];
      scope.placed = [true, true];
      scope.placeLetter('c', 3);
      scope.placedWord[2].should.deep.equal({letter: 'c', placedIndex: 3});
      scope.placed[3].should.equal(true);
    });

    it('should not place a letter if there is a hint, a target, and no "_"s left', function(){
      var scope = {};
      var controller = $controller('mainController', {$scope: scope});
      scope.placedWord = [{letter: 'a', placedIndex: 0}, {letter: 'b', placedIndex: 1}];
      scope.placed = [true, true];
      scope.firstHint = true;
      scope.placeLetter('c', 3, 1);
      scope.placedWord.should.deep.equal([{letter: 'a', placedIndex: 0}, {letter: 'b', placedIndex: 1}]);
      scope.placed.should.deep.equal([true, true]);
    });

    it('should not place a letter if there is a hint, no target, and no "_"s left', function(){
      var scope = {};
      var controller = $controller('mainController', {$scope: scope});
      scope.placedWord = [{letter: 'a', placedIndex: 0}, {letter: 'b', placedIndex: 1}];
      scope.placed = [true, true];
      scope.firstHint = true;
      scope.placeLetter('c', 3);
      scope.placedWord.should.deep.equal([{letter: 'a', placedIndex: 0}, {letter: 'b', placedIndex: 1}]);
      scope.placed.should.deep.equal([true, true]);
    });

    it('should replace the appropriate "_" if there is a hint and the target index is an "_"', function(){
      var scope = {};
      var controller = $controller('mainController', {$scope: scope});
      scope.placedWord = [{letter: '_', placedIndex: 0}, {letter: '_', placedIndex: 1}];
      scope.placed = [true, true];
      scope.firstHint = true;
      scope.placeLetter('c', 3, 1);
      scope.placedWord.should.deep.equal([{letter: '_', placedIndex: 0}, {letter: 'c', placedIndex: 3}]);
      scope.placed[3].should.equal(true);
    });

    it('should remove the appropriate "_" and place the letter at the correct index if there is a hint and the target index is not an "_"', function(){
      var scope = {};
      var controller = $controller('mainController', {$scope: scope});
      scope.placedWord = [{letter: '_', placedIndex: 0}, {letter: 'b', placedIndex: 1}];
      scope.placed = [true, true];
      scope.firstHint = true;
      scope.placeLetter('c', 3, 1);
      scope.placedWord.should.deep.equal([{letter: 'b', placedIndex: 1}, {letter: 'c', placedIndex: 3}]);
      scope.placed[3].should.equal(true);
    });

    it('should replace the first available "_" if there is a hint and no target index', function(){
      var scope = {};
      var controller = $controller('mainController', {$scope: scope});
      scope.placedWord = [{letter: '_', placedIndex: 0}, {letter: '_', placedIndex: 1}];
      scope.placed = [true, true];
      scope.firstHint = true;
      scope.placeLetter('c', 3);
      scope.placedWord.should.deep.equal([{letter: 'c', placedIndex: 3}, {letter: '_', placedIndex: 1}]);
      scope.placed[3].should.equal(true);
    });
  })

  describe('allLetter()', function(){
    it('should push fullWord characters into wordArray as well as two random letters from possible', inject(function($controller){
      var scope = {};
      var myController = $controller('mainController', {
        $scope: scope,
      });

      scope.allLetter.length.should.equal(scope.correctWord.length + 2);
    }));
  }); // end describe generateLetterTiles()

});
