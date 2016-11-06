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

  var setDataOut = function(object){
    dataOut = object;
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
  //counts the number of times the word button is clicked
  var speakWordClick = function(){
    dataOut.wordTTSClicks++;
    console.log(dataOut.wordTTSClicks);
  };
  //counts the number of times the sentence button is clicked
  var speakSentenceClick = function(){
    dataOut.sentenceTTSClicks++;
    console.log(dataOut.sentenceTTSClicks);
  };

  return {
    storeObject: storeObject,
    loadObject: function(){
      return objectIn;
    },
    checkSpelling: checkSpelling,
    timeSave: timeSave,
    setComplete: setComplete,
    setScore: setScore,
    finishTime: finishTime,
    setDataOut: setDataOut,
    speakWordClick: speakWordClick,
    speakSentenceClick: speakSentenceClick,
    getDataOut: function(){
      return dataOut;
    }
  };

}]);
