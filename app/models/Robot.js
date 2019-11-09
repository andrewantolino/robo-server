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
    useFindAndModify: false,
    upsert: true,
    new: true
  })
  .exec();
}

robotSchema.methods.move = function() {

}

robotSchema.statics.checkMove = function(x, y, bounds) {
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
  console.log("ori", orientation)

  for (dir of orientationArr) {
    if (dir === orientation) {
      return true;
    }
  }
}

robotSchema.methods.turn = function(direction) {

}

robotSchema.methods.report = function() {

}

const Robot = mongoose.model('Robot', robotSchema);

module.exports = Robot;