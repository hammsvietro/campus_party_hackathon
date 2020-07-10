const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = function generateToken(params = {}) {
  return jwt.sign(params, 'token_secreto!', {
    expiresIn: 86400 * 7, // 7 dias
  });
};
