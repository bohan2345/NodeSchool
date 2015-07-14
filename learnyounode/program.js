
var path = process.argv[2];
var ext = process.argv[3];

var m = require('./module');

m(path, ext, function(err, data) {
	if (err) {
		console.log('error!');
	} else {
		data.forEach(function(value) {
			console.log(value);
		});
	}
});