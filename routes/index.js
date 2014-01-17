
/*
 * GET home page.
 */

var databaseUrl = "hoverTracker"; // "username:password@example.com/mydb"
var collections = ["positions", "hoverCounts"]
var db = require("mongojs").connect(databaseUrl, collections);

exports.index = function(req, res){
  if(req.xhr){
    db.positions.save({name: req.body.name, coords: req.body.coords}, function(err, saved) {
      if( err || !saved ) {
        res.end("Coords not saved");
        console.log("Coords not saved");
      }
      else {
        res.end("Coords saved");
        console.log("Coords saved");
      }
    });        
  } else {
    res.render('index', { title: 'Hover Tracking' });
  }
};

exports.hoverCounts = function(req, res){
  res.render('hover_counts', { title: 'Hover Counts' });
}