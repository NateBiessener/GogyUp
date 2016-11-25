GogyUp Read
===========

This is a spelling game that will be integrated into GogyUp's literacy app.

The bulk of this project is in the readerEmulator folder.

The spelling game portion is in readerEmulator/public/activity.

Features:
* Provides user three attempts at spelling the selected word using letter tiles
* Progressive hints if the user fails their first or second attempts
* Tiles can be moved into the playing field by clicking on them or by dragging them into the playing field
* Tiles are sortable within the playing field
* Optional text to speech (TTS) reading of the selected word and its sentence
* Optional OpenDyslexic font
* Responsive display for use of game on mobile devices
* Tracks number of attempts, time each attempt was submitted, and usage of TTS features. Sends this data 'up' to GogyUp's literacy app.

Expects data from the literacy app in the following format:  
{  
&nbsp;&nbsp;"activityTitle": String,  
&nbsp;&nbsp;"word": {  
&nbsp;&nbsp;&nbsp;&nbsp;"fullWord": String,  
&nbsp;&nbsp;&nbsp;&nbsp;"graphemes": Array of strings,   // ie. [“c”, “a”, “t”]  
&nbsp;&nbsp;},  
&nbsp;&nbsp;"graphemeToLearn": String,  
&nbsp;&nbsp;"sentence": String  
}  

Saves tracked data to the literacy app in the following format:  
{  
&nbsp;&nbsp;"activityTitle": String,  
&nbsp;&nbsp;"word": {  
&nbsp;&nbsp;&nbsp;&nbsp;"fullWord": String,  
&nbsp;&nbsp;&nbsp;&nbsp;"graphemes": Array of strings,&nbsp; // ie. [“c”, “a”, “t”]  
&nbsp;&nbsp;},  
&nbsp;&nbsp;score: Number,&nbsp; // score of 3, 2, 1, or 0  
&nbsp;&nbsp;complete: Boolean,  
&nbsp;&nbsp;attempts: {  
&nbsp;&nbsp;&nbsp;&nbsp;attemptOne: Date,  
&nbsp;&nbsp;&nbsp;&nbsp;attemptTwo: Date,  
&nbsp;&nbsp;&nbsp;&nbsp;attemptThree: Date  
&nbsp;&nbsp;},  
&nbsp;&nbsp;exitTime: Date,  
&nbsp;&nbsp;wordTTSClicks: Number,  
&nbsp;&nbsp;sentenceTTSClicks: Number  
}  
