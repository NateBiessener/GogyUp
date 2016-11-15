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

  describe('dyslexia', function(){
  	it('should be false', inject(function($controller) {
  		var scope = {};
  		var myController = $controller('mainController', {
  			$scope: scope
  		});
  		scope.dyslexia.should.equal(false);
  	}));
  });

  

});
