var http = require('http'),
    url  = require('url'),
    path = require('path'),
    fs   = require('fs');

var Server = function (route, handle) {
    this.onRequest = function (req, response) {
        var pathname = url.parse(req.url).pathname;

        var filename = path.join(process.cwd() + '/public', pathname);

        console.log('request for ' + pathname + ' rec\'d');

        path.exists(filename, function (exists) {
            if (!exists) {
                response.writeHead(404, {"Content-Type": "text/plain"});
                response.write("404 Not Found\n");
                response.end();
                return;
            }
            
            fs.readFile(filename, 'binary', function (err, file) {
                if (err) {
                    response.writeHead(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();
                    return;
                }
                
                response.writeHead(200);
                response.write(file, 'binary');
                response.end();
            });
            
        });

        // route(handle, pathname);
        // 
        // response.writeHead(200, {'Content-type' : 'text/html'});
        // response.write('snoochie boochies');
        // response.end();
    };

};

exports.start = function (route, handle) {
    var server = new Server(route, handle);

    http.createServer(server.onRequest).listen(80);
    console.log('server is running');
}