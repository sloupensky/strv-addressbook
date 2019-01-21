/* eslint-disable global-require */
'use strict'

const env = process.env.NODE_ENV || 'local'

if (env === 'local') {
  require('dotenv').config({ silent: false })
}

const R = require('ramda')

const envConfigPath = `./env/${env}`
const envConfig = require(envConfigPath)
const defaultConfig = require('./default')(env)

const resultConfig = R.mergeDeepRight(defaultConfig, envConfig)

module.exports = resultConfig
