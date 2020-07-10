const knex = require('../database/connection');

const comparePasswords = require('../utils/comparePassword');
const generateToken = require('../utils/generateToken');

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;
        
        let entity;
        let isEstablishment = true;

        
        entity = await knex('establishments').where({email}).first();
        if(!entity) {
            isEstablishment = false;
            entity = await knex('ngos').where({email}).first();
        }
        if(!entity) return res.status(404).send({ error: 'wrong password / email' });
        
        if(!comparePasswords(entity.password, password)) return res.status(404).send({ error: 'wrong password / email' });
        
        entity.password = undefined;

        const token = generateToken({ id: entity.id, email: entity.email });

        return res.status(200).send({ entity, isEstablishment, token });
    }
}