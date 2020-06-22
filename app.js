const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

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



//+++=========================-------====CONNECT-----DATA----BASE======--------===================+++//
mongoose.connect('mongodb://127.0.0.1:27017/restaurant', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('Restaurant data base is connected ');
    });



module.exports = app;