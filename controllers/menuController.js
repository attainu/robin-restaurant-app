<<<<<<< HEAD
=======
const menuModel = require('../model/menuSch');
const { Query } = require('mongoose');
const { } = require('../app');

const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError.js');

//middlewear for best seller ---alias---

exports.bestseller = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-rating,price';
    req.query.fields = 'name,rating,price,';
    next();
};

exports.getAllmenu = catchAsync(async (req, res, next) => {
    //**EXCECUTE QUERY**//
    const features = new APIFeatures(menuModel.find(), req.query)
        .filter()
        .sort()
        .limitingFields()
        .paginate();
    const allmenu = await features.query;

    res.status(200).json({
        status: 'success',
        categories: 'drinks, south indian, non-veg, sweets and deserts, snacks',
        requested_At: req.requestTime,
        data: {
            results: allmenu.length,
            allmenu

        }
    });

});


exports.postNewIem = catchAsync(async (req, res, next) => {
    const newItem = await menuModel.create(req.body);

    const savemenu = await newItem.save();
    res.json(savemenu);
});


exports.getOneItem = catchAsync(async (req, res, next) => {
    const menubyid = await menuModel.findById(req.params.id);

    if (!menuModel) {
        return next(new AppError('no item found with that id', 404));
    }
    res.status(201).json({
        status: 'success',
        data: menubyid
    });
});


exports.deleteItem = catchAsync(async (req, res, next) => {

    const item = await menuModel.findByIdAndDelete(req.params.id);

    if (!menuModel) {
        return next(new AppError('no item found with that id', 404));
    };
    res.status(201).json({
        data: null,
        status: 'succesfully deleted item '

    })
});




exports.updateItem = catchAsync(async (req, res, next) => {
    const menuToUpdate = await menuModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true //to make sure validators(eg :required=true) of schema run
    })

    res.status(200).json({
        status: 'sucess',
        data: menuToUpdate
    });
});

//aggregation --pipeline

exports.MenuStats = catchAsync(async (req, res, next) => {

    const stats = await menuModel.aggregate([

        {
            $group: {
                _id: '$category',     //null for allmenu--you can change it;eg ratings
                TotalItems: { $sum: 1 },
                avgRating: { $avg: '$rating' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' }
            }
        },
    ]);
    res.status(200).json({
        status: 'success',
        data: stats
    });
});
>>>>>>> bc5781afdbe125cdf3f93dfbb4912aff918ee7b1
