const bcrypt = require('bcryptjs');

const comparePassword = async (userPassword, providedPassword) => {
  const success = await bcrypt.compare(providedPassword, userPassword)
  return success; 
};

module.exports = comparePassword;