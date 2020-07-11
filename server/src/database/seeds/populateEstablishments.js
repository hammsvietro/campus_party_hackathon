
exports.seed = function(knex) {
  // Inserts seed entries

  return knex('establishments').insert([

    { name: "Mercadinho da Esquina", cnpj: '03051568700129', email: "mercadinhodaesquina@gmail.com", phone_number: "88403715", password: '$2b$08$d4fJC8N4odI3seHzD7qkzeaLPz4Rn6DUD7/Ffmx8sCgIyG3vaJplm', logo: 'mercadinhodaesquina.jpg', street: "Rua Nova", number: "418", latitude: '-15.798478', longitude: '-47.860861', state: 'DF', city: 'Brasilia', available_meals: 10, time_available: '23:59', has_meal: 'true', establishmentType: 'supermarket'},

    { name: 'Boteco da Esquina', cnpj: '72144453679100', email: 'botecodaesquina@gmail.com', phone_number: '44683159', password: '$2b$08$J5u6Rfy2XnNMUOVdH5SJZ.oaB/ey9mr//TUGMjDdQjDPnqx5SjJru', logo: 'botecodaesquina.jpg', street: 'Avenida da Independência', number: '14', latitude: '-15.797339', longitude: '-47.869804', state: 'DF', city: 'Brasilia', available_meals: 0, time_available: '09:00', has_meal: 'false', establishmentType: 'bar' },
  ]);
};
