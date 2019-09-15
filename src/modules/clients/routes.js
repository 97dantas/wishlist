const express = require('express')
const validate = require('express-validation')

const contract = require('./contract')
const { create } = require('./controller')

const router = express.Router()

router.get('/', (_, res) => {
    res.json({ ok: 'ok' })
})
router.get('/list/:_id', validate(contract.listOneClient), (_, res) => {
    res.json({ ok: 'ok' })
})
router.post('/create', create)

module.exports = { router, endpoint: '/client' }
