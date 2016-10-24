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
  $('body').on('click', '#grease', function(){
    //hard coding objects to send
    var objectToSend = {
      "activityTitle": undefined,  // if populated, used to load activity state through API
  	  "word": {
		    "fullWord": $(this).html(),
		    "graphemes": ['g', 'r', 'ea', 'se']   // ie. [“c”, “a”, “t”]
  		},
  	  "graphemeToLearn": 'ea',
  	  "sentence": removeTags($(this).parent().html())
  	}
    runGame(objectToSend);
  });
  $('body').on('click', '#these', function(){
    //hard coding objects to send
    var objectToSend = {
      "activityTitle": undefined,  // if populated, used to load activity state through API
  	  "word": {
		    "fullWord": $(this).html(),
		    "graphemes": ['th','e','se']   // ie. [“c”, “a”, “t”]
  		},
  	  "graphemeToLearn": 'e',
  	  "sentence": removeTags($(this).parent().html())
  	}
    runGame(objectToSend);
  });
  $('body').on('click', '#piece', function(){
    //hard coding objects to send
    var objectToSend = {
      "activityTitle": undefined,  // if populated, used to load activity state through API
  	  "word": {
		    "fullWord": $(this).html(),
		    "graphemes": ['p','ie','ce']   // ie. [“c”, “a”, “t”]
  		},
  	  "graphemeToLearn": 'ie',
  	  "sentence": removeTags($(this).parent().html())
  	}
    runGame(objectToSend);
  });
  $('body').on('click', '#seem', function(){
    //hard coding objects to send
    var objectToSend = {
      "activityTitle": undefined,  // if populated, used to load activity state through API
  	  "word": {
		    "fullWord": $(this).html(),
		    "graphemes": ['s','ee','m']   // ie. [“c”, “a”, “t”]
  		},
  	  "graphemeToLearn": 'ee',
  	  "sentence": removeTags($(this).parent().html())
  	}
    runGame(objectToSend);
  });

//creates an iframe that will run the spelling game. Game script will pull data from window.stuff
  function runGame(dataIn){
    console.log(dataIn);
    //******************* MAY need to be changed to an additional API method ****************************//
    window.stuff = dataIn;
    //create new iframe
    var activity = $('<iframe />');
    //source game file *****************CHANGE TO ACTUAL GAME FILE*******************//
    activity.attr('src', 'testActivity/index.html');
    //******************CHANGE THESE TO WHATEVER THEY NEED TO BE*********************//
    activity.attr('height', '200px');
    activity.attr('width', '400px');
    //attach iframe to DOM
    $('body').append(activity);
  }

  //used to remove html tags from a string for purposes of storing the sentence for the game data
  function removeTags(sentence){
    return sentence.replace(/(<([^>]+)>)/ig,"");
  }
})
