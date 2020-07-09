const knex = require('../database/connection');

const deleteFiles = require('../utils/deleteFiles');

module.exports = {
  
  async store(req, res) {
    const { 
      name,
      cnpj,
      email,
      phone,
      password,
      street,
      number,
      latitude,
      longitude,
      state,
      city
     } = req.body;

     if(!req.file || !res.locals.thumbnailName) return res.status(403).send({ error: 'an error occoured uploading the photos' });

     try {
       await knex('establishments').insert({
        name,
        cnpj,
        email,
        phone_number: phone,
        password,
        street,
        number,
        latitude,
        longitude,
        state,
        city,
        logo: req.file.filename,
        logo_thumbnail: res.locals.thumbnailName,
       });
     } catch (error) {

      console.log(error);
      res.status(503).send({ error: 'could\'t create establishemnt' });
      return deleteFiles([req.file.filename, res.locals.thumbnailName]);
    }

     return res.status(200).send({ success: 'success' });

  },

  async addMeal(req, res) {
    const { id } = req.params;
    const { mealQuantity, timeAvailable } = req.body;

    const trx = await knex.transaction();

    const establishemnt = await trx('establishments').where({ id }).first();

    if(!establishemnt) {
      await trx.rollback();
      return res.status(404).send({ error: 'this establishment does not exist' });
    }

    try {
      await trx('establishments').where({ id }).update({
        available_meals: mealQuantity,
        time_available: timeAvailable,
        hasMeal: true
      });
    } catch (error) {
      
      console.log(error);
      await trx.rollback();
      return res.status(503).send({ error: 'could\'t add meal' });

    }
    return res.status(200).send({ success: 'success' });
  }
}