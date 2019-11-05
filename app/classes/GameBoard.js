function GameBoard(length, height) {
  this.length = length;
  this.height = height;
  this.grid = {};
}

// Initialise the game board grid
GameBoard.prototype.createGameBoard = function() {
  for (let i = 0; i < this.height; i++) {
    this.grid[i] = [];
    this.grid[i][0] = i;
  
    let j = 0;
    for(j; j < this.length; j++) {
      this.grid[i][j] = j;
    }
  }

  return this.grid;
}

// Ensure initial placement is within bounds of game board
GameBoard.prototype.checkPlace = function(x, y) {
  if (x < 0) {
    return false;
  } else if (y < 0) {
    return false;
  } else if (x > this.length) {
    return false;
  } else if (y > this.height) {
    return false;
  }
    return true;
}

GameBoard.prototype.place = function(x, y, f) {
  this.checkPlace(x, y);
  const xCoord = Object.keys(this.grid).filter(column => {
    return column == x;
  });

  return `${xCoord},${this.grid[x][y]},${f}`;
}


module.exports = GameBoard;