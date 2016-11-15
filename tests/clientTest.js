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
  var $parentScope;
  var $scope;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    $controller = _$controller_;
    $parentScope = _$rootScope_.$new();
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

  describe('allLetter()', function(){
    it('should contain the correct number of characters and the characters of correctWord', function(){
      var scope = {};
      var myController = $controller('mainController', {$scope: scope});

      scope.allLetter.length.should.equal(scope.correctWord.length + 2);

      for (var i = 0; i < scope.correctWord.length; i++) {
        expect(scope.allLetter).to.include(scope.correctWord[i]);
      }
    });
  }); // end describe generateLetterTiles()

  describe('correctPlacement()', function(){
    it('should set $scope.change to true if the letter at a given index matches in both placedWord and correctWord', function(){
      var scope = {};
      var myController = $controller('mainController', {$scope: scope});

      var placedWord = ['p', 'e', 'e', 'p', 'l', 'l'];
      scope.correctPlacement(placedWord);

      for(var i = 0; i < scope.correctWord.length; i++){
        if(scope.placedWord[i] == scope.correctWord[i]){
          scope.change[i].should.equal(true);
        }
      }
    });
  }); // end describe correctPlacement

  describe('checkSpelling()', function(){
    it('should indicate that the placedWord is correct', function(){
      var scope = {};
      var myController = $controller('mainController', {$scope: scope});
      scope.$parent = $parentScope;

      var placedWord = [{letter:'p'}, {letter:'e'}, {letter:'o'}, {letter:'p'}, {letter:'l'}, {letter:'e'}];
      scope.$parent.fireworks = false;
      scope.checkSpelling(placedWord);

      scope.correctAnswer.should.equal(true);
      scope.$parent.fireworks.should.equal(true);
    });

    it('should indicate that the placedWord is incorrect on the final attempt', function(){
      var scope = {};
      var myController = $controller('mainController', {$scope: scope});
      scope.$parent = $parentScope;

      var placedWord = [{letter:'p'}, {letter:'e'}, {letter:'e'}, {letter:'p'}, {letter:'l'}, {letter:'l'}];
      scope.$parent.shakeIt = false;
      scope.secondHint = true;
      scope.checkSpelling(placedWord);

      scope.finalIncorrect.should.equal(true);
      scope.$parent.shakeIt.should.equal(true);
    });

    it('should indicate that the placedWord is incorrect', function(){
      var scope = {};
      var myController = $controller('mainController', {$scope: scope});
      scope.$parent = $parentScope;

      var placedWord = [{letter:'p'}, {letter:'e'}, {letter:'e'}, {letter:'p'}, {letter:'l'}, {letter:'l'}];
      scope.$parent.shakeIt = false;
      scope.checkSpelling(placedWord);

      scope.incorrectAnswer.should.equal(true);
      scope.$parent.shakeIt.should.equal(true);
    });
  }); // end describe checkSpelling
});
