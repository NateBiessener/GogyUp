var express = require('express');
var app = express();
var path = require('path');

app.listen(3141, function(){
  console.log('server up on 3141');
});

app.get('/', function(req, res){
  // console.log('base url hit');
  res.sendFile(path.resolve('readerEmulator/public/app.html'));
});

app.use(express.static('readerEmulator/public/'));
