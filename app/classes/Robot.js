function Robot() {
  this.positionX;
  this.positionY;
  this.orientation;
  
  this.directionObj = {
    0: 'NORTH',
    1: 'EAST',
    2: 'SOUTH',
    3: 'WEST'
  }
}

Robot.prototype.move = function(gameboard) {
  if (this.orientation == 'NORTH') {
    if ( this.checkMove(this.positionX, this.positionY + 1, gameboard) ) {
      this.positionY++;
    }
  }

  if (this.orientation == 'EAST') {
    if ( this.checkMove(this.positionX + 1, this.positionY, gameboard) ) {
      this.positionX++;
    }

  }

  if (this.orientation == 'SOUTH') {
    if ( this.checkMove(this.positionX, this.positionY - 1, gameboard) ) {
      this.positionY--;
    }
  }

  if (this.orientation == 'WEST') {
    if ( this.checkMove(this.positionX - 1, this.positionY, gameboard) ) {
      this.positionX--;
    }
  }

  return `${this.positionX},${this.positionY},${this.orientation}`;
}

Robot.prototype.checkMove = function(x, y, bounds) {
  if (x < 0) {
    return false;
  } else if (y < 0) {
    return false;
  } else if (x > bounds.length) {
    return false;
  } else if (y > bounds.height) {
    return false;
  }

    return true;
}

Robot.prototype.turn = function(direction) {
  // Rotate robot 90 degrees depending on input
  if (direction == 'LEFT') {
    // Move to the orientation left of current orientation
    // e.g. if current orientation == 'NORTH' and input == 'LEFT', set orientation to 'WEST'
    // if current orientation == 'EAST' and input == 'RIGHT', set orientation to 'SOUTH'
    // etc.
    let newOrientation;

    Object.keys(this.directionObj).forEach(key => {
      if (this.directionObj[key] == this.orientation) {
        // validate key:
        // if key - 1 == -1, no index exists
        key = parseInt(key);

        key = key - 1 == -1 ? 3 : parseInt(key) - 1;
        newOrientation = this.directionObj[key];
      }
    });

    return this.orientation = newOrientation;

  } else if (direction == 'RIGHT') {
    let newOrientation;
    
    Object.keys(this.directionObj).forEach(key => {
      
      if (this.directionObj[key] == this.orientation) {
        // validate key:
        // if key + 1 == 4, no index exists in `directionObj`
        key = parseInt(key);
        key = key + 1 == 4 ? 0 : parseInt(key) + 1;

        newOrientation = this.directionObj[key];
      }
    });

    return this.orientation = newOrientation;
  }
}

Robot.prototype.setPosition = function(x, y, f) {
  this.positionX = x;
  this.positionY = y;
  this.orientation = f;
}

Robot.prototype.report = function() {
  return `${this.positionX},${this.positionY},${this.orientation}`;
}

module.exports = Robot;
