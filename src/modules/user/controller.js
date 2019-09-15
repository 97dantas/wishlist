const { createUserService, signInService, listUserService } = require('./service')

module.exports.list = async (req, res, next) => {
    try {
        res.json(await listUserService(req.query))
    } catch (error) {
        next(error)
    }
}
module.exports.create = async (req, res, next) => {
    try {
        res.json(await createUserService(req.body))
    } catch (error) {
        next(error)
    }
}

module.exports.signIn = async (req, res, next) => {
    try {
        res.json(await signInService(req.body))
    } catch (error) {
        next(error)
    }
}
