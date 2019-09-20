const { client } = require('./../../redis')

exports.getProductsAsync = (id) => client.getAsync(`product/${id}`)

exports.setProducts = (id, data) => client.set(`product/${id}`, JSON.stringify(data), 'EX', 15 * 60 * 10000)
