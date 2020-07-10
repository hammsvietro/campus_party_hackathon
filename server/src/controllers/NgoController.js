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

    async update(req, res) {
        // req.body;
        console.log(req.body);
    },

    async getNgo(req, res) {
        const { id } = req.params;

        ngo = await knex('ngos').select('*').where('id', id);

        return res.json(ngo);
    }

}