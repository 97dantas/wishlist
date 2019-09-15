
const HttpStatus = require('http-status-codes')

const { mapperError } = require('../../mappers/error')
const moduleError = {
    E11000: {
        status: HttpStatus.CONFLICT,
        message: 'Cliente já cadastrado com esse email'
    }
}
module.exports = (error) => {
    return mapperError(moduleError[error])
}
