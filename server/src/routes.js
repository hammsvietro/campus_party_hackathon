const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res) => res.status(200).send({ success: 'success' }));


module.exports = routes;