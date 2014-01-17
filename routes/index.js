/*
 * GET home page.
 */

var databaseUrl = "hoverTracker"; // "username:password@example.com/mydb"
var collections = ["positions"];
var db = require("mongojs").connect(databaseUrl, collections);
exports.index = function(req, res) {
    var mySock;
    if (req.xhr) {
        data = req.body;
        db.positions.save({
            name: data.name,
            coords: data.coords
        }, function(err, saved) {
            if (err || !saved) {
                res.end("Coords not saved");
                console.log("Coords not saved");
            } else {
                res.end("Coords saved");
                console.log("Coords saved");

                //send total no of rows to client sockets
                db.positions.runCommand('count', function(err, res) {
                    io.sockets.emit("count", {
                        totalCount: res
                    });
                });
            }
        });
    } else {
        res.render('index', {
            title: 'Hover Tracking'
        });
    }

    io.sockets.on("connection", function(socket) {
        db.positions.runCommand('count', function(err, res) {
            socket.emit("count", {
                totalCount: res
            });
        });
    });
};
