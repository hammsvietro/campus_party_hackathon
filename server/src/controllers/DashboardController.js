const knex = require('../database/connection');
const serializeEntities = require('../utils/entitiesSerialization')

module.exports = {

  async show(req, res) {
    
    const establishments = serializeEntities(await knex('establishments'), true);

    const ngos = serializeEntities(await knex('ngos'), false);

    return res.status(200).send(establishments.concat(ngos))
  }

}