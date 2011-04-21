var http = require('http'),
    url = require('url');

var start = function (route, handle) {
    function onRequest(req, response) {
        var pathname = url.parse(req.url).pathname;
        console.log('request for ' + pathname + ' rec\'d');
        
        route(handle, pathname);
        
        response.writeHead(200, {'Content-type' : 'text/html'});
        response.write('snoochie boochies');
        response.end();
    }
    
    http.createServer(onRequest).listen(80);
    console.log('server is running');
}

exports.start = start;