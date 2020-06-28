module.exports = fn => {
    return (req, res, next) => {
<<<<<<< HEAD
        fn(req, res, next).catch(err => next(err))
=======
        fn(req, res, next).catch(next);  //id any error happens that will be send to global errorhandler from there
>>>>>>> bc5781afdbe125cdf3f93dfbb4912aff918ee7b1
    };
};