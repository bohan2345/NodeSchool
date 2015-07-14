var http = require('http')
var all1 = "", all2 = "", all3 = "";

var done1 = false, done2 = false, done3 = false;

http.get(process.argv[2], function(response) {
	response.setEncoding('utf8')
	response.on('data', function(data) {
		all1 += data;
	}).on('end', function() {
		done1 = true;
		if (done1 && done2 && done3) {
			console.log(all1);
			console.log(all2);
			console.log(all3);
		}
	})
})

http.get(process.argv[3], function(response) {
	response.setEncoding('utf8')
	response.on('data', function(data) {
		all2 += data;
	}).on('end', function() {
		done2 = true;
		if (done1 && done2 && done3) {
			console.log(all1);
			console.log(all2);
			console.log(all3);
		}
	})
})

http.get(process.argv[4], function(response) {
	response.setEncoding('utf8')
	response.on('data', function(data) {
		all3 += data;
	}).on('end', function() {
		done3 = true;
		if (done1 && done2 && done3) {
			console.log(all1);
			console.log(all2);
			console.log(all3);
		}
	})
})
