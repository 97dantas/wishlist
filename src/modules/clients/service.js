const error = require('./error')
const { factoryLogger } = require('./../../helpers/logger/logger')
const { saveClient, updateOne, find, findOne, removeOne } = require('./repository')

const { findProducts } = require('./../../services/integrationMagalu/service')

const logger = factoryLogger({ dir: __dirname, locale: 'service.js' })

exports.createClient = async (body) => {
    try {
        const resp = await saveClient(body)

        logger.info({ endpoint: 'client/', method: 'createClient', request: body, response: resp })

        return resp
    } catch (err) {
        if (err.message.startsWith('E11000')) throw error('E11000')

        logger.error({ endpoint: 'client/', method: 'createClient', err: String(err), request: body })

        throw error(err.message)
    }
}

exports.findClient = async (query) => {
    try {
        const resp = await find(query)

        logger.info({ endpoint: 'client/', method: 'findClient', request: query, response: resp })

        return resp
    } catch (err) {
        logger.error({ endpoint: 'client/', method: 'findClient', err: String(err), request: query })

        throw error(err.message)
    }
}

exports.findOneClient = async (params) => {
    try {
        const resp = await findOne(params)

        logger.info({ endpoint: 'client/', method: 'findOneClient', request: params, response: resp })

        return resp
    } catch (err) {
        logger.error({ endpoint: 'client/', method: 'findOneClient', err: String(err), request: params })
        throw error(err.message)
    }
}

exports.updateClient = async (params, body = {}) => {
    try {
        const resp = await updateOne(params, body)

        logger.info({ endpoint: 'client/', method: 'updateClient', request: body, response: resp })

        return resp
    } catch (err) {
        logger.error({ endpoint: 'client/', method: 'updateClient', err: String(err), request: body })

        throw error(err.message)
    }
}

exports.updateClient = async (params, body = {}) => {
    try {
        const resp = await updateOne(params, body)

        logger.info({ endpoint: 'client/', method: 'updateClient', request: { body, params }, response: resp })

        return resp
    } catch (err) {
        logger.error({ endpoint: 'client/', method: 'updateClient', err: String(err), request: body })

        throw error(err.message)
    }
}

exports.removeOne = async (params) => {
    try {
        const resp = await removeOne(params)

        logger.info({ endpoint: 'client/', method: 'updateClient', request: params, response: resp })

        return resp
    } catch (err) {
        logger.error({ endpoint: 'client/', method: 'updateClient', err: String(err), request: params })

        throw error(err.message)
    }
}

exports.addProductsFavorites = async (params, body) => {
    try {
        const products = await findProducts(body.idProduct)

        if (!products) throw Error('productNotFound')

        const resp = await updateOne({ _id: params._id, 'productsFavorites.id': { $ne: body.idProduct } }, { $push: { productsFavorites: products } })

        logger.info({ endpoint: 'client/addProductsFavorites', method: 'addProductsFavorites', request: body, response: resp })

        return resp
    } catch (err) {
        logger.error({ endpoint: 'client/addProductsFavorites', method: 'addProductsFavorites', err: String(err), request: body })
        
        if (err.message.endsWith('404')) throw error('productNotFound')

        throw error(err.message)
    }
}

exports.findProductsOfClient = async (params, body) => {
    try {
        const resp = await findOne(params, 'productsFavorites')

        if (!resp) throw Error('clientNotFound')

        logger.info({ endpoint: 'client/addProductsFavorites', method: 'findProductsOfClient', request: body, response: resp })

        return resp
    } catch (err) {
        logger.error({ endpoint: 'client/addProductsFavorites', method: 'findProductsOfClient', err: String(err), request: body })

        throw error(err.message)
    }
}
