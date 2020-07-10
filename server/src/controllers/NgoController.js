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
            logo,
            logo_thumbnail,
            street,
            number,
            state,
            city
        } = req.body;

        if(!req.file || !res.locals.thumbnailName) return res.status(403).send({ error: "an error ocurred uploading the photos" });

        try {
            await knex('ngos').insert({
                name,
                cnpj,
                email,
                phone_number,
                password,
                logo: req.file.filename,
                logo_thumbnail: res.locals.thumbnailName,
                street,
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

            console.log('get /ngos/index')

            return res.json(ngos);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: 'something really weird happened'});
        }
        
    },

    async updateName(req, res) {
        const { newName } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              name: { newName }
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
        const { newEmail } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              email: { newEmail }
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
        const { newPhone } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              phone_number: { newPhone }
            });
          } catch (error) {
            
            console.log(error);
            await trx.rollback();
            return res.status(503).send({ error: 'couldn\'t change phone number' });
      
          }
          await trx.commit();
          return res.status(200).send({ success: 'success' });
    },

    async updatePassword(req, res) {
        const { newPassword } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              password: { password }
            });
          } catch (error) {
            
            console.log(error);
            await trx.rollback();
            return res.status(503).send({ error: 'couldn\'t change password' });
      
          }
          await trx.commit();
          return res.status(200).send({ success: 'success' });
    },

    // ToDo update logo

    async updateStreet(req, res) {
        const { newStreet } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              street: { newStreet }
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
        const { newNumber } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              number: { newNumber }
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
        const { newState } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              state: { newState }
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
        const { newCity } = req.body;
        const { id } = req.params;

        const trx = await knex.transaction();

        const ngo = await trx('ngos').where({ id }).first();

        if(!ngo) {
            await trx.rollback();
            return res.status(404).send({ error: 'this ngo does not exist' });
        }

        try {
            await trx('ngos').where({ id }).update({
              city: { newCity }
            });
          } catch (error) {
            
            console.log(error);
            await trx.rollback();
            return res.status(503).send({ error: 'couldn\'t change city number' });
      
          }
          await trx.commit();
          return res.status(200).send({ success: 'success' });
    },

    async getNgo(req, res) {
        const { id } = req.params;

        const ngo = await knex('ngos').select('*').where('id', id);

        return res.json(ngo);
    }

}