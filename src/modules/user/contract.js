const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    listOneClient: {
        params: {
            _id: Joi.objectId().required()
        }
    },
    createUser: {
        body: {
            key: Joi.string().required(),
            password: Joi.string().required()
        }
    }
}
