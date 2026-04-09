const bcrypt = require('bcryptjs');

/**
 * Hash a plain text password using bcrypt
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT) || 10);
  return await bcrypt.hash(password, salt);
};

/**
 * Compare a plain text password with a hashed password
 */
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword
};
