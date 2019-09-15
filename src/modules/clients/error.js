
const HttpStatus = require('http-status-codes')

const { mapperError } = require('../../mappers/error')
const moduleError = {
    'user-already-exists': {
        status: HttpStatus.CONFLICT,
        message: 'E-mail já existente.'
    }
}
module.exports = (error) => {
    return mapperError(moduleError[error])
}
