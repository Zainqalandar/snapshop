const express = require('express');

const app = express();
const cors = require('cors');

const authRoutes = require('./routers/auth.routes');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

module.exports = app;