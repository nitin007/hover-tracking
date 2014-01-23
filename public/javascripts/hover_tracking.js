var HoverTracking = function() {
  this.pageLimit = 100000;
  this.init();
}

HoverTracking.prototype = {
  init: function() {
    this.fillWithBoxes();
    this.listenEvents();
  },

  fillWithBoxes: function() {
    var container = this.getContainer();
    this.fillContainer(container);
  },

  listenEvents: function() {
    var that = this;

    $('#container').delegate('.box', 'mouseenter', function(e) {
      that.pushCursorPosition($(this), e);
    });
  },

  pushCursorPosition: function(box, e) {
    var bname = box.data('name');
    var coords = e.pageX + ',' + e.pageY;

    $.ajax({
      type: 'post',
      url: '/',
      data: {
        name: bname,
        coords: coords
      },
      dataType: 'json'
    });
  },

  getDiv: function(num) {
    return $('<div class=box data-name=box-' + num + '>');
  },

  getContainer: function() {
    return $('#container');
  },

  fillContainer: function(container) {
    for (var i = 1; i <= this.pageLimit; i++) {
      container.append(this.getDiv(i));
    }
  }
}

$(function() {
  hoverTracker = new HoverTracking();
});
