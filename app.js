const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/user.route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/users', userRoutes);

app.get('/', (req, res) => {
    res.send(`User Management API is running...`);
});

module.exports = app;