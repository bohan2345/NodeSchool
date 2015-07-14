function create(err, data) {
    var result = {};
    if (err) {
        result = {
            status: 'ERROR',
            message: err,
            data: data
        }
    } else {
        result = {
            status: 'SUCCESS',
            message: 'success!',
            data: data
        }
    }
    console.log(result);
    return result;
}

module.exports = {
    create: function(err, data) {
        create(err, data);
    }
};