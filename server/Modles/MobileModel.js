const { Model } = require("objection")

const knex = require('../db/knex');

Model.knex(knex)
class userModel extends Model {
  static get tableName() {
    return 'recharge';
  }
}

module.exports = userModel;