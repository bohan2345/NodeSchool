var usergrid = require('usergrid');

var client = new usergrid.client({
    orgName: 'bohan2345',
    appName: 'sandbox'
});

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

function errorLogHelper(errorMsg, successMsg) {
    if (err) {
        console.log(errorMsg);
    } else {
        console.log(successMsg);
    }
}

module.exports = {
    'create': create,
    'update': update,
    'fetch': fetch,
    'destory': destory
};