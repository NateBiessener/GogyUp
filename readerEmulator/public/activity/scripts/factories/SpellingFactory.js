myApp.factory('SpellingFactory', [function(){
  var objectIn = {};
  
  var storeObject = function(object){
    objectIn = object;
  }

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
      return objectIn
    },
    checkSpelling: checkSpelling,
    displayWord: displayWord
  }

}]);
