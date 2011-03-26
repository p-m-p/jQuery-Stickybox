(function ($) {

  $.fn.stickySidebar = function (opts) {

    var stickyboxes = []
      , $window = $(window)
      , settings = $.extend({
          speed: 350 // animation duration
        , easing: "linear" // use easing plugin for more options
      }, opts);

    this.each( function () {
      
      var _self = $(this);
      this.offs = {}; // our parents offset 
      this.orig = { // cache for original css
          top: (isNaN(_self.css("top")) ? 0 : _self.css("top"))
        , left: _self.css("left")
        , position: _self.css("position")
        , marginTop: _self.css("marginTop")
        , marginLeft: _self.css("marginLeft")
        , offset: _self.offset()
      };   

      this.setPositions = function () {
        // set position according to nearest postioned container
        var currOff = _self.offset();
        this.offs = findPositionedParent();
        _self.css({
            position: "absolute"
          , top: currOff.top - this.offs.top + "px"
          , left: currOff.left - this.offs.left + "px"
          , margin: 0
          , width: _self.width()
        });
        console.log(this.orig);
        this.moveIntoView();
      }

      this.moveIntoView = function (ev) {
        var elem = _self.get(0)
          , sTop = $window.scrollTop() - elem.offs.top
          , currOffs = _self.offset()
          , origTop = elem.orig.offset.top - elem.offs.top;
        // scrolled down out of view
        if (origTop < sTop) { 
          _self
            .stop()
            .animate(
                {top: sTop + 10 + "px"}
              , settings.speed
              , settings.easing
            );
        }
        // scolled back up past original offset
        else if (currOffs.top > origTop) 
          _self
            .stop()
            .animate(
                {top: origTop}
              , settings.speed
              , settings.easing
            );
      }
      
      var findPositionedParent = function () {
        // start with current parent
        var $parent = _self.parent()
          , parentOffs = $parent.offset();
        // go up the tree until we find an elem to position from
        while (parentOffs && "top" in parentOffs
          && $parent.css("position") == "static") {
          $parent = $parent.parent();
          parentOffs = $parent.offset();
        }
        if (parentOffs) // found a postioned ancestor
          return parentOffs;
        else return { top: 0, left: 0 }; // ooops went to far set to doc
      }

      this.reset = function () {
        _self.css({
            position: this.orig.position
          , marginTop: this.orig.marginTop
          , marginLeft: this.orig.marginLeft
          , left: this.orig.left
          , top: this.orig.top
        });
      }
      
      this.setPositions();
      stickyboxes[stickyboxes.length] = this;

    });

    $window.bind("resize", function () {
      for (var i = 0, sbl = stickyboxes.length; i < sbl; ++i)
        stickyboxes[i].reset();
      for (i = 0; i < sbl; ++i)
        stickyboxes[i].setPositions();
    });
    $window.bind("scroll", function () {
      for (var i = 0, sbl = stickyboxes.length; i < sbl; ++i)
        stickyboxes[i].moveIntoView();
    });

  }

})(jQuery);
