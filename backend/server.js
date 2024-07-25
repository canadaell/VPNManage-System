const app = require('./src/app');

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});