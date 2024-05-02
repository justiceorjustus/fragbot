// https://stackoverflow.com/questions/27852631/catch-webhook-node-js

var express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  port = 80; // 80 FOR PRODUCTION, 5000 FOR LOCAL TODO: MAKE THIS AUTOMATIC

// https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object

const router = express.Router();

app.use(bodyParser.json());

app.post("/hook", function (req, res) {
  if (!req.app.locals.tvMessages) {
    req.app.locals.tvMessages = new Array();
  }

  var body = req.body;

  body.hookTimestamp = Date.now();
  body.id = tvMessages.length + 1;

  tvMessages.push(body);

  //req.app.locals.tvMessages.push(body);

  console.log(body);

  if (ws) {
    ws.send(JSON.stringify(body));
    console.log("Message sent");
  }

  // res.json({
  //   message: "ok got it!",
  // });
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Webhooks listening at http://%s:%s", host, port);
});

module.exports = router;
