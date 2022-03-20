const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

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

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
