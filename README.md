jQuery static sidebar plugin.
=============================

  Simple lightweight plugin for adding a "follow me" sidebar that follows
  the user down the page as they scroll.

Usage
---

  Supports multiple objects - no specific css is required as it will
  position elements according to original offset and closest positioned
  ancestor.

    $(selector).stickySidebar(options)

Options
---

* speed (default = 150) - the duration of the animation
* easing (default = 'linear') - the easing to use for the animation
* padding (default = 10) - amount of padding from top of window
* constrain (default = false) - set true to stop from scrolling out of parent

Methods
---

  remove - removes the selected sticky boxes

    $(selector).stickySidebar("remove")

  destroy - removes all sticky boxes and event listeners

    $(selector).stickySidebar("destroy")
