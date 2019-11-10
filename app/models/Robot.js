const mongoose = require('mongoose');

const robotSchema = new mongoose.Schema({
  gameId: Number,
  name: String,
  positionX: Number,
  positionY: Number,
  orientation: String
});

robotSchema.methods.place = function(x, y, f, gameId) {

  this.positionX = x;
  this.positionY = y;
  this.orientation = f;

  return this.model('Robot').findOneAndUpdate({ gameId: gameId }, {
    gameId: gameId,
    name: "Robot",
    positionX: x,
    positionY: y,
    orientation: f
  }, {
    upsert: true,
    new: true
  })
  .exec();
}

robotSchema.methods.move = async function(gameBoard) {

  const robot = await this.model('Robot').findOne({ gameId: this.gameId }, (err, res) => {
    if (err) {
      console.log('Move error:', err)
    }
    if (this.orientation == 'NORTH') {
      if ( checkMove(this.positionX, this.positionY + 1, gameBoard) ) {
        this.positionY++;
      }
    }
  
    if (this.orientation == 'EAST') {
      if ( checkMove(this.positionX + 1, this.positionY, gameBoard) ) {
        this.positionX++;
      }
  
    }
  
    if (this.orientation == 'SOUTH') {
      if ( checkMove(this.positionX, this.positionY - 1, gameBoard) ) {
        this.positionY--;
      }
    }
  
    if (this.orientation == 'WEST') {
      if ( checkMove(this.positionX - 1, this.positionY, gameBoard) ) {
        this.positionX--;
      }
    }
  },{
    upsert: true,
    // new: true
  });

  robot.positionX = this.positionX;
  robot.positionY = this.positionY;

  robot.save();

  return robot;
}

robotSchema.statics.checkMove = checkMove;

function checkMove(x, y, bounds) {
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

robotSchema.statics.checkPlace = function(orientation) {
  const orientationArr = [
    "NORTH",
    "EAST",
    "SOUTH",
    "WEST"
  ];

  for (dir of orientationArr) {
    if (dir === orientation) {
      return true;
    }
  }
}

robotSchema.methods.turn = async function(direction) {
  const directionObj = [
    'NORTH',
    'EAST',
    'SOUTH',
    'WEST'
  ];


  let newOrientation;
  // console.log('type',typeof q);
  // console.log(q instanceof Promise);
  // console.log(q.exec() instanceof Promise);
  // const robot = await this.model('Robot').findOne({ gameId: this.gameId }, async (err, res) => {
  const updatedRobot = this.model('Robot').findOne({ gameId: this.gameId }).exec()
    .then(async res => {

      const orientationIndex = directionObj.indexOf(res.orientation);

      // Rotate robot 90 degrees depending on input
      if (direction == 'LEFT') {
        // Move to the orientation left of current orientation
        // e.g. if current orientation == 'NORTH' and input == 'LEFT', set orientation to 'WEST'
        // if current orientation == 'EAST' and input == 'RIGHT', set orientation to 'SOUTH'
        // etc.

        /**
         * 
         * @param {String} direction 
         * @returns {String}
         * 
         */
        /* function turn(direction) {
            switch(direction):
              case "LEFT":
                Object.keys(directionObj).forEach(key => {

                })
        } */

        if (orientationIndex != -1) {
          let key = orientationIndex;
          key = key - 1 == -1 ? 3 : parseInt(key) - 1;

          newOrientation = directionObj[key];
          res.orientation = newOrientation;

          const updatedRobot = await res.save();

          return updatedRobot;
        }
      } else if (direction == 'RIGHT') {

        if (orientationIndex != -1) {
          let key = orientationIndex;
          key = key + 1 == 4 ? 0 : parseInt(key) + 1;
          
          newOrientation = directionObj[key];
          res.orientation = newOrientation;
          
          const updatedRobot = await res.save();
          
          return updatedRobot;
        }
      }
    })
    .catch(err => {
      console.log('Orientation update error:', err)
    });

  return Promise.resolve(updatedRobot);
}

robotSchema.methods.report = function() {

}

const Robot = mongoose.model('Robot', robotSchema);

module.exports = Robot;