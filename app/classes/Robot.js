class Robot {
  constructor() {
    this.positionX;
    this.positionY;
    this.orientation;
    
    this.dirObj = {
      0: 'NORTH',
      1: 'EAST',
      2: 'SOUTH',
      3: 'WEST'
    };
  }

  // Set initial orientation when placed on the board
  turn(direction) {
    // Rotate robot 90 degrees depending on input
    if (direction == 'LEFT') {
      // Move to the orientation left of current orientation
      // e.g. if current orientation == 'N' and input == 'LEFT', set orientation to 'W'
      // if current orientation == 'E' and input == 'RIGHT', set orientation to 'S'
      // etc.
      let newOrientation;
      
      Object.keys(this.dirObj).forEach(key => {
        if (this.dirObj[key] == this.orientation) {
          // validate key:
          // if key - 1 == -1, no index exists
          key = key - 1 == -1 ? 0 : parseInt(key) - 1;
          newOrientation = this.dirObj[key];
        }
      });

      return this.orientation = newOrientation;

    } else if (direction == 'RIGHT') {
      let newOrientation;
      
      Object.keys(this.dirObj).forEach(key => {
        
        if (this.dirObj[key] == this.orientation) {
          // validate key:
          // if key + 1 == 4, no index exists in `dirObj`
          key = key + 1 == 4 ? 0 : parseInt(key) + 1;

          newOrientation = this.dirObj[key];
        }
      });

      return this.orientation = newOrientation;
    }
  }

  setPosition(x, y, f) {
    this.positionX = x;
    this.positionY = y;
    this.orientation = f;
  }

  checkMove(x, y, gameboard) {
    if (x < 0) {
      return false;
    } else if (y < 0) {
      return false;
    } else if (x > gameboard.length) {
      return false;
    } else if (y > gameboard.height) {
      return false;
    }

      return true;
  }
  
  // Move by one in the direction of `this.orientation`
  move(gameboard) {
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

  // Print current position and orientation
  report() {
    return `${this.positionX},${this.positionY},${this.orientation}`;
  }
}

module.exports = Robot;