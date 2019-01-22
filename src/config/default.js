'use strict'

const pkg = require('../../package')

module.exports = env => ({
  env,
  appName: pkg.name,
  version: pkg.version,
  server: {
    port: process.env.PORT || 3001,
    bodyParser: {
      patchKoa: true,
      urlencoded: true,
      text: false,
      json: true,
      multipart: false,
    },
    cors: {
      origin: '*',
      exposeHeaders: [
        'Authorization',
        'Content-Language',
        'Content-Length',
        'Content-Type',
        'Date',
        'ETag',
      ],
      maxAge: 3600,
    },
  },
  auth: {
    secret: process.env.AUTH_SECRET || 'fdjsafdsafiewfpewqfewfJIPJFISAAS32131Kk',
    saltRounds: 10,
    createOptions: {
      expiresIn: 60 * 60,
      algorithm: 'HS256',
      issuer: `user-account-test-project.${env}`,
    },
    verifyOptions: {
      algorithm: 'HS256',
      issuer: `user-account-test-project.${env}`,
    },
  },
  logger: {
    enabled: true,
    stdout: true,
    minLevel: 'debug',
  },
  database: {
    client: 'pg',
    connection: process.env.DATABASE_URL
      || 'postgres://postgres:passw0rd@localhost:5432/user-accounts-local',
    pool: {
      min: process.env.DATABASE_POOL_MIN || 0,
      max: process.env.DATABASE_POOL_MAX || 5,
    },
  },
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID
  }
})
