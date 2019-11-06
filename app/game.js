const GameBoard = require('./classes/GameBoard');
const Robot = require('./classes/Robot');
const inquirer = require('inquirer');

// entry point of the app
// feed commands to the classes here and simulate user input
function startGame(width = 5, height = 5) {
  const gameBoard = new GameBoard(width, height);
  gameBoard.createGameBoard();

  const robot = new Robot();
  let inProgress = false;

  // Create game environment (loop)
  let initialMove = true;
  inputMove(initialMove, robot, gameBoard);
}

// Recursive function to control game - provide 'EXIT' command, else prompt for next move
function inputMove(isInitialMove, robot, gameBoard) {
  // If first move, call place command
  if (isInitialMove) {
    inquirer.prompt([
      {
        type: "input",
        name: "coords",
        message: "Place the robot on the board"
      }
    ])
    .then(inputObj => {
      // Inquirer returns object containing a string. Split into array for setPosition function
      const startPos = inputObj.coords.split(',');

      // call robot.setPosition(...startPos) with input - assuming startPos is an array
      robot.setPosition(...startPos);

      // Call inputMove again for next move
      isInitialMove = false;
      inputMove(isInitialMove, robot, gameBoard);
    })
    .catch(err => {
      console.log(err);
    });

  } else {
    // If subsequent move, listen for TURN or MOVE
    inquirer.prompt([
      {
        type: "input",
        name: "input",
        message: "Next move"
      }
    ])
    .then(move => {
      if (move.input === "EXIT") {
        return;
      }
      if (move.input === "MOVE") {
        robot.move(gameBoard); 
      }
      if (move.input === "LEFT") {
        robot.turn("LEFT");
      }
      if (move.input === "RIGHT") {
        robot.turn("RIGHT");
      }
      if (move.input === "REPORT") {
        console.log(robot.report());
      }

      inputMove(isInitialMove, robot, gameBoard);
    });
  }
}

startGame();

module.exports = startGame;