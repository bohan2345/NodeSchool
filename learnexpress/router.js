var express = require('express');
//Router level middleware
var router = express.Router();

/**
 * operations to all items
 */

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

/**
 * operations to a given type of items
 */

router.route('/items/:itemType').get(function(req, res) {
    //get a list items for a certain type
    apigee.getItemsByType(req.params.itemType, function(err, result) {
        res.json(resultFactory.create(err, result));
    });
}).post(function(req, res) {
    //add a new item to a certain type
    var data = req.body;
    data.itemType = req.params.itemType;
    apigee.create(data, function(err) {
        var result = resultFactory.create(err);
        res.json(result);
    });
});

/**
 * operations to a given item identified by uuid
 */

router.route('/item/:uuid').get(function(req, res) {
    //get an item by id
    apigee.getItemByUUid(req.params.uuid, function(err, result) {
        res.json(resultFactory.create(err, result));
    });
}).put(function(req, res) {
    //update an item by id
    var data = req.body;
    console.log("log in app.js/item/:uuid/put ---> \n" + data);
    data.uuid = req.params.uuid;
    apigee.updateItem(data, function(err, result) {
        res.json(resultFactory.create(err, result));
    });
}).delete(function(req, res) {
    //delete an item by id
    var uuid = req.params.uuid;
    apigee.deleteItem({
        'uuid': uuid
    }, function(err, result) {
        res.json(resultFactory.create(err, result));
    });
});

module.exports = router; 