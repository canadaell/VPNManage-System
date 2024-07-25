const { pool } = require('../config/database');

async function findAllUsers() {
  const [rows] = await pool.query('SELECT * FROM users');
  return rows;
}

async function findUserById(id) {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

module.exports = {
  findAllUsers,
  findUserById
};