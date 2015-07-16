function logError(err) {
    console.log(err);
}

module.exports = {
    logError: function(err) {
        logError(err);
    }
};
