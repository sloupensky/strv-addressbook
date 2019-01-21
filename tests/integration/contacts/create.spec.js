
const request = require('supertest-koa-agent')
const { expect } = require('chai')
const app = require('../../../src/app')
const { resetDb } = require('../../helpers')
const FirebaseServer = require('firebase-server')

describe('Contacts', () => {
  beforeEach(resetDb)

  context('PUT /contact', () => {
    let userToken
    let fbServer

    beforeEach(async () => {
      fbServer = new FirebaseServer(5000, 'localhost')

      const res = await request(app)
      .post('/users')
      .send({
        email: 'test@test.cz',
        name: 'test',
        password: '11111111',
      })
      .expect(201)

      userToken = res.body.accessToken
    })

    it('responds with created contact', async () => {
      const contactData = {
        address: {
          city: 'Test city',
          street: 'Test street',
          streetNumber: '44',
          zip: '78501'
        },
        email: 'test@test.cz',
        firstName: 'Test firstname',
        lastName: 'Test lastname',
        phone: '+420777111111'
      }

      const res = await request(app)
      .put('/contact')
      .set('Authorization', `jwt ${userToken}`)
      .send(contactData)
      .expect(201)

      expect(res.body).to.deep.include({
        ...contactData,
      })

      expect(res.body).to.have.all.keys([
        'address',
        'email',
        'firstName',
        'lastName',
        'phone',
      ])

      expect(res.body.address).to.have.all.keys([
        'city',
        'street',
        'streetNumber',
        'zip',
      ])
    })

    afterEach(() => {
      fbServer.close()
    })
  })
})
