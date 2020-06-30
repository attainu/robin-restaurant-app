require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken')

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

//jwt middleware
app.use(express.json())

//bodyparser middle wear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//+++======================-------====MIDDLEWEARS======--------===================+++//
//  ?? middlewear ,:-fn that modify incoming req data.

const posts = [
    {
        username: 'admin',
        title: 'post1'
    },
    {
        username : 'customer',
        title: 'post2'
    }
]

app.get ('/posts', authenticateToken, (req,res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token==null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}



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