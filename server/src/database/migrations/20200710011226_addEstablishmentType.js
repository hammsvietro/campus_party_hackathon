
exports.up = function(knex) {
  return knex.schema.table('establishments', function(table) {
      table.string('establishmentType');
  });
};

exports.down = function(knex) {
  return knex.schema.table('establishments', function(table) {
    table.dropColumn('establishmentType');
  });
};
