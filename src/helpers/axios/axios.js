const axios = require('axios')

exports.api = axios.create({
    baseURL: 'http://challenge-api.luizalabs.com/api/'
})

exports.factoryApi = (baseURL) => axios.create({ baseURL })
