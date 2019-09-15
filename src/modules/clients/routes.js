const express = require('express')
const validate = require('express-validation')

const contract = require('./contract')
const { create, update, find, findOne } = require('./controller')

const router = express.Router()

router.get('/', find)

router.get('/:_id', validate(contract.findOneClient), findOne)

router.post('/', validate(contract.createClient), create)

router.put('/:_id', validate(contract.updateClient), update)

module.exports = { router, endpoint: '/client' }
