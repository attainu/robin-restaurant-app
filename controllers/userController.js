<<<<<<< HEAD
=======
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
<<<<<<< HEAD

    try {
        const newItem = await menuModel.create(req.body);

        const savemenu = await newItem.save();
        res.json(savemenu);


    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'construct me and get all list of users !!'
        });
=======
    const newUser = await userModel.create(req.body);
    
    try {
        const saveUser = await newUser.save();
        res.json(saveUser);

    } catch (err) {
        res.status(400).json(err)
>>>>>>> 208a896b52cb617dc2fe264b1c1c7b1e425d753d
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
>>>>>>> bc5781afdbe125cdf3f93dfbb4912aff918ee7b1
