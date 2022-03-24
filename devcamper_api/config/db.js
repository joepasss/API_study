const mongoose = require('mongoose');

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`DB Connected: ${conn.connection.host}`.cyan.underline);
};

module.exports = connectDB;
