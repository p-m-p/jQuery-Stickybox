(function ($) {

  $.fn.stickySidebar = function (opts) {

    var _self = $(this)
      , offs = { left: 0, top: 0 } // default offset is to document
      , orig = {
            left: 0 
          , top: 0
          , position: _self.css("position")
          , marginTop: _self.css("marginTop")
          , marginLeft: _self.css("marginLeft")
        } // original offset holder
      , settings = $.extend({
            container: document // the scolling parent
          , timer: 250 // how often to update
          , delay: 0 // how long to wait before update
          , easing : "linear"
        }, opts);

    settings.container = $(settings.container);

    var setPositions = function () {
      // may need to reset to get offset
      var currOff = _self.offset();
      _self.css({
          position: orig.position
        , marginTop: orig.marginTop
        , marginLeft: orig.marginLeft
      });
      // if positioned inside another elem
      if (_self.css("position") != "static") {
        var offsetParent = _self.parent().offset();
        offs.top = offsetParent.top;
        offs.left = offsetParent.left;
        orig.top = orig.top - offs.top;
        orig.left = orig.top - offs.top;
      } else {
        orig.top = currOff.top;
        orig.left = currOff.left;
      }
      // set position according to container
      _self.css({
          position: "absolute"
        , top: _self.offset().top - offs.top + "px"
        , left: _self.offset().left - offs.left + "px"
        , margin: 0
      });
      moveIntoView();
    }

    var moveIntoView = function (ev) {
      var sTop = settings.container.scrollTop();
      if (orig.top < sTop) { // scrolled in the container
        _self
          .stop()
          .delay(settings.delay)
          .animate({top: sTop + 10 + "px"}, settings.timer, settings.easing);
      } else if (_self.offset().top > orig.top) // scolled back up to top
        _self
          .stop()
          .delay(settings.delay)
          .animate({top: orig.top}, settings.timer, settings.easing);
    }
    
    var findPositionedParent = function () {
        
    }
    
    setPositions();
    $(window).bind("resize", setPositions);
    settings.container.bind("scroll", moveIntoView);

  }

})(jQuery);
