const express = require('express');
const router = express.Router();
const database = require('../config/database'); 
const {
  parseBuyPlanRequest,
  buildBuyPlanResponse
} = require('../contracts/paymentContracts');

router.post('/', async (req, res) => {
  try {
    const request = parseBuyPlanRequest(req.body);

    // verify user_id and plan_id
    if (!request.ok) {
      return res.status(400).json({ error: request.error.message });
    }

    const { user_id, plan_id } = request.value;

    // get start date and end date
    const start_date = new Date();
    const end_date = new Date(start_date.getTime() + 30 * 24 * 60 * 60 * 1000);
    //delete old subscription
    await database.execute(
      'DELETE FROM User_Subscriptions WHERE user_id = ?',
      [user_id]
    ); 
    // insert new subscription
    const [result] = await database.execute(
      'INSERT INTO User_Subscriptions (user_id, plan_id, start_date, end_date) VALUES (?, ?, ?, ?)',
      [user_id, plan_id, start_date, end_date]
    );

    

    // return success message
    res.status(201).json(buildBuyPlanResponse(result.insertId, start_date, end_date));

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

module.exports = router;
