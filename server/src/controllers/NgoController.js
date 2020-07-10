const bcrypt = require('bcryptjs');

const knex = require('../database/connection');

const deleteFiles = require('../utils/deleteFiles');

module.exports = {

    async store(req, res) {
        const {
            name,
            cnpj,
            email,
            phone_number,
            password,
            latitude,
            longitude,
            street,
            number,
            state,
            city
        } = req.body;

        if(!req.file || !res.locals.thumbnailName) return res.status(403).send({ error: "an error ocurred uploading the photos" });

        // check if the ngo isnt already registered as an establishment
        // ToDo change the status code to something more semantic
        if (await knex('establishments').select('*').where('cnpj', cnpj).first()) {
          return res.status(403).send({ error: "already registered as an establishment!"})
        }


        const hashedPassword = bcrypt.hashSync(password, 8);

        try {
            await knex('ngos').insert({
                name,
                cnpj,
                email,
                phone_number,
                password: hashedPassword,
                logo: req.file.filename,
                logo_thumbnail: res.locals.thumbnailName,
                street,
                latitude,
                longitude,
                number,
                state,
                city
            });
        } catch (error) {
            console.log(error);
            res.status(503).send({ error: 'couldn\'t create ngo'});
            return deleteFiles([req.file.filename, res.locals.thumbnailName]);
        }

        return res.status(200).send({ success: 'success' });
    },

    async index(req, res) {
        try{
            const ngos = await knex('ngos').select('*');

            return res.json(ngos);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: 'something really weird happened'});
        }
        
    },

    async get(req, res) {
        const { id } = req.params;

        try{
            const ngo = await knex('ngos').select('*').where('id', id);
            return res.json(ngo);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: 'an error happened while searching the ngo'});
        }
    },

    async updateName(req, res) {
        const { name } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              name
            });
          } catch (error) {
            
            console.log(error);
            await trx.rollback();
            return res.status(503).send({ error: 'couldn\'t change name' });
      
          }
          await trx.commit();
          return res.status(200).send({ success: 'success' });
    },
    
    async updateEmail(req, res) {
        const { email } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              email
            });
          } catch (error) {
            
            console.log(error);
            await trx.rollback();
            return res.status(503).send({ error: 'couldn\'t change email' });
      
          }
          await trx.commit();
          return res.status(200).send({ success: 'success' });
    },

    async updatePhone(req, res) {
        const { phone_number } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              phone_number
            });
          } catch (error) {
            
            console.log(error);
            await trx.rollback();
            return res.status(503).send({ error: 'couldn\'t change phone number' });
      
          }
          await trx.commit();
          return res.status(200).send({ success: 'success' });
    },

    /* This is currently turned off because of safety reasons; when we have
     * proper e-mail authentication support it can be turned on
     * 
     * async updatePassword(req, res) {
     *     const { password } = req.body;
     *     const { id } = req.params;
     *
     *     const trx = await knex.transaction();
     *
     *     const ngo = await trx('ngos').where({ id }).first();
     *
     *     if(!ngo) {
     *         await trx.rollback();
     *         return res.status(404).send({ error: 'this ngo does not exist' });
     *     }
     *
     *     try {
     *         await trx('ngos').where({ id }).update({
     *           password
     *         });
     *       } catch (error) {
     *      
     *         console.log(error);
     *         await trx.rollback();
     *         return res.status(503).send({ error: 'couldn\'t change password' });
     *
     *       }
     *       await trx.commit();
     *       return res.status(200).send({ success: 'success' });
     * },
     *
     */

    // ToDo update logo

    async updateStreet(req, res) {
        const { street } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              street
            });
          } catch (error) {
            
            console.log(error);
            await trx.rollback();
            return res.status(503).send({ error: 'couldn\'t change street number' });
      
          }
          await trx.commit();
          return res.status(200).send({ success: 'success' });
    },

    async updateNumber(req, res) {
        const { number } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              number
            });
          } catch (error) {
            
            console.log(error);
            await trx.rollback();
            return res.status(503).send({ error: 'couldn\'t change number number' });
      
          }
          await trx.commit();
          return res.status(200).send({ success: 'success' });
    },

    async updateState(req, res) {
        const { state } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              state
            });
          } catch (error) {
            
            console.log(error);
            await trx.rollback();
            return res.status(503).send({ error: 'couldn\'t change state' });
      
          }
          await trx.commit();
          return res.status(200).send({ success: 'success' });
    },

    async updateCity(req, res) {
        const { city } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              city
            });
          } catch (error) {
            
            console.log(error);
            await trx.rollback();
            return res.status(503).send({ error: 'couldn\'t change city number' });
      
          }
          await trx.commit();
          return res.status(200).send({ success: 'success' });
    }

}