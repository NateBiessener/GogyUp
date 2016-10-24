var express = require('express');
var app = express();
var path = require('path');

app.listen(3000);

app.get('/', function(req, res){
  res.sendFile(path.resolve('public/views/index.html'))
});

app.use(express.static('public'));
