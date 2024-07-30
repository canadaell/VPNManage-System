const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const subscriptionService = require('../service/subscriptionService');
const router = express.Router();

// get subscription plans
router.get('/', asyncHandler(async (req, res) => {
  const subscriptions = await subscriptionService.findSubscription();
  res.json(subscriptions);
}));



module.exports = router;

// router.get('/subscriptions', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM subscription_plans');
    
//     res.json({
//       success: true,
//       data: rows
//     });
//   } catch (error) {
//     console.error('Error fetching subscription plans:', error);
//     res.status(500).json({
//       success: false,
//       message: 'An error occurred while fetching subscription plans',
//       error: error.message  
//     });
//   }
// });

// // get plans by id
// router.get('/subscriptions/:id', async (req, res) => {
//   try {
//     const [rows] = await pool.query('SELECT * FROM subscription_plans WHERE id = ?', [req.params.id]);

//     if (rows.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Subscription plan not found'
//       });
//     }

//     res.json({
//       success: true,
//       data: rows[0]
//     });
//   } catch (error) {
//     console.error('Error fetching subscription plan:', error);
//     res.status(500).json({
//       success: false,
//       message: 'An error occurred while fetching the subscription plan',
//       error: error.message  
//     });
//   }
// });
