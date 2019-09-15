
const HttpStatus = require('http-status-codes')

const { mapperError } = require('../../mappers/error')
const moduleError = {
    'user-already-exists': {
        status: HttpStatus.CONFLICT,
        message: 'E-mail já existente.'
    },
    passwordInvalid: {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Password ou key invalido'
    },
    notFound: {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Password ou key invalido'
    }
}
module.exports = (error) => {
    return mapperError(moduleError[error])
}
