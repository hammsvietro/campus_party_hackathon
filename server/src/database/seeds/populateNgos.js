
exports.seed = function(knex) {
    return knex('ngos').insert([
          { name: 'Projeto do Zé', cnpj: '45136972740001', email: 'projetodoze@hotmail.com', phone_number: '37125543', password: '$2b$08$XhP1jPNuAw5qgWgKA4tz4eHs.epDN/z4YDhUmBGgDSzat/o272AFO', logo: 'projetodoze.jpg', logo_thumbnail: 'thumbnail-projetodoze.jpg', street: 'Rua Velha', number: '5711', latitude: '-15.797219', longitude: '-47.863876', state: 'DF', city: 'Brasilia'},
      ]);
};
