const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected to MongoDB Atlas')
    return mongoose.connection;
  } catch (err) {
    console.log('Failed to connect to MongoDB Atlas', err);
  }
}

module.exports = { connectDb };