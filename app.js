/**
 * Module dependencies.
 */

errCount = 0;
sucCount = 0;
var express = require('express');
var routes = require('./routes');
var cluster = require('cluster');
var os = require("os");
var http = require('http');
var socket = require("socket.io");
var path = require('path');
var app = express();

var databaseUrl = "mongodb://node:123456@widmore.mongohq.com:10010/hover-tracker" || "hoverTracker"; // "username:password@example.com/mydb"
var collections = ["positions"];
db = require("mongojs").connect(databaseUrl, collections);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
// app.use(express.logger('dev'));
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
app.get('/mu-18eef9da-cbd65f78-56369f04-64914c2a', routes.blitz);
app.get('/doNothing', routes.doNothing);
app.post('/loadTest', routes.loadTest);


if (cluster.isMaster) {
  console.log("CPUS: " + os.cpus().length);
  for (var i = 0; i < os.cpus().length / 2; i++) {
    var worker = cluster.fork();
  }
} else {
  server = app.listen(3000);
  console.log('Express server listening on port ' + app.get('port'));
  
  io = socket.listen(server);

  io.sockets.on('connection', function(client){
    db.positions.runCommand('count', function(err, count) {
      client.emit("count", count.n);
    });
  });  
}