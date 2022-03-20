const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const { sequelize } = require('./models');

dotenv.config({ path: './config/config.env' });

// Connect db
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('MYSQL DATABASE connect success'.cyan.underline.bold);
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`.red);
    server.close(() => process.exit(1));
  });

// Route file
const bootcamps = require('./routes/bootcamps');

// middleware
const morgan = require('morgan');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // logging middleware
}

// mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandle promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);

  // Close server & exit process
  server.close(() => process.exit(1));
});
