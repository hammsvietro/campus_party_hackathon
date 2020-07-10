const bcrypt = require('bcrypt');

const knex = require('../database/connection');
const { json } = require('express');

module.exports = {
    async login(req, res) {
        const { cnpj, password } = req.body;

        try{
            // try login in as ngo, if it doesnt work then try as establishment
            const ngo = await knex('ngos').select('*').where('cnpj', cnpj).first();
            
            if (ngo) {
                if (await bcrypt.compare(password, ngo.password)) {
                    const isEstablishment = false;

                    return res.json({ ngo, isEstablishment: false });
                }
            }

            const establishment = await knex('establishments').select('*').where('cnpj', cnpj).first();

            if (establishment) {
                if (await bcrypt.compare(password, establishment.password)) {
                    const isEstablishment = true;

                    return res.json({ establishment, isEstablishment: true });
                }
            }

            res.status(401).send({ error: "login failed"});
        } catch(error) {
            console.log(error);
            res.status(500).send({ error: 'an error happened while validating the login'});
        }
    }
}