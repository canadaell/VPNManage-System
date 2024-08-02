const express = require('express');
const router = express.Router();
const database = require('../config/database'); 

router.post('/', async (req, res) => {
  try {
    const { user_id, plan_id } = req.body;

    // verify user_id and plan_id
    if (!user_id || !plan_id) {
      return res.status(400).json({ error: '缺少必要的参数' });
    }

    // get start date and end date
    const start_date = new Date();
    const end_date = new Date(start_date.getTime() + 30 * 24 * 60 * 60 * 1000);

    // insert new subscription
    const [result] = await database.execute(
      'INSERT INTO User_Subscriptions (user_id, plan_id, start_date, end_date) VALUES (?, ?, ?, ?)',
      [user_id, plan_id, start_date, end_date]
    );

    // return success message
    res.status(201).json({
      message: '订阅成功',
      subscription_id: result.insertId,
      start_date: start_date,
      end_date: end_date
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

module.exports = router;