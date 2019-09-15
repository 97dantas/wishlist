const { createUser } = require('./service')
module.exports.create = async (req, res, next) => {
    try {
        res.json(await createUser(req.body))
    } catch (error) {
        next(error)
    }
}
