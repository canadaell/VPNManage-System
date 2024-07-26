const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const userService = require('../service/userService');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const users = await userService.findAllUsers();
  res.json(users);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await userService.findUserById(id);
  if (!user) {
    return res.status(404).json({ message: '用户不存在' });
  }
  res.json(user);
}));

module.exports = router;