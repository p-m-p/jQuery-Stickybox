(function ($) {

  $.fn.stickySidebar = function (opts) {

    var _self = $(this)
        $window = $(window)
      , offs = {} // our parents offset 
      , orig = { // cache for original css
            top: (isNaN(_self.css("top")) ? 0 : _self.css("top"))
          , left: _self.css("left")
          , position: _self.css("position")
          , marginTop: _self.css("marginTop")
          , marginLeft: _self.css("marginLeft")
        } 
      , settings = $.extend({
            speed: 150 // animation duration
          , easing: "linear" // use easing plugin for more opts
        }, opts);

    var setPositions = function () {
      // set position according to nearest postioned container
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
      var sTop = $window.scrollTop() - offs.top;
      // scrolled down out of view
      if (orig.top < sTop) { 
        _self
          .stop()
          .animate(
              {top: sTop + 10 + "px"}
            , settings.speed
            , settings.easing
          );
      }
      // scolled back up past original offset
      else if (_self.offset().top > orig.top) 
        _self
          .stop()
          .animate({top: orig.top}, settings.speed, settings.easing);
    }
    
    var findPositionedParent = function () {
      // start with current parent
      var $parent = _self.parent()
        , parentOffs = $parent.offset();
      // go up the tree until we find an elem to position from
      while (parentOffs.top && $parent.css("position") == "static") {
        $parent = $parent.parent();
        parentOffs = $parent.offset();
      }
      if (parentOffs) // found a postioned ancestor
        return parentOffs;
      else return { top: 0, left: 0 }; // ooops went to far set to doc
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
    $window.bind("resize", reset);
    $window.bind("scroll", moveIntoView);

  }

})(jQuery);
