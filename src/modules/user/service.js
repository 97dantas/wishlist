const error = require('./error')
const { factoryLogger } = require('./../../helpers/logger/logger')
const { userMapper } = require('./../../mappers/user')
const { generateHash } = require('./../../helpers/bcrypt/bcrypt')
const { compare } = require('./../../helpers/bcrypt/bcrypt')
const { createToken } = require('./../../helpers/jwt')
const { saveUser, findByKey, list } = require('./repository')

const logger = factoryLogger({ dir: __dirname, locale: 'service.js' })

exports.createUserService = async (body) => {
    try {
        body.password = generateHash(body.password)
        const resp = userMapper(await saveUser(body))

        logger.info({ endpoint: 'user/', method: 'createUserService', request: body, response: resp })
        return resp
    } catch (err) {
        if (err.message.startsWith('E11000')) throw error('E11000')

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

        if (!compare(body.password, user.password)) throw new Error('passwordInvalid')

        const resultUser = userMapper(user)

        const token = await createToken(resultUser)

        logger.info({ endpoint: 'user/', method: 'signInService', request: body, response: body })
        return {
            user: resultUser,
            token
        }
    } catch (err) {
        logger.error({ endpoint: 'user/', method: 'signInService', err: String(err), request: body })
        throw error(err.message)
    }
}
