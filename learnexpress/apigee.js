var usergrid = require('usergrid');

var client = new usergrid.client({
    orgName: 'bohan2345',
    appName: 'sandbox'
});

function create(data) {
    var options = {
        type: data.type,
        name: data.name
    };
    client.createEntity(options, function(err, dog) {
        if (err) {
            console.log(err);
        } else {
            console.log('entity created!');
        }

        dog.set(data);

        dog.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('entity saved!');
            }
        });
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
            callback(data);
        }
    });
}

function destory(name) {

}

module.exports = {
    'create': create,
    'update': update,
    'fetch': fetch,
    'destory': destory
};