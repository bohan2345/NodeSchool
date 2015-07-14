var express = require('express');
var bodyParser = require('body-parser');
var apigee = require('./apigee.js');
var resultFactory = require('./result_factory.js');

var app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.get('/', function(req, res) {
    console.log(req.query);
    var type = req.query.type;
    var name = req.query.name;
    apigee.fetch(type, name, function(err, data) {
        var result = resultFactory.create(err, data);
        res.json(result);
    });
});

app.post('/', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    var data = req.body;
    console.log(data);
    apigee.create(data, function(err) {
        var result = resultFactory.create(err);
        console.log(result);
        res.json(result);
    });
});

app.put('/', function(req, res) {

});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});