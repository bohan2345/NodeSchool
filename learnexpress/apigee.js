var Usergrid = require('usergrid');
var Logger = require('./logger.js');

var client = new Usergrid.client({
    orgName: 'bohan2345',
    appName: 'sandbox'
});

var options = {
    type: 'items',
    client: client
};

function getItems(args, callback) {
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
    }
};
