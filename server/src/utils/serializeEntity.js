const dotenv = require('dotenv');

dotenv.config();

module.exports = function(entity, isEstablishment) {

    entity.logo = `${process.env.SV_ADDRESS}:${process.env.SV_PORT}/uploads/${entity.logo}`;
    entity.logo_thumbnail = `${process.env.SV_ADDRESS}:${process.env.SV_PORT}/uploads/${entity.logo_thumbnail}`;
    entity.password = undefined;
    if(isEstablishment) {
      entity.isEstablishment = true;
    }
    return entity;
  
}