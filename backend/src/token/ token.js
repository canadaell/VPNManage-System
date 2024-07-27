const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

const generateToken = function (email, userId) {
  return new Promise((resolve, reject) => {
    jwt.sign({ email, userId }, jwtSecret, { expiresIn: '24h' }, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });
}

const verifyToken = function (token) {
  return new Promise((resolve, reject) => {
    if (!token) {
      return reject({ error: 'Token is missing' });
    }
    try {
      const info = jwt.verify(token.split(' ')[1], jwtSecret);
      resolve(info);
    } catch (error) {
      reject({ error: 'Invalid token' });
    }
  });
}

module.exports = {
  generateToken,
  verifyToken
}