
exports.up = function(knex) {
  return knex.schema.createTable('ngos', table => {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('cnpj').notNullable().unique();
    table.string('email').unique();
    table.string('phone_number');
    table.string('password');
    table.string('logo');
    table.string('logo_thumbnail');
    table.string('street');
    table.string('number');
    table.string('state');
    table.string('city');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ngos');
};
