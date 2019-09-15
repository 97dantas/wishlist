const error = require('./error')
const { Logger } = require('./../../helpers/logger/logger')
const { saveClient, updateOne, find, findOne } = require('./repository')
exports.createClient = async (body) => {
    try {
        const resp = await saveClient(body)
        Logger.info(JSON.stringify({
            type: 'info',
            endpoint: 'client/',
            method: 'createClient',
            dir: __dirname,
            success: true,
            request: body,
            response: resp,
            locale: 'service.js'
        }))
        return resp
    } catch (err) {
        if (err.message.startsWith('E11000')) {
            throw error('E11000')
        }

        Logger.error(JSON.stringify({
            type: 'error',
            endpoint: 'client/',
            method: 'createClient',
            dir: __dirname,
            success: false,
            asdfasdf: String(err),
            request: body,
            locale: 'service.js'
        }))
        throw error(err.message)
    }
}

exports.findClient = async (query) => {
    try {
        const resp = await find(query)
        Logger.info(JSON.stringify({
            type: 'info',
            endpoint: 'client/',
            method: 'findClient',
            dir: __dirname,
            success: true,
            request: query,
            response: resp,
            locale: 'service.js'
        }))
        return resp
    } catch (err) {
        Logger.error(JSON.stringify({
            type: 'error',
            endpoint: 'client/',
            method: 'findClient',
            dir: __dirname,
            success: false,
            asdfasdf: String(err),
            request: query,
            locale: 'service.js'
        }))
        throw error(err.message)
    }
}

exports.findOneClient = async (query) => {
    try {
        const resp = await findOne(query)
        Logger.info(JSON.stringify({
            type: 'info',
            endpoint: 'client/',
            method: 'findOneClient',
            dir: __dirname,
            success: true,
            request: query,
            response: resp,
            locale: 'service.js'
        }))
        return resp
    } catch (err) {
        Logger.error(JSON.stringify({
            type: 'error',
            endpoint: 'client/',
            method: 'findOneClient',
            dir: __dirname,
            success: false,
            asdfasdf: String(err),
            request: query,
            locale: 'service.js'
        }))
        throw error(err.message)
    }
}

exports.updateClient = async (params, body = {}) => {
    try {
        const resp = await updateOne(params, body)
        Logger.info(JSON.stringify({
            type: 'info',
            endpoint: 'client/',
            method: 'updateClient',
            dir: __dirname,
            success: true,
            request: body,
            response: resp,
            locale: 'service.js'
        }))
        return resp
    } catch (err) {
        Logger.error(JSON.stringify({
            type: 'error',
            endpoint: 'client/',
            method: 'updateClient',
            dir: __dirname,
            success: false,
            asdfasdf: String(err),
            request: body,
            locale: 'service.js'
        }))
        throw error(err.message)
    }
}

exports.addProductsFavorites = async (params, body) => {
    
}
