<!DOCTYPE html>
<html>
  <head>
    <title>jQuery stickysidebar plugin</title>
  <link href='http://fonts.googleapis.com/css?family=Yanone+Kaffeesatz:extralight,light,regular,bold' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="../style/default.css" media="screen" />
    <link rel="stylesheet" href="style/sticky.css" media="screen" />
  </head>
  <body>
    <div id="wrap">
      <header>
        <h1>jQuery Sticky Sidebar</h1>
        <div id="main">
          <h2>Product catalogue</h2>
          <ul id="products">
          <?php for ($i = 1; $i <= 30; ++$i) : ?>
            <li<?php if ($i % 3 == 0) echo ' class="end"'; ?>>
              <h3>Product <?php echo $i ?></h3>
              <img src="style/images/product.png" width="126" height="126" alt="product image" />
            </li>
          <?php endfor; ?>
          </ul>
        </div>
        <div id="side">
          <div id="basket">
            <h3>Your basket</h3>
            <p>Total: <strong>&pound;455.00</strong></p>
            <span id="items">4</span>
          </div>
        </div>
    </div>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
    <script src="js/jquery.easing.1.3.js"></script>
    <script src="js/stickysidebar.jquery.js"></script>
    <script>
      $(function () {
        $("#basket").stickySidebar({
            timer: 400
          , easing: "easeInOutBack"
        });
      });
    </script>
  </body>
</html>
