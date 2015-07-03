var unirest = require('unirest');

var request = require('request');

module.exports = function (req, res, next) {


};


unirest.get("https://wordsapiv1.p.mashape.com/words/incredible/definitions")
.header("X-Mashape-Key", "08WdxtgixCmshoTuhdrL8wrvblv3p1vDdBcjsnjHUeVqbQigGP")
.header("Accept", "application/json")
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
