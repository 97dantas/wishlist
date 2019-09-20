const { createClient, updateClient, findClient, findOneClient, findProductsOfClient, addProductsFavorites, removeOne } = require('./service')

module.exports.find = async (req, res, next) => {
    try {
        res.json(await findClient(req.query))
    } catch (error) {
        next(error)
    }
}
module.exports.findOne = async (req, res, next) => {
    try {
        res.json(await findOneClient(req.params))
    } catch (error) {
        next(error)
    }
}
module.exports.findProducts = async (req, res, next) => {
    try {
        res.json(await findProductsOfClient(req.params))
    } catch (error) {
        next(error)
    }
}
module.exports.create = async (req, res, next) => {
    try {
        res.json(await createClient(req.body))
    } catch (error) {
        next(error)
    }
}

module.exports.update = async (req, res, next) => {
    try {
        res.json(await updateClient(req.params, req.body))
    } catch (error) {
        next(error)
    }
}
module.exports.removeOneClient = async (req, res, next) => {
    try {
        res.json(await removeOne(req.params))
    } catch (error) {
        next(error)
    }
}

module.exports.addProductsFavorites = async (req, res, next) => {
    try {
        res.json(await addProductsFavorites(req.params, req.body))
    } catch (error) {
        next(error)
    }
}
