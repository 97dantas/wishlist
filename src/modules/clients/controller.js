const { createClient, updateClient, findClient, findOneClient, addProductsFavorites } = require('./service')

module.exports.find = async (req, res, next) => {
    try {
        res.json(await findClient(req.query))
    } catch (error) {
        next(error)
    }
}
module.exports.findOne = async (req, res, next) => {
    try {
        res.json(await findOneClient(req.query))
    } catch (error) {
        next(error)
    }
}
module.exports.create = async (req, res, next) => {
    try {
        console.log('create router')
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

module.exports.addProductsFavorites = async (req, res, next) => {
    try {
        res.json(await addProductsFavorites(req.params, req.body))
    } catch (error) {
        next(error)
    }
}
