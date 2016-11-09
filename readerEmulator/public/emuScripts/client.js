console.log('script sourced');

//define appMgr to contain mock API methods
window.g_appMgr = {};
var appMgr = window.g_appMgr;

//assumes only one iframe will be on the page at a time
appMgr.setActivityComplete = function(dataOut){
  console.log(dataOut);
  $('iframe').remove();
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

$(document).ready(function(){
  console.log('jq works');
  //hardcoded on-clicks for these words, each will runGame() with appropriate data
  $('body').on('click', '#people', function(){
    //hard coding objects to send
    var objectToSend = {
      "activityTitle": 'people_1',
  	  "word": {
		    "fullWord": $(this).html(),
		    "graphemes": ['p','eo','p','le']   // ie. [“c”, “a”, “t”]
  		},
  	  "graphemeToLearn": 'eo',
  	  "sentence": removeTags($(this).parent().html())
  	};
    runGame(objectToSend);
  });
  $('body').on('click', '#seemed', function(){
    //hard coding objects to send
    var objectToSend = {
      "activityTitle": 'seemed_1',
  	  "word": {
		    "fullWord": $(this).html(),
		    "graphemes": ['s', 'ee', 'med']   // ie. [“c”, “a”, “t”]
  		},
  	  "graphemeToLearn": 'ee',
  	  "sentence": removeTags($(this).parent().html())
  	};
    runGame(objectToSend);
  });
  $('body').on('click', '#speak', function(){
    //hard coding objects to send
    var objectToSend = {
      "activityTitle": 'speak_1',
  	  "word": {
		    "fullWord": $(this).html(),
		    "graphemes": ['s','p','ea','k']   // ie. [“c”, “a”, “t”]
  		},
  	  "graphemeToLearn": 'ea',
  	  "sentence": removeTags($(this).parent().html())
  	};
    runGame(objectToSend);
  });
  $('body').on('click', '#remember', function(){
    //hard coding objects to send
    var objectToSend = {
      "activityTitle": 'remember_1',
  	  "word": {
		    "fullWord": $(this).html(),
		    "graphemes": ['r','e', 'm', 'em', 'b', 'er']   // ie. [“c”, “a”, “t”]
  		},
  	  "graphemeToLearn": 'e',
  	  "sentence": removeTags($(this).parent().html())
  	};
    runGame(objectToSend);
  });

  //creates an iframe that will run the spelling game. Game script will pull data from window.stuff
  function runGame(dataIn){
    // console.log(dataIn);
    //******************* MAY need to be changed to an additional API method ****************************//
    appMgr.spellingData = dataIn;
    //create new iframe
    var activity = $('<iframe />');
    //source game file
    activity.attr('src', 'activity/views/iframe.html');
    //******************CHANGE THESE TO WHATEVER THEY NEED TO BE*********************//
    activity.attr('height', '100%');
    activity.attr('width', '100%');
    activity.attr('style', 'position: fixed; z-index: 1; top: 0; background-color: #fff;');
    //attach iframe to DOM
    $('body').append(activity);
  }

  //used to remove html tags from a string for purposes of storing the sentence for the game data
  function removeTags(sentence){
    return sentence.replace(/(<([^>]+)>)/ig,"");
  }
});
