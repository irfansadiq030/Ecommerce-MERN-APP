const express = require('express');
const app = express();
const cookieParse = require('cookie-parser')

app.use(express.json())
app.use(cookieParse());

// Route Imports
const product = require('./Routes/productRoute');
const user = require('./Routes/userRoute');
const order = require('./Routes/orderRoute');

app.use('/api/v1', product);
app.use('/api/v1', user);
app.use('/api/v1', order);

module.exports = app