// JavaScript source code
const fs = require('fs');
const express = require('express');
const morgan = require('morgan')
const tourRouter = require('./Router/tourrouter')

const app = express();



app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
    };

// Get api from Dev folder
app.use('/api/v1/tours', tourRouter)

module.exports = app;




