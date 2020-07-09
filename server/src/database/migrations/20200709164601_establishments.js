
exports.up = function(knex) {
  return knex.schema.createTable('establishments', table => {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('cnpj').notNullable();
    table.string('email');
    table.string('phone_number');
    table.string('password');
    table.string('logo');
    table.string('logo_thumbnail');
    table.string('street');
    table.string('number');
    table.string('latitude');
    table.string('longitude');
    table.string('state');
    table.string('city');
    table.integer('available_meals').notNullable().defaultTo(0);
    table.time('time_available');
    table.boolean('has_meal').notNullable().defaultTo(false);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('establishments');
};
