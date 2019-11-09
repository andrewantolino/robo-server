const express = require('express');
const app = express();
const port = process.argv.PORT || 3000;
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./database');

const Game = require('./game');
const Robot = require('./models/Robot');

// Game API
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to database
db.connect();

let isFirstTurn = true;
var gameBoard;
var robot;
const gameId = Math.ceil(Math.random() * 10000);
console.log("GAME ID:", gameId);

// Place the robot
app.post('/place', async (req, res) => {
  const data = req.body;

  if (isFirstTurn) {
    gameBoard = Game.startGame(5, 5);
    isFirstTurn = false;
  }
  
  if ( Robot.checkMove(data.x, data.y, gameBoard) && Robot.checkPlace(data.orientation) ) {
    robot = new Robot();

    robot.place(data.x, data.y, data.orientation, gameId)
    .then(result => {
      console.log('THE RES', result);
    })
    .catch(err => {
      console.log("Err:", err);
    })

  } else {
    return res.status(200).json({
      message: "Illegal move, try again"
    });
  }

  res.status(200).json({
    message: "Got data and updated robot",
    data: data,
    updatedRobot: robot
  });
});

app.listen(port, () => {
  console.log(`Robo server listening on port ${port}`);
  
  // Start the game - doesn't listen for HTTP requests, game is initialised by process
  // Game(5, 5);
});



module.exports = app;