const GameBoard = require('./classes/GameBoard');
const Robot = require('./models/Robot');
const inquirer = require('inquirer');

const axios = require('axios');
const ui = new inquirer.ui.BottomBar();

// entry point of the app
init();

function startGame(width = 5, height = 5) {
  const gameBoard = new GameBoard(width, height);

  return gameBoard;
}

function init() {
  const gameBoard = new GameBoard(5, 5);

  const robot = new Robot();

  let initialMove = true;
  inputMove(initialMove, robot, gameBoard);
}

// Recursive function to control game - provide 'EXIT' command, else prompt for next move
function inputMove(isInitialMove, robot, gameBoard) {
  // If first move, call place command
  if (isInitialMove) {
    prompt("input", "coords", "Place the robot on the board")
      .then(async inputObj => {
        isInitialMove = false;

        const coords = getPlaceCoords(inputObj.coords);
        const { x, y, f } = coords;

        // Call Game API
        // Send HTTP request containing split string
        await axios.post('http://localhost:3000/place', {
          x,
          y,
          f
        })
          .then(res => {
            // console.log(res.data.message);
            // ui.log.write("Initial place:\n");
            // ui.log.write(res.data.message);
            inputMove(isInitialMove, robot, gameBoard);
          })
          .catch(err => {
            console.log("PLACE error:", err.data.message);
          });
      })
      .catch(err => {
        console.log(err);
      });

  } else {
    // If subsequent move, listen for TURN or MOVE
    prompt("input", "input", "Next move")
      .then(async move => {
        // console.log("KIND OF INPUT", move)
        if (move.input === "EXIT") {
          return;
        }
        // place() - if user calls place following init
        if (move.input.indexOf("PLACE") != -1) {

          const coords = getPlaceCoords(move.input);
          const { x, y, f } = coords;

          await axios.post("http://localhost:3000/place", {
            x,
            y,
            f
          })
            .then(res => {
              // ui.log.write("Subsequent place:\n");
              // ui.log.write(res.data.message);
              return inputMove(isInitialMove, robot, gameBoard);
            })
            .catch(err => {
              console.log("Subsequent place error:", err);
            });
        }
        // move() - should contain checkmove and update robot's state
        if (move.input === "MOVE") {
          await axios.get("http://localhost:3000/move")
            .then(res => {
            //   // console.log("Message:", res.data.message);
            //   // console.log("Result:", res.data.updatedRobot);
            //   ui.log.write("Move:\n");
            //   ui.log.write(res.data.message);
              return inputMove(isInitialMove, robot, gameBoard);
            })
            .catch(err => {
              console.log("[server.js] /move error:", err);
            });
        }
        // turn()
        if (move.input === "LEFT" || move.input === "RIGHT") {
          await axios.post("http://localhost:3000/turn", {
            direction: move.input
          })
            .then(res => {
            //   // console.log("Message:", res.data.message);
            //   // console.log("Result:", res.data.updatedRobot);
            //   ui.log.write("Turn:\n");
            //   ui.log.write(res.data.message);
              return inputMove(isInitialMove, robot, gameBoard);
            })
            .catch(err => {
              console.log("[server.js] /turn error:", err);
            });
        }
        // report
        if (move.input === "REPORT") {
          await axios.get('http://localhost:3000/report')
            .then(response => {
              // ui.log.write("Message: " + response.data.message);
              ui.log.write(`${response.data.x},${response.data.y},${response.data.f}`);
              return inputMove(isInitialMove, robot, gameBoard);
            })
            .catch(err => {
              console.log("REPORT error:", err.data);
            })
        }

        // return inputMove(isInitialMove, robot, gameBoard);
      })
      .catch(err => {
        console.log("Input error:", err);
      });
  }
}

function prompt(type, name, message) {
  return inquirer.prompt([
    {
      type: type,
      name: name,
      message: message
    }
  ]);
}

function getPlaceCoords(coords) {
  let inputArr = coords.split(' ');
  inputArr = inputArr[1].split(',');
  
  const placeCoords = {
    x: inputArr[0],
    y: inputArr[1],
    f: inputArr[2]  
  }

  return placeCoords;
}

module.exports = { startGame, inputMove };