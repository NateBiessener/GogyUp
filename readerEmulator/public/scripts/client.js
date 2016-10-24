console.log('script sourced');

window.g_appMgr = {};
var appMgr = window.g_appMgr;

//assumes only one iframe will be on the page at a time
appMgr.setActivityComplete = function(){
  $('iframe').remove();
};

appMgr.dataSave = function(saveVarName, objectToSave, callback){
  appMgr[saveVarName] = objectToSave;
  if (callback) {
    callback();
  }
};

appMgr.dataLoad = function(varName, callback){
  if (callback) {
    callback(appMgr[varName]);
  }
};

$(document).ready(function(){
  console.log('jq works');
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

  function runGame(dataIn){
    console.log(dataIn);
    window.stuff = dataIn;
    var activity = $('<iframe />');
    activity.attr('src', 'testActivity/index.html');
    activity.attr('height', '200px');
    activity.attr('width', '400px');
    $('body').append(activity);
  }

  function removeTags(sentence){
    return sentence.replace(/(<([^>]+)>)/ig,"");
  }
})
