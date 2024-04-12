// https://stackoverflow.com/questions/27852631/catch-webhook-node-js

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 5000;

const router = express.Router();

app.use(bodyParser.json());

app.post('/hook', function (req, res) {
    var body = req.body;
    var trackingNumber = body.msg.tracking_number;
    var slug = body.msg.slug;
    var token = body.msg.unique_token;

    console.log(trackingNumber, slug, token);

    res.json({
        message: 'ok got it!'
    });
});

var server = app.listen(port, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});

module.exports = router;