const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    listOneClient: {
        params: {
            _id: Joi.objectId().required()
        }
    }
}
