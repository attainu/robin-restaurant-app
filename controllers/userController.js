const userModel = require('../model/userSch.js');

exports.getAllusers = async (res, req) => {
    res.status(500).json({
        status: 'error',
        message: 'construct me and get all list of users !!'
    });
};

exports.createUser = async (res, req) => {

    try {
        const newItem = await menuModel.create(req.body);

        const savemenu = await newItem.save();
        res.json(savemenu);


    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'construct me and get all list of users !!'
        });
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