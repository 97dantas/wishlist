const error = require('./error')
const { factoryLogger } = require('./../../helpers/logger/logger')
const { saveClient, updateOne, find, findOne, getProductsAsync, setProducts } = require('./repository')
const { api } = require('./../../helpers/axios/axios')

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

exports.findOneClient = async (query) => {
    try {
        const resp = await findOne(query)
        logger.info({ endpoint: 'client/', method: 'findOneClient', request: query, response: resp })
        return resp
    } catch (err) {
        logger.error({ endpoint: 'client/', method: 'findOneClient', err: String(err), request: query })
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

exports.addProductsFavorites = async (params, body) => {
    try {
        const respCache = await getProductsAsync(body.id)

        if (respCache) {
            const product = JSON.parse(respCache)
            return updateOne({ _id: params._id, 'productsFavorites.id': { $ne: body.id } }, { $push: { productsFavorites: product } })
        }

        const respAxios = await api.get(`product/${body.id}`)

        setProducts(body.id, respAxios.data)
        const resp = await updateOne({ _id: params._id, 'productsFavorites.id': { $ne: body.id } }, { $push: { productsFavorites: respAxios.data } })
        logger.info({ endpoint: 'client/', method: 'client/addProductsFavorites', request: body, response: resp })
  
        return resp
    } catch (err) {
        logger.error({ endpoint: 'client/addProductsFavorites', method: 'updateClient', err: String(err), request: body })

        if (err.message.endsWith('404')) throw error('productNotFound')
        throw error(err.message)
    }
}
