const express = require('express');
const router = express.Router();
const database = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const user_id = req.query.user_id;
    
    if (!user_id) {
      return res.status(400).json({ error: '缺少必要的参数' });
    }

    const [rows] = await database.execute(
      'SELECT start_date, end_date FROM User_subscriptions WHERE user_id = ?',
      [user_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: '未找到该用户的订阅信息' });
    }

    res.status(200).json({
      user_id: user_id,
      subscriptions: rows.map(row => ({
        start_date: row.start_date,
        end_date: row.end_date
      }))
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

module.exports = router;