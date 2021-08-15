
var http = require("http");
var handler = require('./request').requestHandler;
http.createServer(handler).listen(8989);