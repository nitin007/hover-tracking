var HoverCount = function(){
  this.init();
}

HoverCount.prototype = {
  init: function(){
    // variables
    this.server = io.connect(document.location.origin);
    
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