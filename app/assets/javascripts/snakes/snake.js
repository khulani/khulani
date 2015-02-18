(function () {
  if (typeof Snakes === "undefined") {
    window.Snakes = {};
  }

  var Coord = Snakes.Coord = function (row, col) {
    if (isNaN(row) || isNaN(col)) {
      this.row = Math.floor(Math.random() * 20);
      this.col = Math.floor(Math.random() * 20);
    } else {
      this.row = row;
      this.col = col;
    }
  };

  Coord.prototype.plus = function (dir) {
    switch (dir) {
      case "N":
        this.row -= 1;
        if (this.row < 0) {
          this.row = 19;
        }
        break;
      case "E":
        this.col += 1;
        if (this.col > 19) {
          this.col = 0;
        }
        break;
      case "S":
        this.row += 1;
        if (this.row > 19) {
          this.row = 0;
        }
        break;
      case "W":
        this.col -= 1;
        if (this.col < 0) {
          this.col = 19;
        }
        break;
    }
  };

  Coord.prototype.rand = function () {
    this.row = Math.floor(Math.random() * 20);
    this.col = Math.floor(Math.random() * 20);
  };

  Coord.prototype.equal = function (coord) {
    return (this.row === coord.row && this.col === coord.col);
  };

  var Snake = Snakes.Snake = function () {
    this.dir = "N";
    this.segments = [new Coord(10, 10), new Coord(10, 11), new Coord(10, 12)];
  };

  Snake.DIRECTIONS = ["N", "E", "S", "W"];

  Snake.prototype.move = function () {
    var seg = new Coord(this.segments[0].row, this.segments[0].col);
    seg.plus(this.dir);
    this.segments.unshift(seg);
    this.segments.pop();
  };

  Snake.prototype.turn = function (dir) {
    if (dir === 'N' && this.dir != 'S' || dir === 'S' && this.dir != 'N' || 
      dir === 'W' && this.dir != 'E' || dir === 'E' && this.dir != 'W') {
      this.dir = dir;
    }
  };

  Snake.prototype.head = function () {
    return this.segments[0];
  };

  Snake.prototype.tail = function () {
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.grow = function (coord) {
    this.segments.push(coord);
  };

  var Board = Snakes.Board = function () {
    this.snake = new Snake;
    this.apple = new Coord;
    this.grid = new Array(20);
    this.tail = this.snake.tail();
    this.grow = 0;
    this.gameOver = false;
    this.score = 0;

    for(var i = 0; i < this.grid.length; i++) {
      this.grid[i] = [];
      for (var j = 0; j < 20; j++) {
        this.grid[i][j] = 't';
      }
    }

    var that = this;
    this.snake.segments.forEach(function (coord) {
      that.grid[coord.row][coord.col] = 's';
    });

    this.newApple();
  };

  Board.prototype.newApple = function () {
    while (this.grid[this.apple.row][this.apple.col] != 't') {
      this.apple.rand();
    }
    this.grid[this.apple.row][this.apple.col] = 'a';
  };

  Board.prototype.move = function () {
    this.snake.move();

    // console.log('rowX: ' + this.snake.head().row + ' rowY: ' + this.snake.head().col);
    switch (this.grid[this.snake.head().row][this.snake.head().col]) {
      case 'a':
        this.grow += 3;
        this.newApple();
        break;
      case 's':
        this.gameOver = true;
        break;
    }
    
    this.grid[this.snake.head().row][this.snake.head().col] = 's'
    if (this.grow > 0) {
      this.snake.grow(this.tail);
      this.grow--;
      this.score += 30;
    } else {
      this.grid[this.tail.row][this.tail.col] = 't';
      this.tail = this.snake.tail();
    }
  };

  Board.prototype.render = function () {    
    return this.grid;
  };
})();
