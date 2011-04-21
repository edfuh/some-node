function route(handle, path) {
    console.log('routing request for ' + path);
    
    if (typeof handle[path] !== 'undefined') {
        handle[path].call();
    } else {
        console.log('No handler found for' + path);
    }
}

exports.route = route;