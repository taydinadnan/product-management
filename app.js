const express = require('express');
const app = express();
const products_routes = require('./routes/products.js');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Product Management API. Please use the /api/products route to access the data. Number of update: 5 (Image version 5.0.0');
});

app.use('/api/products', products_routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
