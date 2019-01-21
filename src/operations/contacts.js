'use strict'

const logger = require('../utils/logger')
const contactRepository = require('../repositories/contacts')
const errors = require('../utils/errors')

async function save(input) {
  logger.info({ input },'Saving contact')

  return await contactRepository.create(input)
}

async function getById(id) {
  const contact = await contactRepository.findById(id)

  if(!contact) {
    throw new errors.NotFoundError()
  }

  return contact;
}

module.exports = {
  save,
  getById,
}