const GameBoard = require('./classes/GameBoard');
const Robot = require('./classes/Robot');
const inquirer = require('inquirer');

const axios = require('axios');

// entry point of the app
// feed commands to the classes here and simulate user input
function startGame(width = 5, height = 5) {
  const gameBoard = new GameBoard(width, height);
  // const theGameBoard = gameBoard.createGameBoard();
  return gameBoard;

  const robot = new Robot();

  // Create game environment (loop)
  let initialMove = true;
  inputMove(initialMove, robot, gameBoard);
}

// Recursive function to control game - provide 'EXIT' command, else prompt for next move
function inputMove(isInitialMove, robot, gameBoard) {
  // If first move, call place command
  if (isInitialMove) {
    // inquirer.prompt([
    //   {
    //     type: "input",
    //     ...
    //   }
    // ])
    prompt("input", "coords", "Place the robot on the board")
    .then(inputObj => {
      // Call Game API
      // Send HTTP request containing split string
      axios.post('http://localhost:3000/place', {
        startPos: inputObj.coords.split(',')
      })
        .then(res => {
          

          inputMove(res.isInitialMove, robot, gameBoard);
        })
        .catch(err => {
          console.log(err);
        });
      // Inquirer returns object containing a string. Split into array for place function
      // const startPos = inputObj.coords.split(',');

      // // call robot.place(...startPos) with input - assuming startPos is an array
      // robot.place(...startPos);

      // // Call inputMove again for next move
      // isInitialMove = false;
      // inputMove(isInitialMove, robot, gameBoard);
    })
    .catch(err => {
      console.log(err);
    });

  } else {
    // If subsequent move, listen for TURN or MOVE
    prompt("input", "input", "Next move")
    .then(move => {
      // Abstract these cases out into their own functions - for use with exposed service
      // Send request to endpoint, endpoint calls function using request body data as params
      // Not sure how to preserve existing structure for use with direct console input as well as
      // http requests


      if (move.input === "EXIT") {
        return;
      }
      // move() - should contain checkmove and update robot's state
      if (move.input === "MOVE") {
        robot.move(gameBoard); 
      }
      // turn()
      if (move.input === "LEFT") {
        robot.turn("LEFT");
      }
      if (move.input === "RIGHT") {
        robot.turn("RIGHT");
      }
      // report
      if (move.input === "REPORT") {
        console.log(robot.report());
      }

      inputMove(isInitialMove, robot, gameBoard);
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

module.exports = { startGame, inputMove };