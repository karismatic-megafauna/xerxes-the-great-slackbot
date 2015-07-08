var unirest = require('unirest');
var request = require('request');

module.exports = function (req, res, next) {
  var botPayload = {};
  var definedWord, definedWords;
  if (!req.body.text) {
    return res.status(200).send('whops, something went wrong, annoy Michael');
  }

  var requestString = "https://wordsapiv1.p.mashape.com/words/" + req.body.text + "/definitions";

  unirest.get(requestString)
  .header("X-Mashape-Key", "4iIoBDDoMimshMEHtO27Qzs1stjbp1j1yUmjsnVk4z1UHPtrab")
  .header("Accept", "application/json")
  .end(function (result) {
    definedWords = result.body.definitions;
    definedWord = definedWords[Math.floor(Math.random() * definedWords.length)].definition;

    botPayload.text = req.body.user_name + ', the definition of ' + req.body.text + ' is: ' +
      definedWord;
    botPayload.channel = req.body.channel_id;

    send(botPayload, function (error, status, body) {
      if (error) {
        return next(error);

      } else if (status !== 200) {
        // inform user that our Incoming WebHook failed
        return next(new Error('Incoming WebHook: ' + status + ' ' + body));

      } else {
        return res.status(200).end();
      }
    });
  });
};

function send (payload, callback) {
  var path = process.env.INCOMING_WEBHOOK_DEFINE;
  var uri = 'https://hooks.slack.com/services' + path;

  request({
    uri: uri,
    method: 'POST',
    body: JSON.stringify(payload)
  }, function (error, response, body) {
    if (error) {
      return callback(error);
    }

    callback(null, response.statusCode, body);
  });
}
