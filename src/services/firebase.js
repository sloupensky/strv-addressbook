'use strict'

const firebase = require('firebase')
const config = require('../config')

firebase.initializeApp(config.firebase)

module.exports = firebase