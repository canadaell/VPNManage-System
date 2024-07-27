const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../config/database');
const jwt = require('jsonwebtoken');
require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);
//register
router.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // verify passcode
  if (password !== confirmPassword) {
    return res.status(400).json({ message: '密码不匹配' });
  }

  try {
    // check if email have been registered
    const [existingUsers] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: '该邮箱已被注册' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new user
    const [result] = await pool.execute(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );

    res.status(201).json({ message: '注册成功', userId: result.insertId });
  } catch (error) {
    console.error('注册错误:', error);
    res.status(500).json({ message: '注册失败，请稍后再试' });
  }
});


function generateToken(user) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }
  try {
    return jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      { expiresIn: '1h' }
    );
  } catch (error) {
    console.error('Token generation error:', error);
    throw error;
  }
}
//login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user in database
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }

    const user = users[0];

    // verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: '邮箱或密码错误' });
    }

    // build JWT token
    const token = generateToken(user);

    res.json({
      message: '登录成功',
      token,
      userId: user.id,
      expiresIn: 3600 // Token expires in 1 hour
    });

  } catch (error) {
    console.error('登录错误:', error);
    res.status(500).json({ message: '登录失败，请稍后再试' });
  }
});

module.exports = router;