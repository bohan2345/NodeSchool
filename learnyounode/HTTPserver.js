var http = require('http');
var url = require('url');

http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });
    var property = url.parse(request.url, true);
    var date = new Date(property.query.iso);
    var res = {};
    if (property.pathname == '/api/parsetime') {
        res = {
                'hour': date.getHours(),
                'minute': date.getMinutes(),
                'second': date.getSeconds()
        };
    } else if (property.pathname == '/api/unixtime') {
        res = {
                'unixtime': date.valueOf()
        }
    }
    response.write(JSON.stringify(res));
    response.end();
}).listen(process.argv[2]);