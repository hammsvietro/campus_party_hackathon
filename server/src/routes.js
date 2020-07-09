const { Router } = require('express');
const multer = require('multer');

const establishmentController = require('./controllers/EstablishmentController');

const multerConfig = require('./config/multer');
const createThumbnail = require('./middlewares/CreateThumbnail');

const upload = multer(multerConfig)
const routes = Router();

routes.get('/', (req, res) => res.status(200).send({ success: 'success' }));

routes.post('/establishment', upload.single('logo'), createThumbnail, establishmentController.store);

routes.put('/establishment/:id', establishmentController.addMeal);

module.exports = routes;