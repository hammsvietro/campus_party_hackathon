const knex = require('../database/connection');
const bcrypt = require('bcrypt');

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
      city,
      establishmentType
     } = req.body;

     if(!req.file || !res.locals.thumbnailName) return res.status(403).send({ error: 'an error occoured uploading the photos' });

     // check if the ngo isnt already registered as an establishment
     // ToDo change the status code to something more semantic
     if (await knex('ngos').select('*').where('cnpj', cnpj).first()) {
       return res.status(403).send({ error: "already registered as an ngo!"})
     }

     const hashedPassword = bcrypt.hashSync(password, 8);

     try {
       await knex('establishments').insert({
        name,
        cnpj,
        email,
        phone_number: phone,
        password: hashedPassword,
        street,
        number,
        latitude,
        longitude,
        state,
        city,
        logo: req.file.filename,
        logo_thumbnail: res.locals.thumbnailName,
        establishmentType
       });
     } catch (error) {

      console.log(error);
      res.status(503).send({ error: 'could\'t create establishemnt' });
      return deleteFiles([req.file.filename, res.locals.thumbnailName]);
    }

     return res.status(200).send({ success: 'success' });

  },

  async index(req, res) {
    try{
        const establishments = await knex('establishments').select('*');

        return res.json(establishments);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'something really weird happened'});
    }
    
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

    await trx.commit();
    return res.status(200).send({ success: 'success' });
  }
}