const assert = require('assert');
const GameBoard = require('./app/classes/GameBoard');
const Robot = require('./app/classes/Robot');

it("should create a 2 x 2 grid", () => {
  const gameBoard = new GameBoard(2, 2);

  assert.deepStrictEqual(gameBoard.createGameBoard(), {
    "0": [0, 1],
    "1": [0, 1]
  });
});

it("should check that robot was placed within the game board", () => {
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

it("should report robot's position", () => {
  const gameBoard = new GameBoard(4, 4);
  gameBoard.createGameBoard();
  
  const robot = new Robot();
  const coords = [2, 3, 'WEST'];
  robot.setPosition(...coords);

  assert.equal(robot.report(), '2,3,WEST');
});

it("should move robot in the direction of his orientation", () => {
  const gameBoard = new GameBoard(4, 4);
  gameBoard.createGameBoard();
  
  const robot = new Robot();
  const coords = [2, 3, 'WEST'];
  
  gameBoard.place(...coords);
  robot.setPosition(...coords);

  let updatedRobot;

  updatedRobot = robot.move(gameBoard);
  
  assert.equal(updatedRobot, '1,3,WEST');
});

it("should check move is within game board", () => {
  const gameBoard = new GameBoard(4, 4);
  gameBoard.createGameBoard();
  
  const robot = new Robot();
  const coords = [4, 3, 'EAST'];
  
  robot.setPosition(...coords);

  // Simulate user input and check it
  // This will be called within `robot.move()`
  
  // Assume user input, robot.move() from 4, 3 facing east
  // Therefore positionX == 5, positionX is an illegal move
  const validMove = robot.checkMove(5, 3, gameBoard);
  
  assert.equal(validMove, false);

});

it("should change robot's direction", () => {
  const gameBoard = new GameBoard(4, 4);
  gameBoard.createGameBoard();
  
  const robot = new Robot();
  var coords = [4, 3, 'EAST'];
  
  robot.setPosition(...coords);
  robot.turn("LEFT");

  assert.equal(robot.report(), '4,3,NORTH');

  coords = [2, 2, 'SOUTH'];

  robot.setPosition(...coords);
  robot.turn("RIGHT");

  assert.equal(robot.report(), '2,2,WEST')
});