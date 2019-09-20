const express = require('express')
const validate = require('express-validation')

const contract = require('./contract')
const { create, update, find, findOne, findProducts, addProductsFavorites, removeOneClient } = require('./actions')

const router = express.Router()

const { tokenVerify } = require('./../../middlewares/authentication')

router.get('/', tokenVerify, find)

router.get('/:_id', tokenVerify, validate(contract.findOneClient), findOne)

router.get('/favorites-products/:_id', tokenVerify, validate(contract.findOneClient), findProducts)

router.post('/', tokenVerify, validate(contract.createClient), create)

router.post('/favorites-products/:_id', tokenVerify, validate(contract.addProductsFavorites), addProductsFavorites)

router.put('/:_id', tokenVerify, validate(contract.updateClient), update)

router.delete('/:_id', tokenVerify, validate(contract.removeClient), removeOneClient)

module.exports = { router, endpoint: '/client' }
