'use strict'

const database = require('../index')

class Base extends database.Model {

  /**
   * Before insert trigger
   * - insert updateAt and createAt with current/specified date
   */
  $beforeInsert() {
    this.updatedAt = this.createdAt = this.createdAt || new Date()
  }

  /**
   * Before update trigger
   * - update updateAt field with current date
   */
  $beforeUpdate() {
    this.updatedAt = new Date()
  }
}

module.exports = Base
