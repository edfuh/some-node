var server = require('./server'),
    router = require('./router'),
    routes = require('./routes');

var handle = {};
handle['/'] = routes.start;
handle['/start'] = routes.start;
handle['/upload'] = routes.upload;

server.start(router.route,  handle);