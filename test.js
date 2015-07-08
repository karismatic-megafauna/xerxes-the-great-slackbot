"use strict";
var unirest = require('unirest');
var argv = require('yargs').argv;

// get ths from req.body.text?
var word = argv._.toString();
var requestString = "https://wordsapiv1.p.mashape.com/words/" + word + "/definitions";

unirest.get(requestString)
.header("X-Mashape-Key", "4iIoBDDoMimshMEHtO27Qzs1stjbp1j1yUmjsnVk4z1UHPtrab")
.header("Accept", "application/json")
.end(function (result) {
  var definitions = result.body.definitions;
  var definition = definitions[Math.floor(Math.random() * definitions.length)].definition;
  //start your callback hell here, send should be called from here...yikes
});
