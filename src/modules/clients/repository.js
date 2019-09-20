const Client = require('../../models/client')
const { client: clientRedis } = require('./../../redis')

exports.saveClient = async user => {
    const newClient = new Client(user)
    return newClient.save()
}

exports.findByEmail = async email => Client.findOne({ email })

exports.findById = async _id => Client.findById(_id)

exports.find = async (query = {}) => Client.find(query)

exports.findOne = async (query = {}) => Client.findOne(query)

exports.updateOne = async (query, data) => Client.updateOne(query, data)

exports.findOneAndUpdate = async (query, data) => Client.findOneAndUpdate(query, data)

exports.removeOne = async (query) => Client.deleteOne(query)

exports.getProductsAsync = (id) => clientRedis.getAsync(`product/${id}`)

exports.setProducts = (id, data) => clientRedis.set(`product/${id}`, JSON.stringify(data), 'EX', 15 * 60 * 10000)
