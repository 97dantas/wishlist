const error = require('./error')
const { Logger } = require('./../../helpers/logger/logger')
const { saveClient, updateOne, find, findOne, getProductsAsync, setProducts } = require('./repository')
const { api } = require('./../../helpers/axios/axios')

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
            err: String(err),
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
            err: String(err),
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
            err: String(err),
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
            err: String(err),
            request: body,
            locale: 'service.js'
        }))
        throw error(err.message)
    }
}

exports.addProductsFavorites = async (params, body) => {
    try {
        const respCache = await getProductsAsync(body.id)

        if (respCache) {
            console.log('respCache: ', respCache)
            const product = JSON.parse(respCache)
            return updateOne({ _id: params._id, 'productsFavorites.id': { $ne: body.id } }, { $push: { productsFavorites: product } })
        }
        console.log('respCache: ', respCache)
        const respAxios = await api.get(`product/${body.id}`)
        console.log('body.id, respAxios.data', body.id, respAxios.data)
        setProducts(body.id, respAxios.data)
        const resp = await updateOne({ _id: params._id, 'productsFavorites.id': { $ne: body.id } }, { $push: { productsFavorites: respAxios.data } })
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
            endpoint: 'client/addProductsFavorites',
            method: 'addProductsFavorites',
            dir: __dirname,
            success: false,
            err: String(err),
            request: body,
            locale: 'service.js'
        }))
        if (err.message.endsWith('404')) throw error('productNotFound')
        // if(err)
    }
}
