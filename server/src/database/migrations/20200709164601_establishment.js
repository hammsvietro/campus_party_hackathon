
exports.up = function(knex) {
  return knex.schema.createTable('establishment', table => {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('cnpj').notNullable().unique();
    table.string('email').unique();
    table.string('phone_number');
    table.string('password');
    table.string('logo');
    table.string('logo_thumbnail');
    table.string('latitude');
    table.string('longitude');
    table.string('state');
    table.string('city');
    table.integer('available_meals');
    table.time('time_available');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('establishment');
};
