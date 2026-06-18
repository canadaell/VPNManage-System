const express = require('express');
const router = express.Router();
const subscriptionService = require('../service/subscriptionService');

router.get('/', async (req, res) => {
  try {
    const user_id = req.query.user_id;
    
    if (!user_id) {
      return res.status(400).json({
        error: '缺少必要的参数',
        payment_status: subscriptionService.PAYMENT_STATUS.UNAVAILABLE
      });
    }

    const subscriptions = await subscriptionService.findUserSubscriptions(user_id);
    const paymentStatus = subscriptionService.getPaymentStatusForSubscriptions(subscriptions);

    if (subscriptions.length === 0) {
      return res.status(404).json({
        error: '未找到该用户的订阅信息',
        payment_status: paymentStatus,
        subscriptions: []
      });
    }

    res.status(200).json({
      user_id: user_id,
      payment_status: paymentStatus,
      subscriptions: subscriptions.map(row => ({
        start_date: row.start_date,
        end_date: row.end_date
      }))
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: '服务器内部错误',
      payment_status: subscriptionService.PAYMENT_STATUS.UNAVAILABLE
    });
  }
});

module.exports = router;
