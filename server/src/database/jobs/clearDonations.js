const knex = require('../connection');
const moment = require('moment');

async function clearDonations() {

  const establishments = await knex('establishments');

  for(let establishment of establishments) {
    if(!establishment.time_available) {
      continue;
    }
    const now = moment(new Date());
    const establishmentDate = moment(establishment.time_available, 'HH:mm');
    if(moment(now).isAfter(establishmentDate)) {
      console.log(`reseting ${establishment.name}`);
      await knex('establishments').update({
        available_meals: 0,
        has_meal: false,
        time_available: null
      }).where({ id: establishment.id });
    }
  }
}

module.exports = clearDonations;