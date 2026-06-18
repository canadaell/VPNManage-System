const {pool} = require('../config/database');

const PAYMENT_STATUS = Object.freeze({
    CONFIGURED: 'configured',
    PENDING: 'pending',
    UNAVAILABLE: 'unavailable'
});

async function findSubscription() {
    const [rows] = await pool.query('SELECT * FROM subscription_plans');
    return rows;
}

async function findUserSubscriptions(userId) {
    const [rows] = await pool.query(
        'SELECT start_date, end_date FROM User_subscriptions WHERE user_id = ?',
        [userId]
    );
    return rows;
}

function getPaymentStatusForSubscriptions(subscriptions) {
    return subscriptions.length > 0
        ? PAYMENT_STATUS.CONFIGURED
        : PAYMENT_STATUS.PENDING;
}

module.exports = {
    PAYMENT_STATUS,
    findSubscription,
    findUserSubscriptions,
    getPaymentStatusForSubscriptions
}
