const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cron = require('node-cron');
const clearDBJob = require('./database/jobs/clearDonations');

const routes = require('./routes');

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));


cron.schedule('*/3 * * * *', clearDBJob);

if(!process.env.SV_ADDRESS || !process.env.SV_PORT) {
  console.log('Você preencehr o arquivo .env');
  return;
}

app.listen(3333, () => {
  console.log(`listening at: localhost:3333`);
  return 'localhost';
});
