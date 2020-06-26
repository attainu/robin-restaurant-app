const userModel = require('../model/userSch.js');

exports.getAllusers = function (res, req) {
    // res.status(500).json({
    //     status: 'error',
    //     message: 'construct me and get all list of users !!'
    // });
    userModel.find(function(err, data){
        if(err) { res.status(500).send(err) }
        res.send(data)
    });
    
}

exports.createUser = async (res, req) => {
    const newUser = await userModel.create(req.body);
    
    try {
        const saveUser = await newUser.save();
        res.json(saveUser);

    } catch (err) {
        res.status(400).json(err)
    }
};

exports.getUser = async (res, req) => {
    res.status(500).json({
        status: 'error',
        message: 'construct me and get all list of users !!'
    });
};

exports.updateUser = async (res, req) => {
    res.status(500).json({
        status: 'error',
        message: 'construct me and get all list of users !!'
    });
};

exports.deleteUser = async (res, req) => {
    res.status(500).json({
        status: 'error',
        message: 'construct me and get all list of users !!'
    });
};