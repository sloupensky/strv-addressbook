'use strict'

const { validate } = require('../validations')
const schema = require('../validations/schemas/contacts')
const operations = require('../operations/contacts')

/**
 * Contacts put method
 * @param ctx
 * @returns {Promise<void>}
 */
async function put(ctx) {
  validate(schema.contact,  ctx.request.body )

  let docId = await operations.create(ctx.request.body)
  const contact = await operations.getById(docId)

  ctx.status = 201
  ctx.body = contact
}

module.exports = {
  put,
}