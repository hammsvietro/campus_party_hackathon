const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const routes = require('./routes');

dotenv.config();

const app = express();




app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));



app.listen(process.env.SV_PORT, () => {
  console.log(`listening at: ${process.env.SV_ADDRESS}:${process.env.SV_PORT}`);
  return process.env.SV_PORT;
});
