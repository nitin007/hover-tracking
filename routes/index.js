/*
 * GET home page.
 */

exports.index = function(req, res) {
  if (req.xhr) {
    db.positions.save({name: req.body.name, coords: req.body.coords}, function(err, saved) {
      if (err || !saved) {
        res.end("Coords not saved");
        console.log("Coords not saved");
      } else {
        res.end("Coords saved");
        console.log("Coords saved");
        
        //send total no of rows to client sockets
        db.positions.runCommand('count', function(err, count) {
          io.sockets.emit("count", count.n);
        });
      }
    });
  } else {
      res.render('index', {title: 'Hover Tracker'});
    }
}

exports.hoverCounts = function(req, res){
  res.render('hover_counts', { title: 'Hover Counts' });
}