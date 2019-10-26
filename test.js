const assert = require('assert');
const GameBoard = require('./app/classes/GameBoard');
const Pacman = require('./app/classes/Pacman');

it("should create a 2 x 2 grid", () => {
  const gameBoard = new GameBoard(2, 2);

  assert.deepStrictEqual(gameBoard.createGameBoard(), {
    "0": [0, 1],
    "1": [0, 1]
  });
});

it("should check that pacman was placed within the game board", () => {
  const gameBoard = new GameBoard(5, 3);
  gameBoard.createGameBoard();

  const place1 = gameBoard.checkPlace(4, 1);
  assert.equal(place1, true);
  
  const place2 = gameBoard.checkPlace(5, -1);
  assert.equal(place2, false);
  
  const place3 = gameBoard.checkPlace(-5, 1);
  assert.equal(place3, false);

  const place4 = gameBoard.checkPlace(1, 5);
  assert.equal(place4, false);
  
  const place5 = gameBoard.checkPlace(1, 2);
  assert.equal(place5, true);
});

it("should report pacman's position", () => {
  const gameBoard = new GameBoard(4, 4);
  gameBoard.createGameBoard();
  
  const pacman = new Pacman();
  const coords = [2, 3, 'WEST'];
  pacman.setPosition(...coords);

  assert.equal(pacman.report(), '2,3,WEST');
});

it("should move pacman in the direction of his orientation", () => {
  const gameBoard = new GameBoard(4, 4);
  gameBoard.createGameBoard();
  
  const pacman = new Pacman();
  const coords = [2, 3, 'WEST'];
  
  gameBoard.place(...coords);
  pacman.setPosition(...coords);

  let updatedPacman;

  updatedPacman = pacman.move(gameBoard);
  
  assert.equal(updatedPacman, '1,3,WEST');
});

it("should check move is within game board", () => {
  const gameBoard = new GameBoard(4, 4);
  gameBoard.createGameBoard();
  
  const pacman = new Pacman();
  const coords = [4, 3, 'EAST'];
  
  pacman.setPosition(...coords);

  // Simulate user input and check it
  // This will be called within `pacman.move()`
  
  // Assume user input, pacman.move() from 4, 3 facing east
  // Therefore positionX == 5, positionX is an illegal move
  const validMove = pacman.checkMove(5, 3, gameBoard);
  
  assert.equal(validMove, false);

});

it("should change pacman's direction", () => {
  const gameBoard = new GameBoard(4, 4);
  gameBoard.createGameBoard();
  
  const pacman = new Pacman();
  var coords = [4, 3, 'EAST'];
  
  pacman.setPosition(...coords);
  pacman.turn("LEFT");

  assert.equal(pacman.report(), '4,3,NORTH');

  coords = [2, 2, 'SOUTH'];

  pacman.setPosition(...coords);
  pacman.turn("RIGHT");

  assert.equal(pacman.report(), '2,2,WEST')
});