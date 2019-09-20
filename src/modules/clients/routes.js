const express = require('express')
const validate = require('express-validation')

const contract = require('./contract')
const { create, update, find, findOne, addProductsFavorites, removeOneClient } = require('./controller')

const router = express.Router()

const { tokenVerify } = require('./../../middlewares/authentication')

router.get('/', tokenVerify, find)

router.get('/:_id', tokenVerify, validate(contract.findOneClient), findOne)

router.post('/', tokenVerify, validate(contract.createClient), create)

router.post('/addProductsFavorites/:_id', tokenVerify, validate(contract.addProductsFavorites), addProductsFavorites)

router.put('/:_id', tokenVerify, validate(contract.updateClient), update)

router.delete('/:_id', tokenVerify, validate(contract.removeClient), removeOneClient)

module.exports = { router, endpoint: '/client' }
