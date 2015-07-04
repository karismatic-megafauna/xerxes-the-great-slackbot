var unirest = require('unirest');

module.exports = function (req, res, next) {
  var botPayload = {};
  var definedWord = "";
  if (!req.body.text) {
    return res.status(200).send('whops, something went wrong, annoy Michael');
  }

  definedWord = getDefinition(req.body.text);
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
};

function getDefinition (word) {
  var requestString = "https://wordsapiv1.p.mashape.com/words/" + word + "/definitions";
  var myDefinition, myDefinitions;

  unirest.get(requestString)
  .header("X-Mashape-Key", "4iIoBDDoMimshMEHtO27Qzs1stjbp1j1yUmjsnVk4z1UHPtrab")
  .header("Accept", "application/json")
  .end(function (result) {
    myDefinitions = result.body.definitions;
    myDefinition = myDefinitions[Math.floor(Math.random() * myDefinitions.length)].definition;
  });

  return myDefinition;
}

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
