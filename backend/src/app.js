const createServer = require('./config/server');
const { testConnection } = require('./config/database');
const authRoutes = require('./api/auth');
const userRoutes = require('./api/users');
const subscriptionRoutes = require('./api/subscriptions');
const buyPlanRoutes = require('./api/buyplan');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');



require('dotenv').config();
const app = createServer();
// app.get('/test', (req, res) => {
//     res.json({ message: 'Test route works!' });
//   });

// test database connection
testConnection().catch(console.error);

// routes
app.get('/', (req, res) => {
    res.json({ message: 'backend api' });
});

// app.get('/api/subscriptions', (req, res) => {
//     res.json({ message: 'Subscriptions route' });
//   });

console.log('Mounting routes...');
app.use('/api/subscriptions', subscriptionRoutes);
console.log('Subscription routes mounted');
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/buyplan', buyPlanRoutes);
// get subscription plans



// 404 handler
app.use(notFound);

// global error handler
app.use(errorHandler);


module.exports = app;