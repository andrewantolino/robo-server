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
app.post('/place', (req, res) => {
  const data = req.body;

  if (isFirstTurn) {
    gameBoard = Game.startGame(5, 5);
    isFirstTurn = false;
  }
  
  if ( Robot.checkMove(data.x, data.y, gameBoard) && Robot.checkPlace(data.orientation) ) {
    const robot = new Robot();

    robot.place(data.x, data.y, data.orientation, gameId)
      .then(robot => {
        console.log("Placed robot:", robot);
        res.status(200).json({
          message: "Placed robot successfully",
          updatedRobot: robot
        });
      })
      .catch(err => {
        console.log("[server.js] Placing error:", err);
      });

  } else {
    res.status(200).json({
      message: "Robot out of bounds, try again"
    });
  }
});

app.get('/move', (req, res) => {
  Robot.findOne({gameId: gameId}, (err, robot) => {
    if (err) console.log('Error finding document:', err)

    robot.move(gameBoard)
      .then(robot => {
        console.log("Moved robot:", robot);
        res.status(200).json({
          message: "Moved robot",
          updatedRobot: robot
        });
      })
      .catch(err => {
        console.log("Move err:", err);
        res.status(200).json({
          message: "Robot out of bounds, try again"
        });
      });
  });
});

app.post('/turn', (req, res) => {
  const data = req.body;

  Robot.findOne({gameId: gameId}, async (err, robot) => {
    if (err) console.log('Error finding document:', err)
    const updatedRobot = await robot.turn(data.direction)
      .then(robot => {
        console.log("5. Turned robot:", robot);
        return robot;
      })
      .catch(err => {
        console.log("Turn err:", err);
        return res.status(200).json({
          message: "Invalid turn parameter. Try again"
        });
      });

      res.status(200).json({
        message: "Turned robot",
        updatedRobot: updatedRobot
      });
  });
  console.log('===========================')
});

app.get('/report', (req, res) => {
  Robot.findOne({gameId: gameId}, async (err, robot) => {
    if (err) console.log('Error finding document:', err)
    res.status(200).json({
      message: "Current location",
      x: robot.positionX,
      y: robot.positionY,
      f: robot.orientation
    });
  })
});

app.listen(port, () => {
  console.log(`Robo server listening on port ${port}`);
  
  // Start the game - doesn't listen for HTTP requests, game is initialised by process
  // Game(5, 5);
});



module.exports = app;