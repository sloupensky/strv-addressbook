'use strict'

const Router = require('koa-router')
const { handleErrors, handleNotFound } = require('../middleware/errors')
const { authenticate } = require('../middleware/authentication')
const users = require('../controllers/users')
const contacts = require('../controllers/contacts')

const router = new Router()
router.use(handleErrors)

router.post('/session/user', users.login)
router.post('/users', users.signUp)

router.put('/contact', authenticate, contacts.put)
router.use(handleNotFound)

module.exports = router.routes()
