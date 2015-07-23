var express = require('express');
var bodyParser = require('body-parser');
var apigee = require('./apigee.js');
var resultFactory = require('./result_factory.js');
//config port
var port = process.env.PORT || 3000;
var router = require('./router.js');

var app = express();

app.use(bodyParser.json());
// to support JSON-encoded bodies
app.use(bodyParser.urlencoded({// to support URL-encoded bodies
    extended: true
}));

//set common response header
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    next('route');
});

app.use('/myapi', router);

//Error handling middleware
router.use(function(err, req, res, next) {

});

var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
