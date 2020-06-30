class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
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
            const sortBy = this.queryString.sort.split(',').join(' ');  //to sort using more than one paramenter
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('price') // by defult
        }


        return this;
    }
    limitingFields() {
        // 3A) feild limiting
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
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

};
module.exports = APIFeatures;
