const error = require('./error')
const { Logger } = require('./../../helpers/logger/logger')
exports.createUser = async (body) => {
    try {
        Logger.info(JSON.stringify({
            type: 'info',
            endpoint: '/create',
            method: 'createUser',
            dir: __dirname,
            success: true,
            request: body,
            response: body,
            locale: 'service.js'
        }))
        return body
    } catch (err) {
        Logger.error(JSON.stringify({
            type: 'error',
            endpoint: '/create',
            method: 'createUser',
            success: false,
            asdfasdf: String(err),
            request: body,
            locale: 'service.js'
        }))
        throw error(err.message)
    }
}
