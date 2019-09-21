const { findProductsOfClient, addProductsFavorites } = require('./service')

module.exports.findProducts = async (req, res, next) => {
    try {
        res.json(await findProductsOfClient(req.params))
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
