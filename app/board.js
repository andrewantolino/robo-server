const GameBoard = require('./classes/GameBoard');
const Robot = require('./classes/Robot');

// entry point of the app
// feed commands to the classes here and simulate user input
const gameBoard = new GameBoard(4, 4);

gameBoard.createGameBoard();

const robot = new Robot();

// get values 1, 1 and 'E' from user input somehow?

// a)
// input:
// PLACE 0,0,NORTH
const input = [0, 0, "NORTH"];

gameBoard.place(...input);
robot.setPosition(...input);

robot.move(gameBoard);

console.log(robot.report()); // 0,1,NORTH


// b)
// input: 
// PLACE 0,0,NORTH
// LEFT
// REPORT
const input2 = [0, 0, "NORTH"];

gameBoard.place(...input2);
robot.setPosition(...input2);

robot.turn("LEFT");

console.log(robot.report()); // 0,0,WEST


// c)
// input:
// PLACE 1,2,EAST
// MOVE
// MOVE
// LEFT
// MOVE
// REPORT

const input3 = [1, 2, "EAST"];

gameBoard.place(...input3);
robot.setPosition(...input3);

robot.move(gameBoard);
robot.move(gameBoard);
robot.turn("LEFT");
robot.move(gameBoard);

console.log(robot.report()); // 3,3,NORTH

// d) move robot off the grid

const input4 = [1, 1, "SOUTH"];

gameBoard.place(...input4);
robot.setPosition(...input4);

robot.move(gameBoard);
robot.move(gameBoard);
robot.move(gameBoard);

console.log(robot.report());