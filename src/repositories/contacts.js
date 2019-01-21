'use strict'

const firebase = require('../services/firebase')

/**
 * Create contact in firebase collation contacts
 * @param attributes
 * @returns {Promise<string>}
 */
async function create(attributes) {
  let docRef = await firebase.firestore().collection('contacts').add(attributes)

  return docRef.id
}

/**
 * Find contact by firebase docId
 * @param id
 * @returns {Promise<firebase.firestore.DocumentData>}
 */
async function findById(id) {
  const data = await firebase.firestore().collection('contacts').doc(id).get()

  return data.data()
}

module.exports = {
  create,
  findById,
}