(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var View = Snakes.View = function ($el) {
    this.$el = $el;
    // this.$startDiv = $el.find('.start');
    this.menu = true;
    this.renderMenu(false);
  };

  View.prototype.renderMenu = function (gameOver) {
    var $startDiv = $('<div>');
    var $button = $('<button>');
    if (gameOver) {
      $startDiv.append('<div>GAME OVER!</div>')
    } else {
      for (var i = 0; i < 400; i++) {
        var $tile = $('<div>');
        $tile.addClass('t');
        this.$el.append($tile)
    }
    }
    $button.html('Start New Game');
    $startDiv.addClass('start');
    $startDiv.append($button);
    this.$el.prepend($startDiv);
    this.bindKeys();

  };

  View.prototype.startGame = function () {
    var that = this;
    this.board = new Snakes.Board;
    this.running = setInterval(function () { that.step(); }, 80);
    // this.renderMenu();
  };

  View.prototype.step = function () {
    if (this.board.gameOver) {
      clearInterval(this.running);
      this.renderMenu(true);
    } else {
      this.board.move();
      this.render();
    }
  };

  View.prototype.render = function () {
    this.$el.empty();
    var grid = this.board.render();
    for (var i = 0; i < grid.length; i++) {
      for(var j = 0; j < grid[i].length; j++){
        var $tile = $('<div>');
        $tile.addClass(grid[i][j]);
        this.$el.append($tile)
      }
    }
    var $score = $('<div>')
    $score.addClass('score')
    $score.html(this.board.score);
    this.$el.prepend($score);
  };

  View.prototype.bindKeys = function () {
    var that = this;
    this.$el.find('button').on('click', function () { 
      that.startGame(); 
    });
    $(document).on('keydown', function (event) {
      that.handleKeyEvent(event);
    });
  };

  View.prototype.handleKeyEvent = function (event) {
    // console.log(event.keyCode);
    switch (event.keyCode) {
      case 38:
        this.board.snake.turn("N");
        break;
      case 37:
        this.board.snake.turn("W");
        break;
      case 40:
        this.board.snake.turn("S");
        break;
      case 39:
        this.board.snake.turn("E");
        break;
    }
  };

})();
  