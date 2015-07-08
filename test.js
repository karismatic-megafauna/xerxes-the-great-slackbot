"use strict";
var unirest = require('unirest');
var argv = require('yargs').argv;
var definition;
// get ths from req.body.text?
var word = argv._.toString();
var requestString = "https://wordsapiv1.p.mashape.com/words/" + word + "/definitions";

var endFunction = function (result) {
  definition = result.body.definitions[0].definition;
};

getDefinition("poop").then(function(val){console.log(val)});

function getDefinition (word) {
  var p1 = new Promise( function( resolve , reject ) {
    resolve('balls');
  });
  return p1;
}

unirest.get(requestString)
  .header("X-Mashape-Key", "4iIoBDDoMimshMEHtO27Qzs1stjbp1j1yUmjsnVk4z1UHPtrab")
  .header("Accept", "application/json")
  .end(endFunction);

console.log(definition);
