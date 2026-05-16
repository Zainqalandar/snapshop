const express = require('express');

const errorHandler = require('./middleware/error.middleware')
const categoryRoutes = require('./routes/category.route');

const app = express();
const cors = require('cors');

const authRoutes = require('./routes/auth.route');
const productRoutes = require('./routes/product.route');

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Category
app.use('/api/categories', categoryRoutes);

app.use(errorHandler);



module.exports = app;