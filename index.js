const express = require('express');

const app = express();

// ROUTERS
const categories = require('./src/routes/categories');
const products = require('./src/routes/products');
const accounts = require('./src/routes/accounts');
const orders = require('./src/routes/orders');
const admin = require('./src/routes/admin');

app.listen(8081);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

app.use('/api/categories', categories); // Categories
app.use('/api/products', products); // Products
app.use('/api/accounts', accounts); // Accounts
app.use('/api/orders', orders); // Orders
app.use('/api/admin', admin); // Admin