const express = require('express')
const validate = require('express-validation')

const contract = require('./contract')
const { create, signIn, list } = require('./controller')

const { tokenVerify } = require('./../../middlewares/authentication')

const router = express.Router()

router.get('/', (_, res) => {
    res.json({ ok: 'ok' })
})
router.get('/list/', tokenVerify, list)

router.get('/list/:_id', validate(contract.listOneClient), (_, res) => {
    res.json({ ok: 'ok' })
})
router.post('/create', validate(contract.createUser), create)

router.post('/sign-in', validate(contract.createUser), signIn)

module.exports = { router, endpoint: '/user' }
