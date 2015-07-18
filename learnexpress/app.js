var express = require('express');
var bodyParser = require('body-parser');
var apigee = require('./apigee.js');
var resultFactory = require('./result_factory.js');

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

//config port
var port = process.env.PORT || 3000;

//Router level middleware
var router = express.Router();

router.route('/items').get(function(req, res) {
    //get a list of items
    apigee.getItems({}, function(err, result) {
        res.json(resultFactory.create(err, result));
    });
}).post(function(req, res) {
    //add a new item
    var data = req.body;
    
    apigee.saveItem(data, function(err, result) {
        res.json(resultFactory.create(err, result));
    });
});

router.route('/items/:itemType').get(function(req, res) {
    //get a list items for a certain type
}).post(function(req, res) {
    //add a new item to a certain type
    var data = req.body;
    data.itemType = req.params.itemType;
    apigee.create(data, function(err) {
        var result = resultFactory.create(err);
        res.json(result);
    });
});

router.route('/item/:uuid').get(function(req, res) {
    //get an item by id
}).put(function(req, res) {
    //update an item by id
    var data = req.body;
    console.log(data);
    data.uuid = req.params.uuid;
    apigee.updateItem(data, function(err, result) {
    	res.json(resultFactory.create(err, result));
    });
}).delete(function(req, res) {
    //delete an item by id
    var uuid = req.params.uuid;
	apigee.deleteItem({'uuid': uuid}, function(err, result) {
		res.json(resultFactory.create(err, result));
	});
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
