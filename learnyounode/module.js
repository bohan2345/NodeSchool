var fs = require('fs');
module.exports = function (path, ext, callback) {
	fs.readdir(path, function(err, list) {
		if (err) {
			callback(err);
			return;
		}
		var data = [];
		list.forEach(function(value, index, arr) {
			if (value.lastIndexOf('.') == -1)
				return;
			var x = value.substring(value.lastIndexOf('.') + 1);
			if (x == ext) {
				data.push(value);
			}
		});
		callback(err, data);
	});
};