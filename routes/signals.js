var express = require("express"); // https://stackoverflow.com/questions/27852631/catch-webhook-node-js

var express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  port = 3333;
var router = express.Router();

/* GET signals. */
router.get("/", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  // var messages = req.app.locals.tvMessages;
  res.end(JSON.stringify(tvMessages.slice(-10)));
});

module.exports = router;
