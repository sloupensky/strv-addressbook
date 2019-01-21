'use strict'

const contact = {
  type: 'Object',
  required: true,
  properties: {
    address : {
      type: 'Object',
      required: true,
      properties: {
        city: {type: 'string', required: true, maxLenght: 80},
        street: {type: 'string', required: true, maxLenght: 80},
        streetNumber: {type: 'string', format: '^[0-9\/.,\-A-Za-z]+$', required: true, maxLenght: 30},
        zip: {type: 'string', format: '^[0-9 ]{1,6)$', required: true, maxLength: 6}
      }
    },
    firstName: { type: 'string', required: true, maxLenght: 80},
    lastName: { type: 'string', required: true, maxLenght: 80},
    email: { type: 'string', required: true, format: 'email', maxLenght: 80},
    phone: { type: 'string', required: true, maxLenght: 14},
  },
}

module.exports = {
  contact,
}
