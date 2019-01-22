'use strict'

const logger = require('../utils/logger')
const contactRepository = require('../repositories/contacts')
const errors = require('../utils/errors')

/**
 * Save contact operation
 * - save contact with speicified
 * @param input
 * @returns {Promise<string>}
 */
async function create(input) {
  logger.info({ input },'Saving contact')

  return await contactRepository.create(input)
}

/**
 * Find contact by specified id
 * @param id
 * @returns {Promise<firebase.firestore.DocumentData>}
 */
async function getById(id) {
  const contact = await contactRepository.findById(id)

  if(!contact) {
    throw new errors.NotFoundError()
  }

  return contact;
}

module.exports = {
  create,
  getById,
}