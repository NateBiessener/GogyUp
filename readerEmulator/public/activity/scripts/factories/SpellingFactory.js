myApp.factory('SpellingFactory', [function(){

  var dataOut = {
  	activityTitle: "",
    word: {},  // same word object as was received from App, move objectIn stuff to this property
    score: 0, // score of 3, 2, 1, or 0
    complete: false,
    attempts:
  	  {
  	    attemptOne: undefined,
  	    attemptTwo: undefined,
  	    attemptThree: undefined
  	  },
    exitTime: undefined,
    wordTTSClicks: 0,
    sentenceTTSClicks: 0
  };

  var timeSave = function(timestamp) {
    if(!dataOut.attempts.attemptOne){
      dataOut.attempts.attemptOne = timestamp;
    } else if (!dataOut.attempts.attemptTwo){
      dataOut.attempts.attemptTwo = timestamp;
    } else if (!dataOut.attempts.attemptThree){
      dataOut.attempts.attemptThree = timestamp;
    }
  };

  var finishTime = function(timestamp){
    dataOut.exitTime = timestamp;
  };

  var setComplete = function() {
    dataOut.complete = true;
  };

  var setScore = function(){
    if(dataOut.attempts.attemptThree) {
      dataOut.score = 1;
    } else if (dataOut.attempts.attemptTwo) {
      dataOut.score = 2;
    } else {
      dataOut.score = 3;
    }
  };

  var objectIn = {};

  var storeObject = function(object){
    objectIn = object;
    dataOut.word = object.word;
    dataOut.activityTitle = object.activityTitle;
  };

  var checkSpelling = function(word){
    if (objectIn.word.fullWord) {
      return word === objectIn.word.fullWord;
    }
    return false;
  };

  var displayWord = function(){
    console.log('in displayWord');
    var wordArray = [];
    //make word into an array of letters
    for(var i= 0; i< objectIn.word.fullWord.length; i++){
      wordArray.push(objectIn.word.fullWord.charAt(i));
    }
    //generate 2 random letters to add to array
    for( var j=0; j < 2; j++){
      wordArray.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    }
    //shuffle letters into different positions on the array
    function shuffle(wordArray) {
      var m = wordArray.length, t, i;

      // While there remain elements to shuffle…
      while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = wordArray[m];
        wordArray[m] = wordArray[i];
        wordArray[i] = t;
      }

      return wordArray;
    }
    //the letters in wordArray will be mixed around
    return shuffle(wordArray);
  }; // end displayWord function

  return {
    storeObject: storeObject,
    loadObject: function(){
      return objectIn;
    },
    checkSpelling: checkSpelling,
    displayWord: displayWord,
    timeSave: timeSave,
    setComplete: setComplete,
    setScore: setScore,
    finishTime: finishTime,
    dataOut: function(){
      return dataOut;
    }
  };

}]);
