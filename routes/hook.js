// https://stackoverflow.com/questions/27852631/catch-webhook-node-js

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 5000;

// https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object

const router = express.Router();

app.use(bodyParser.json());

app.post('/hook', function (req, res) {
    var body = req.body;

    console.log(body);

    res.json({
        message: 'ok got it!'
    });
});

var server = app.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Webhooks listening at http://%s:%s', host, port);

});

module.exports = router;