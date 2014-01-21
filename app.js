/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var socket = require("socket.io");
var path = require('path');
var app = express();

var databaseUrl = "hoverTracker"; // "username:password@example.com/mydb"
var collections = ["positions"];
db = require("mongojs").connect(databaseUrl, collections);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/hover-counts', routes.hoverCounts);
app.post('/', routes.index);
app.get('/mu-1741bce9-51fda5c2-cc8b0e43-45c07d11', routes.blitz)

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io = socket.listen(server);
// io.disable('heartbeats');

io.sockets.on('connection', function(client){
  db.positions.runCommand('count', function(err, count) {
    client.emit("count", count.n);
  });
});
