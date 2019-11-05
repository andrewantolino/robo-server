const GameBoard = require('./classes/GameBoard');
const Robot = require('./classes/Robot');
const inquirer = require('inquirer');

// const InputController = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout,
  
// })

// const InputController = inquirer.prompt

// entry point of the app
// feed commands to the classes here and simulate user input
const gameBoard = new GameBoard(5, 5);

gameBoard.createGameBoard();

const robot = new Robot();

// Create game environment (loop)
let inProgress = false;
let initialMove = true;

const ui = new inquirer.ui.BottomBar();
// Recursive function to control game - provide 'EXIT' command, else prompt for next move
function inputMove() {
  // If first move, call place command
  if (initialMove) {
    inquirer.prompt([
      {
        type: "input",
        name: "coords",
        message: "Place the robot on the board"
      }
    ])
    .then(inputObj => {
      // ui.log.write('startPos', startPos);
      console.log("startPos", inputObj);
      // Inquirer returns object containing a string. Split into array for setPosition function
      const startPos = inputObj.coords.split(',');
      console.log(startPos);
      robot.setPosition(...startPos);
      // call robot.setPosition(...startPos) with input - assuming startPos is an array
      // Call inputMove again for next move
      inputMove();
    })
    .catch(err => {
      ui.log.write("Input error: ", err);
      console.log(err);
    });

    initialMove = false;
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
        // robot.report();
      }
      inputMove();
      // if move == 'MOVE', do move logic
      // if move == 'LEFT' or 'RIGHT', do turn logic
      // if move == 'EXIT', don't call inputMove() again
    })
  }
}

// inquirer.prompt([
//   {
//     type: 'input',
//     name: 'Place',
//     message: 'Place the robot on the board'
//   },
//   {
//     type: 'input',
//     name: 'Move',
//     message: 'Next move'
//   }
// ])
// .then(answers => {
//   console.log(answers);
// });

inputMove();

// get values 1, 1 and 'E' from user input somehow?

// a)
// input:
// PLACE 0,0,NORTH
// const input = [0, 0, "NORTH"];

// gameBoard.place(...input);
// robot.setPosition(...input);

// robot.move(gameBoard);

// console.log(robot.report()); // 0,1,NORTH


// b)
// input: 
// PLACE 0,0,NORTH
// LEFT
// REPORT
// const input2 = [0, 0, "NORTH"];

// gameBoard.place(...input2);
// robot.setPosition(...input2);

// robot.turn("LEFT");

// console.log(robot.report()); // 0,0,WEST

// c)
// input:
// PLACE 1,2,EAST
// MOVE
// MOVE
// LEFT
// MOVE
// REPORT

// const input3 = [1, 2, "EAST"];

// gameBoard.place(...input3);
// robot.setPosition(...input3);

// robot.move(gameBoard);
// robot.move(gameBoard);
// robot.turn("LEFT");
// robot.move(gameBoard);

// console.log(robot.report()); // 3,3,NORTH

// // d) move robot off the grid

// const input4 = [1, 1, "SOUTH"];

// gameBoard.place(...input4);
// robot.setPosition(...input4);

// robot.move(gameBoard);
// robot.move(gameBoard);
// robot.move(gameBoard);

// console.log(robot.report());