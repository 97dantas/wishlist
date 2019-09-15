const Client = require('../../models/client')

exports.saveClient = async user => {
    const newClient = new Client(user)
    return newClient.save()
}

exports.findByEmail = async email => Client.findOne({ email })

exports.findById = async _id => Client.findById(_id)

exports.find = async (query = {}) => Client.find(query)

exports.findOne = async (query = {}) => Client.findOne(query)

exports.updateOne = async (query, data) => Client.updateOne(query, data)
