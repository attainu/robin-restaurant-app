require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken')

const app = express();

//jwt middleware
app.use(express.json())

//bodyparser middle wear
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//+++======================-------====MIDDLEWEARS======--------===================+++//
//  ?? middlewear ,:-fn that modify incoming req data.

let refreshTokens = []

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name : user.name})
        res.json ({accessToken:accessToken})
    })
})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token != req.body.token)
    res.sendStatus(204)
})

app.post ('/login', (req,res) =>{
    //authenticate user
    const username = req.body.username
    const user = { name: username}

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({accessToken: accessToken, refreshToken: refreshToken})
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : '60s'})
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