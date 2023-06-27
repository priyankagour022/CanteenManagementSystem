const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'canteen'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL successfully');
});

// Handle POST request to add an item to the order
app.post('/addOrder', (req, res) => {
  const { itemName, quantity } = req.body;
  const tokenNumber = Math.floor(Math.random() * 1000) + 1; // Generate a random token number
  const tableNumber = Math.floor(Math.random() * 10) + 1; // Generate a random table number

  // Calculate the total amount based on item price and quantity
  const totalAmount = getItemPrice(itemName) * quantity;

  // Insert the order into the 'orders' table
  const orderQuery = `
    INSERT INTO orders (itemName, quantity, totalAmount, tokenNumber, tableNumber)
    VALUES (?, ?, ?, ?, ?)
  `;
  connection.query(orderQuery, [itemName, quantity, totalAmount, tokenNumber, tableNumber], (err, orderResult) => {
    if (err) {
      console.error('Error inserting order into "orders" table: ', err);
      res.sendStatus(500);
      return;
    }

    const customerId = orderResult.insertId;

    // Insert the customer into the 'customers' table
    const customerQuery = `
      INSERT INTO customers (name, tokenNumber, tableNumber)
      VALUES (?, ?, ?)
    `;
    connection.query(customerQuery, ['John Doe', tokenNumber, tableNumber], (err) => {
      if (err) {
        console.error('Error inserting customer into "customers" table: ', err);
        res.sendStatus(500);
        return;
      }

      res.sendStatus(200);
    });
  });
});

function getItemPrice(itemName) {
  // Retrieve the price based on the selected item name
  // Add the necessary logic here to fetch the price from your database or hardcode it
  switch (itemName) {
    case 'Alu paratha':
      return 50;
    case 'Chole bhature':
      return 100;
    case 'Dahi puri':
      return 50;
    case 'Dosa':
      return 50;
    case 'Idle':
      return 30;
    default:
      return 0;
  }
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
