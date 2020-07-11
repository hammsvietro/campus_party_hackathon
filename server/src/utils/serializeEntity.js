const dotenv = require('dotenv');

dotenv.config();

module.exports = function(entity, isEstablishment) {

    entity.logo = `http://localhost:3333/uploads/${entity.logo}`;
    entity.logo_thumbnail = `http://localhost:3333/uploads/${entity.logo_thumbnail}`;
    entity.password = undefined;
    if(isEstablishment) {
      entity.isEstablishment = true;
    }
    return entity;
  
}