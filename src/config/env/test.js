'use strict'

module.exports = {
  hostname: 'http://localhost:3000',
  logger: {
    enabled: false,
    stdout: true,
    minLevel: 'error',
  },
  database: {
    connection: 'postgres://postgres:password@localhost:5432/user-accounts-test',
  },
  firebase: {
    databaseURL: 'ws://localhost:5000',
    projectId: "strv-addressbook-sloupensky",
  }
}
