const constants = require('constants')
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode ? statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: 'validation failed',
                message: err.message,
                stack: err.stack
            })
            break;
        case constants.NOT_FOUND:
            res.json({
                title: 'Not found',
                message: err.message,
                stack: err.stack
            })
        case constants.UNAUTHORIZED:
            res.json({
                title: 'unauthorized',
                message: err.message,
                stack: err.stack
            })
        case constants.FORBIDDEN:
            res.json({
                title: 'Forbidden',
                message: err.message,
                stack: err.stack
            })
        case constants.SERVER_ERROR:
            res.json({
                title: 'server error',
                message: err.message,
                stack: err.stack
            })
            break;
        default:
            console.log("No error, all good!");
            break;
    };

};

module.exports = errorHandler;