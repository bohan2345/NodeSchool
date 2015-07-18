function create(err, data) {
    var result = {
        data: data
    };
    if (err) {
        result.status = 'ERROR';
        result.message = 'Action failed!';
        result.has_error = err;
    } else {
        result.status = 'SUCCESS';
        result.message = 'Action success!';
        result.has_error = err;
    }
    console.log(result);
    return result;
}

module.exports = {
    create: function(err, data) {
        return create(err, data);
    }
};