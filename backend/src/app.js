const createServer = require('./config/server');
const { testConnection } = require('./config/database');
const authRoutes = require('./api/auth');
const userRoutes = require('./api/users');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = createServer();

// test database connection
testConnection().catch(console.error);

// routes
app.get('/', (req, res) => {
    res.json({ message: 'backend api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use(notFound);

// global error handler
app.use(errorHandler);

module.exports = app;