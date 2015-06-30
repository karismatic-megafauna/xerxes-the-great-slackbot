var express = require("express");
var dicebot = require('./dicebot');
var Xerxes= require("./hellobot.js");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function (req, res) { res.status(200).send('Hello World'); });

app.use(function (err, req, res, next){
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function (){
  console.log('Slackbot is listening on ' + port);
});

app.post('/hello', Xerxes);
app.post('/roll', dicebot);
