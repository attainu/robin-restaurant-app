const menuModel = require('../model/menuSch');
const { Query } = require('mongoose');
// const {} = require('../app');


//middlewear for best seller ---alias

exports.bestseller = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-rating,price';
    req.query.fields = 'name,rating,price,';
    next();
}
//=========
class APIFeatures {
    constructor(query, queryString) {
        this.query = Query;
        this.queryString = queryString;
    }

    filter() {
        // 1A) FILTERING ['=']
        const queryObj = { ...this.queryString };
        const excludeFields = ['sort', 'limit', 'page', 'fields']; //we will add these features in our api
        excludeFields.forEach(el => delete queryObj[el]);

        // 1B) ADVANCE FILTERING -- ['<','<=','>','>=']
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query.find(JSON.parse(queryStr));
        return this;

        //let query = menuModel.find(JSON.parse(queryStr));


    }
    sort() {
        // 2A)SORTING
        if (this.queryString.sort) {
            const sortBy = req.query.sort.split(',').join(' ');  //to sort using more than one paramenter
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('price') // by defult
        }

        return this;
    }
    limitingFields() {
        // 3A) feild limiting
        if (this.queryString.fields) {
            const fields = this.query.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v'); //by default....//- means exclude.
        }

        return this;
    }
    paginate() {
        const page = this.queryString.page * 1 || 1;  //default page 1
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

}

exports.getAllmenu = async (req, res) => {
    try {

        //**BUILDING QUERY**//
        // // 1A) FILTERING ['=']
        // const queryObj = { ...req.query };
        // const excludeFields = ['sort', 'limit', 'page', 'fields']; //we will add these features in our api
        // excludeFields.forEach(el => delete queryObj[el]);

        // // 1B) ADVANCE FILTERING -- ['<','<=','>','>=']
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        // let query = menuModel.find(JSON.parse(queryStr));

        // // 2A)SORTING
        // if (req.query.sort) {
        //     const sortBy = req.query.sort.split(',').join(' ');  //to sort using more than one paramenter
        //     query = query.sort(sortBy);
        // } else {
        //     query = query.sort('price') // by defult
        // }


        // // 3A) feild limiting
        // if (req.query.fields) {
        //     const fields = req.query.fields.split(',').join(' ');
        //     query = query.select(fields);
        // } else {
        //     query = query.select('-__v'); //by default....//- means exclude.
        // }


        // // 4A) PAGINATION---incomp
        // const page = req.query.page * 1 || 1;  //default page 1
        // const limit = req.query.limiy * 1 || 100;
        // query = query.skip(10).limit(5);


        //**EXCECUTE QUERY**//
        const features = new APIFeatures(menuModel.find(), req.query)
            .filter()
            .sort()
            .limitingFields()
            .paginate();
        const allmenu = await features.query;



        //const allmenu = await menuModel.find(req.query);
        //const allmenu = await menuModel.find({});


        res.status(200).json({
            status: 'success',
            categories: 'drinks, south indian, non-veg, sweets and deserts, snacks',
            requested_At: req.requestTime,
            data: {
                results: allmenu.length,
                allmenu

            }
        });
    } catch (err) {
        res.status(404).json({ message: err });
    }
};


exports.postNewIem = async (req, res) => {
    const newItem = await menuModel.create(req.body);

    //var newItem = new menuModel({
    // name: req.body.name,
    // category: req.body.category,
    // price: req.body.price,
    // rating: req.body.rating
    //});
    try {
        const savemenu = await newItem.save();
        res.json(savemenu);

    } catch (err) {
        res.status(400).json(err)
    }
};


exports.itemById = async (req, res) => {

    try {
        const menubyid = await menuModel.findById(req.params.id);
        res.status(201).json(menubyid);

    } catch (err) {
        res.status(400).json(err)
    }
};


exports.deleteItem = async (req, res) => {
    try {
        await menuModel.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: 'succesfully deleted item ',
        });

    } catch (err) {
        res.status(400).json(err)
    }
};




exports.updateItem = async (req, res) => {
    try {
        const menuToUpdate = await menuModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true //to make sure validators(eg :required=true) of schema run
        })

        res.status(200).json({
            status: 'sucess',
            data: menuToUpdate
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }

};
