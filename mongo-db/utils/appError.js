<<<<<<< HEAD
class AppError extends Error {
=======
class AppError extends Error {   //clas inheritance
>>>>>>> bc5781afdbe125cdf3f93dfbb4912aff918ee7b1
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
<<<<<<< HEAD

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
=======
        Error.captureStackTrace(this, this.constructor);

    }
}
module.exports = AppError;
>>>>>>> bc5781afdbe125cdf3f93dfbb4912aff918ee7b1
