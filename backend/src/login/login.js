// login.js
const bcrypt = require('bcrypt');

module.exports = (db) => {
  return async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: '用户名和密码都是必填项' });
    }

    try {
      // search users
      const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

      if (users.length === 0) {
        return res.status(401).json({ message: '用户名或密码不正确' });
      }

      const user = users[0];

      // verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: '用户名或密码不正确' });
      }

      // login success
      res.status(200).json({ 
        message: '登录成功',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: '服务器错误' });
    }
  };
};