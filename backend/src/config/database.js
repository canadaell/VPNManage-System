
const mysql = require('mysql2/promise');


//mysql connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'users',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });



//connection test
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('connected as id ' + connection.threadId);
        connection.release();
    } catch (error) {
        console.error('Error: ' + error);
    }
}

async function findAllUsers() {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        return rows;
    } catch (error) {
        console.error('Error querying database:', error);
        throw error;
    }
}

async function findUserById(id) {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    } catch (error) {
        console.error('Error querying user:', error);
        throw error;
    }
}

async function findSubscription() {
    try {
        const [rows] = await pool.query('SELECT * FROM subscription_plans' );
        return rows;
    } catch (error) {
        console.error('Error querying subscriptions:', error);
        throw error;
    }
}

module.exports = {pool, testConnection, findAllUsers, findUserById, execute: pool.execute.bind(pool), findSubscription};