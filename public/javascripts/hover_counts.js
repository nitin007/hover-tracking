var HoverCount = function(){
  this.init();
}

HoverCount.prototype = {
  init: function(){
    // variables
    this.server = io.connect("http://127.0.0.1:3000");
    
    // init functions
    this.updateHoverCount();
  },
  
  updateHoverCount: function(){
    this.server.on('count', function(count){
      $('h2').text(count);
    });
  }  
}

var hoverCount;

$(document).ready(function() {
	hoverCount = new HoverCount();
});