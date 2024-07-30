const {pool} = require('../config/database');


async function findSubscription() {
    const [rows] = await pool.query('SELECT * FROM subscription_plans');
    return rows;
}

module.exports = {
    findSubscription
}