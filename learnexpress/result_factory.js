function create(err, data) {
    var result = {
        data: data
    };
    if (err) {
        result.status = 'ERROR';
        result.message = err;
    } else {
        result.status = 'SUCCESS';
        result.message = 'success!';
    }
    console.log(result);
    return result;
}

module.exports = {
    create: function(err, data) {
        create(err, data);
    }
};