module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);  //id any error happens that will be send to global errorhandler from there
    };
};