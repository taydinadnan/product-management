# Sample Node.js Product Management API

This is a sample Node.js application demonstrating basic CRUD (Create, Read, Update, Delete) operations on a product catalog. It's designed for educational purposes and uses a simple in-memory array (`data.js`) for data storage instead of a real database connection.

## Getting Started

### Prerequisites

- Node.js installed on your system.

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install dependencies.

### Running the Application

Execute `node app.js` to start the server. It will listen on port 5000.

## Features

- **List all products**: `GET /api/products`
- **Get a single product by ID**: `GET /api/products/:productID`
- **Add a new product**: `POST /api/products`
- **Update an existing product**: `PUT /api/products/:productID`
- **Delete a product**: `DELETE /api/products/:productID`

## Data Structure

The `data.js` file contains an array of product objects. Each product has an `id`, `name`, and `price`.

Example:
```javascript
[
    { id: 1, name: 'iPhone', price: 800 },
    { id: 2, name: 'iPad', price: 650 },
    { id: 3, name: 'iWatch', price: 750 }
]
```

## Note

- This application is for demonstration purposes only and does not persist data between server restarts.
- The data management is done through a static JavaScript array (`data.js`) instead of a real database.

## Contributing

Feel free to fork this repository and submit pull requests for any improvements or fixes.


# Sample Node.js Product Management API

This is a sample Node.js application demonstrating basic CRUD (Create, Read, Update, Delete) operations on a product catalog. It's designed for educational purposes and uses a simple in-memory array (`data.js`) for data storage instead of a real database connection.

## Getting Started

### Prerequisites

- Node.js installed on your system.

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install dependencies.

### Running the Application

Execute `node app.js` to start the server. It will listen on port 5000.

## Features

- **List all products**: `GET /api/products`
- **Get a single product by ID**: `GET /api/products/:productID`
- **Add a new product**: `POST /api/products`
- **Update an existing product**: `PUT /api/products/:productID`
- **Delete a product**: `DELETE /api/products/:productID`

## Data Structure

The `data.js` file contains an array of product objects. Each product has an `id`, `name`, and `price`.

Example:
```javascript
[
    { id: 1, name: 'iPhone', price: 800 },
    { id: 2, name: 'iPad', price: 650 },
    { id: 3, name: 'iWatch', price: 750 }
]
```

## Note

- This application is for demonstration purposes only and does not persist data between server restarts.
- The data management is done through a static JavaScript array (`data.js`) instead of a real database.

## Contributing

Feel free to fork this repository and submit pull requests for any improvements or fixes.

@csahmetyilmaz# product-management
