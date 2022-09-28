const createError = require('http-errors');

const notFound = (req, res, next) => {
    next(createError.notFound('Page does not exist'));
}

module.exports = notFound