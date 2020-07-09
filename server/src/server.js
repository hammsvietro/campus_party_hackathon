const express = require('express');
const dotenv = require('dotenv');

const routes = require('./routes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);


app.listen(process.env.SV_PORT, () => {
  console.log(`listening at: ${process.env.SV_ADDRESS}:${process.env.SV_PORT}`);
  return process.env.SV_PORT;
});
