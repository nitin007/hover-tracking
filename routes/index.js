/*
 * GET home page.
 */

exports.index = function(req, res) {
  // if (req.xhr) {
    db.positions.save({name: req.body.name, coords: req.body.coords}, function(err, saved) {
      if (err || !saved) {
        res.end();
        // console.log(++errCount);
      } else {
        res.end();
        // console.log(++sucCount);
        
        //send total no of rows to client sockets
        db.positions.runCommand('count', function(err, count) {
          io.sockets.emit("count", count.n);
        });
      }
    });
  // } else {
  //     res.render('index', {title: 'Hover Tracker'});
  //   }
}

exports.hoverCounts = function(req, res){
  res.render('hover_counts', { title: 'Hover Counts' });
}

exports.blitz = function(req, res){
  res.end('42');
}

exports.records = function(req, res){
  res.end('123');
}