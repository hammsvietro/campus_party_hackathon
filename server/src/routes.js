const { Router } = require('express');
const multer = require('multer');

const establishmentController = require('./controllers/EstablishmentController');
const ngoController = require('./controllers/NgoController');

const multerConfig = require('./config/multer');
const createThumbnail = require('./middlewares/CreateThumbnail');

const upload = multer(multerConfig)
const routes = Router();

routes.get('/', (req, res) => res.status(200).send({ success: 'success' }));

routes.post('/ngo', upload.single('logo'), createThumbnail, ngoController.store);

routes.get('/ngo/index', ngoController.index);

routes.get('/ngo/:id', ngoController.getNgo);
routes.put('/ngo/:id', ngoController.update);

routes.post('/establishment', upload.single('logo'), createThumbnail, establishmentController.store);

routes.put('/establishment/:id', establishmentController.addMeal);

module.exports = routes;