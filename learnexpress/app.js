var express = require('express');
var apigee = require('./apigee.js');
var app = express();

app.get('/', function(req, res) {
    console.log(req.query);
    var type = req.query.type;
    var name = req.query.name;
    apigee.fetch(type, name, function(data) {
        res.json(data);
    });
});

app.post('/', function(req, res) {
    var data = req.body;
    apigee.create(data);
});

app.put('/', function(req, res) {

});

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});