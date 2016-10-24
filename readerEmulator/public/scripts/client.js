console.log('script sourced');

window.destroy = function(){
  $('iframe').remove();
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
    var activity = $('<iframe />');
    activity.attr('src', 'testActivity/index.html');
    $('body').append(activity);
  }

  function removeTags(sentence){
    return sentence.replace(/(<([^>]+)>)/ig,"");
  }
})
