const jwt = require('jsonwebtoken')
const { SECRET, TOKEN_EXPIRES_IN } = require('./../config')
exports.createToken = (data) => {
    return jwt.sign({
        ...data
    }, SECRET, {
        expiresIn: TOKEN_EXPIRES_IN
    })
}

exports.decodeToken = (data) => {
    return jwt.decode(data)
}
