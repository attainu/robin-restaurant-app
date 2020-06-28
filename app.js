const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');



const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
//+++======================-------====MIDDLEWEARS======--------===================+++//
//  ?? middlewear ,:-fn that modify incoming req data.

//hhtp header security
app.use(helmet())

//bodyparser middle wear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//morgan middlewear
app.use(morgan('dev'));



//    own middlewear for time
app.use((req, res, next) => {
    req.requestTime = new Date().toLocaleString();
    next();
});

//+++=========================-------====ROUTES======--------===================+++//

//(1) menurouter
const menuRout = require('./routes/menu.js');
app.use('/api/v1/menu', menuRout);

//(2)userrouter
const userRout = require('./routes/users');
app.use('/api/v1/users', userRout);

//========

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);



module.exports = app;