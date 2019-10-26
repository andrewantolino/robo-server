const GameBoard = require('./classes/GameBoard');
const Pacman = require('./classes/Pacman');

// entry point of the app
// feed commands to the classes here and simulate user input
const gameBoard = new GameBoard(4, 4);

gameBoard.createGameBoard();

const pacman = new Pacman();

// get values 1, 1 and 'E' from user input somehow?

// a)
// input:
// PLACE 0,0,NORTH
const input = [0, 0, "NORTH"];

gameBoard.place(...input);
pacman.setPosition(...input);

pacman.move(gameBoard);

console.log(pacman.report()); // 0,1,NORTH


// b)
// input: 
// PLACE 0,0,NORTH
// LEFT
// REPORT
const input2 = [0, 0, "NORTH"];

gameBoard.place(...input2);
pacman.setPosition(...input2);

pacman.turn("LEFT");

console.log(pacman.report()); // 0,0,WEST


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
pacman.setPosition(...input3);

pacman.move(gameBoard);
pacman.move(gameBoard);
pacman.turn("LEFT");
pacman.move(gameBoard);

console.log(pacman.report()); // 3,3,NORTH

// d) move pacman off the grid

const input4 = [1, 1, "SOUTH"];

gameBoard.place(...input4);
pacman.setPosition(...input4);

pacman.move(gameBoard);
pacman.move(gameBoard);
pacman.move(gameBoard);

console.log(pacman.report());