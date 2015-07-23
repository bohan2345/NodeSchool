var Usergrid = require('usergrid');
var Logger = require('./logger.js');

var client = new Usergrid.client({
    orgName: 'bohan2345',
    appName: 'sandbox'
});

function getItems(args, callback) {
    var options = {
        type: 'items',
        client: client
    };
    var collection = new Usergrid.collection(options);
    collection.fetch(function(err, result) {
        if (err) {
            Logger.logError(err);
            callback(err, result);
        } else {
            callback(err, result.entities);
        }
    });
}

function getItemsByType(type, callback) {
    var options = {
        endpoint: "items",
        qs: {
            ql: "item_type = '" + type + "'"
        }
    };
    client.request(options, function (err, result) {
    	if (err) {
    		Logger.logError(err);
            callback(err, result);
    	} else {
    		callback(err, result.entities);
    	}
    });
}

function getItemByUUid(uuid, callback) {
    var options = {
        type: "items",
        uuid: uuid
    };

    client.getEntity(options, function(err, result) {
        if (err) {
            Logger.logError(err);
            callback(err, result);
        } else {
            callback(err, result._data);
        }
    });
}

function saveItem(args, callback) {
    args.type = 'items';
    client.createEntity(args, function(err, result) {
        if (err) {
            Logger.logError(err);
            callback(err, result);
        } else {
            callback(err, result._data);
        }
    });
}

function updateItem(args, callback) {
    args.type = 'items';
    var properties = {
        client: client,
        data: args
    };

    var entity = new Usergrid.entity(properties);

    entity.save(function(err, result) {
        if (err) {
            Logger.logError(err);
            callback(err, result);
        } else {
            callback(err, result.entities[0]);
        }
    });
}

function deleteItem(args, callback) {
    var properties = {
        client: client,
        data: {
            'type': 'items',
            'uuid': args['uuid']
        }
    };

    var entity = new Usergrid.entity(properties);

    entity.destroy(function(err, result) {
        if (err) {
            Logger.logError(err);
            callback(err, result);
        } else {
            callback(err, result.entities[0]);
        }
    });
}

function create(data, callback) {
    var options = {
        type: data.type,
        name: data.name
    };

    client.createEntity(options, function(err, dog) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            dog.set(data);

            dog.save(function(err) {
                callback(err);
            });
        }
    });
}

function update(name, data) {

}

function fetch(type, name, callback) {
    var options = {
        type: type,
        name: name
    };
    client.getEntity(options, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            callback(err, data);
        }
    });
}

function destory(name) {

}

module.exports = {
    'create': create,
    'update': update,
    'fetch': fetch,
    'destory': destory,
    'getItems': function(args, callback) {
        getItems(args, callback);
    },
    'saveItem': function(args, callback) {
        saveItem(args, callback);
    },
    'deleteItem': function(args, callback) {
        deleteItem(args, callback);
    },
    'updateItem': function(args, callback) {
        updateItem(args, callback);
    },
    'getItemByUUid': function(args, callback) {
        getItemByUUid(args, callback);
    },
    'getItemsByType': function(args, callback) {
        getItemsByType(args, callback);
    }
};
