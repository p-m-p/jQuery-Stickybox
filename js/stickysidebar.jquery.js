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
        } 
      , settings = $.extend({
            container: document // the scolling parent
          , timer: 250 // how often to update
          , delay: 0 // how long to wait before update
          , easing : "linear"
        }, opts);

    settings.container = $(settings.container);

    var setPositions = function () {
      var currOff = _self.offset();
      // set position according to container
      offs = findPositionedParent();
      _self.css({
          position: "absolute"
        , top: _self.offset().top - offs.top + "px"
        , left: _self.offset().left - offs.left + "px"
        , margin: 0
        , width: _self.width()
      });
      moveIntoView();
    }

    var moveIntoView = function (ev) {
      var sTop = settings.container.scrollTop() - offs.top;
      if (orig.top < sTop) { // scrolled in the container
        _self
          .stop()
          .delay(settings.delay)
          .animate(
              {top: sTop + 10 + "px"}
            , settings.timer
            , settings.easing
          );
      } else if (_self.offset().top > orig.top) // scolled back up to top
        _self
          .stop()
          .delay(settings.delay)
          .animate({top: orig.top}, settings.timer, settings.easing);
    }
    
    var findPositionedParent = function () {
      var $parent = _self.parent()
        , parentOffs = $parent.offset();
      // go up the tree until we find an elem to position from
      while (parentOffs.top && $parent.css("position") == "static") {
        $parent = $parent.parent();
        parentOffs = $parent.offset();
      }
      if (parentOffs)
        return parentOffs;
      else return { top: 0, left: 0 };
    }

    var reset = function () {
      _self.css({
          position: orig.position
        , marginTop: orig.marginTop
        , marginLeft: orig.marginLeft
      });
      setPositions();
    }
    
    setPositions();
    $(window).bind("resize", reset);
    settings.container.bind("scroll", moveIntoView);

  }

})(jQuery);
