const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  connectTimeoutMS: 10000
};

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
const url = 'mongodb://robo:robopassword@127.0.0.1:27017/robo?authSource=admin'
console.log('theurl', url);
console.log('username', process.env.MONGO_USERNAME);
// console.log(process.env.DATABASE_URL);

// function connect() {
mongoose.connect(url, options).then(() => {
  console.log('MongoDB is connected');
})
.catch(err => {
  console.log('MongoDB connection error:', err);
});
// }

// module.exports = { connect }
mongoose.set('debug', true);

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("Database connected");
// });
