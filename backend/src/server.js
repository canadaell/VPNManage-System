const express = require('express');
const app = express();
const port = 3001;
const {pool, testConnection, findAllUsers, findUserById} = require('./database');
const loginHandler = require('./login/login')(pool); // import login handler

// middleware
app.use(express.json());

// test connection
testConnection().catch(console.error);

// routes
app.get('/', (req, res) => {
    res.json({ message: 'backend api' });
});

app.get('/users', async (req, res) => {
    try {
        const users = await findAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: '服务器错误' });
    }
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await findUserById(id);
        if (!user) {
            return res.status(404).json({ message: '用户不存在' });
        }
        res.json(user);
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        res.status(500).json({ message: '服务器错误' });
    }
});

// add login route
app.post('/login', loginHandler);

// start the server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});