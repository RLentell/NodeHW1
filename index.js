var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res){
    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    var chosenHandler = typeof(router[trimmedPath]) != 'undefined' ? router[trimmedPath] : handlers.notFound;

    var data = {};

    chosenHandler(data, function(statusCode, message){
        res.writeHead(statusCode);
        res.end(message);
    });

});

server.listen(3000, function() {
    console.log("The server is listening on port 3000")
});

var handlers = {

};

handlers.hello = function(data,callback){
    callback(200, "Welcome to the Hello Route");
};

handlers.notFound = function(data,callback){
    callback(404);
};

var router = {
    'hello' : handlers.hello
};

