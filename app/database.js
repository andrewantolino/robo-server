const mongoose = require('mongoose');

function connect() {
  mongoose.connect('mongodb://localhost/robo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  mongoose.set('debug', true);
  
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log("Database connected");
  });
}

module.exports = { connect }