const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();
//+++======================-------====MIDDLEWEARS======--------===================+++//
//  ?? middlewear ,:-fn that modify incoming req data.

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
app.use('/api/v1/', menuRout);

//(2)userrouter
const userRout = require('./routes/users.js');
app.use('api/v1/users', userRout);


// app.use('/api/v1/', menuRout);
// app.use('/api/v1/users', userRout);

//+++=======================error handling for ==--unhandled or not defined routes-===================+++//
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);



module.exports = app;