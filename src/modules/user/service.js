const error = require('./error')
const { Logger, factoryLogger } = require('./../../helpers/logger/logger')
const { userMapper } = require('./../../mappers/user')
const { generateHash } = require('./../../helpers/bcrypt/bcrypt')
const { compare } = require('./../../helpers/bcrypt/bcrypt')
const { createToken } = require('./../../helpers/jwt')
const { saveUser, findByKey, updateToken, list } = require('./repository')

const logger = factoryLogger({ dir: __dirname, locale: 'service.js' })

exports.createUserService = async (body) => {
    try {
        body.password = generateHash(body.password)
        const resp = await saveUser(body)

        logger.info({ endpoint: 'user/', method: 'createUserService', request: body, response: resp })
        return resp
    } catch (err) {
        logger.error({ endpoint: 'user/', method: 'createUserService', err: String(err), request: body })
        throw error(err.message)
    }
}
exports.listUserService = async (body) => {
    try {
        const resp = await list(body)

        logger.info({ endpoint: 'user/', method: 'listUserService', request: body, response: resp })
        return resp
    } catch (err) {
        logger.error({ endpoint: 'user/', method: 'listUserService', err: String(err), request: body })
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
        logger.info({ endpoint: 'user/', method: 'listUserService', request: body, response: body })
        return {
            user: resultUser,
            token
        }
    } catch (err) {
        logger.error({ endpoint: 'user/', method: 'signInService', err: String(err), request: body })
        throw error(err.message)
    }
}
