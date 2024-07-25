const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 创建数据库连接池
const pool = require('./config/userDB'); 

app.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // 验证密码
  if (password !== confirmPassword) {
    return res.status(400).json({ message: '密码不匹配' });
  }

  try {
    // 对密码进行哈希处理
    const hashedPassword = await bcrypt.hash(password, 10);

    // 将用户数据插入数据库
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});