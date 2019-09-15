const error = require('./error')
const { Logger } = require('./../../helpers/logger/logger')
const { userMapper } = require('./../../mappers/user')
const { generateHash } = require('./../../helpers/bcrypt/bcrypt')
const { compare } = require('./../../helpers/bcrypt/bcrypt')
const { createToken } = require('./../../helpers/jwt')
const { saveUser, findByKey, updateToken, list } = require('./repository')

exports.createUserService = async (body) => {
    try {
        body.password = generateHash(body.password)
        const resp = await saveUser(body)
        Logger.info(JSON.stringify({
            type: 'info',
            endpoint: '/create',
            method: 'createUser',
            success: true,
            request: body,
            response: body,
            locale: 'service.js'
        }))
        return resp
    } catch (err) {
        Logger.error(JSON.stringify({
            type: 'error',
            endpoint: '/create',
            method: 'createUser',
            success: false,
            err: String(err),
            request: body,
            locale: 'service.js'
        }))
        throw error(err.message)
    }
}
exports.listUserService = async (body) => {
    try {
        const resp = await list(body)
        Logger.info(JSON.stringify({
            type: 'info',
            endpoint: '/create',
            method: 'createUser',
            success: true,
            request: body,
            response: resp,
            locale: 'service.js'
        }))
        return resp
    } catch (err) {
        Logger.error(JSON.stringify({
            type: 'error',
            endpoint: '/create',
            method: 'createUser',
            success: false,
            err: String(err),
            request: body,
            locale: 'service.js'
        }))
        throw error(err.message)
    }
}
exports.signInService = async (body) => {
    try {
        const user = await findByKey(body.key)

        if (!user) throw new Error('notFound')

        if (!compare(user.password, body.password)) throw new Error('passwordInvalid')

        const resultUser = userMapper(user)
        const token = await createToken(resultUser)

        updateToken({ _id: user._id }, token)

        return {
            user: resultUser,
            token
        }
    } catch (err) {
        throw error(err.message)
    }
}
