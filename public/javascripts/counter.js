 var socket = io.connect('http://localhost:3000/');
 // console.log("fgd");
 socket.on('count', function(data) {
     $("#counter").text(data.totalCount.n);
 });
