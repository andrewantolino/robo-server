const express = require('express');
const app = express();
const port = process.argv.PORT || 3000;

const Game = require('./game');

// Web server that parses HTTP requests into commands that inquirer can interpret

// Start the game - doesn't listen for HTTP requests, game is initialised by process
Game(5, 5);

// Place the robot
app.get('/place', (req, res) => {
  inputMove
});

app.listen(port, () => {
  console.log(`Robo server listening on port ${port}`);
});

module.exports(app);