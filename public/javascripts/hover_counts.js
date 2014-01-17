var HoverCount = function(){
  this.init();
}

HoverCount.prototype = {
  init: function(){
    // variables
    this.server = io.connect("http://127.0.0.1:3000");
    
    // init functions
    this.initClientConnect();
  },
  
  initClientConnect: function(){
    var that = this;
    
    this.server.on('connect', function(data, clients){
      // alert('connected');
    });
    
    this.server.on('count', function(count){
      $('.connected').text(count);
      // alert(count);
    });
  }  
}

var hoverCount;

$(document).ready(function() {
	hoverCount = new HoverCount();
});