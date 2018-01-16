document.THREE = document.THREE || {};

LEFT = 37;
RIGHT = 39;
UP = 38;
DOWN = 40;
REPLAY = 82;

// Helper to repeat |block| |n| times
Template.game.times = function(n, block) {
  var result = "";
  for (var i = 0; i < n; i++) {
    result += block.fn(i);
  }
  return result;
}

// Game loop 'n' stuff
$(function() {
  GAnalytics.pageview();

  // Start new game if none exists
  if (!Session.get("tiles")) {
    document.THREE.game.new_game();
  }
  else {
    document.THREE.display.render_board();
    document.THREE.display.render_next();
  }

  // Handle keypresses
  var queue = [];
  var lazy_move = _.throttle(document.THREE.game.move, 250, true);
  $(window).on("keydown", function(e) {
    if (e.keyCode === LEFT ||
        e.keyCode === RIGHT ||
        e.keyCode === UP ||
        e.keyCode === DOWN)  {
      e.preventDefault();
      lazy_move(e);
    }
  });

  $(window).on("keydown", function(e) {
    if (e.keyCode === REPLAY)  {
      document.THREE.game.new_game()
    }
  });

  // Handle "new game"
  $("#new-game").click(document.THREE.game.new_game);
  $("#gamehint").click(document.THREE.game.new_game);
  $("#auto-run").click(document.THREE.game.new_game);

  // Handle "again game"
  // $("#again-game").click(document.THREE.game.new_game);

  // Handle music controls
  var method = "play";
  $("#music-control").click(function(e) {
    e.preventDefault();
    if (method === "play") {
      $("#music-audio").get(0)["play"]();
      $(this).html("Pause");
      method = "pause";
    }
    else {
      $("#music-audio").get(0)["pause"]();
      $(this).html("Play");
      method = "play";
    }
  });
});
