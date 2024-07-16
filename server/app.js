const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a MySQL pool
const pool = mysql.createPool(dbConfig);

// Middleware to make the database connection available throughout the app
app.use((req, res, next) => {
  req.db = pool.promise();
  next();
});

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Root endpoint to check server status
app.get('/', async (req, res) => {
  try {
    const [rows, fields] = await req.db.query('SELECT 1 + 1 AS solution');
    res.json({ solution: rows[0].solution });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database query error' });
  }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the database
    const [result] = await req.db.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Retrieve user from the database
    const [rows] = await req.db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const user = rows[0];

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Admin panel endpoint with file upload handling
app.post('/admin', upload.single('file'), async (req, res) => {
  const { product_name, price, details, company } = req.body;
  const imageBuffer = req.file ? req.file.buffer : null; // Check if file is uploaded

  try {
    // Insert product data into the database
    const [result] = await req.db.execute(
      'INSERT INTO items (name, price, details, image_data, company) VALUES (?, ?, ?, ?, ?)',
      [product_name, price, details, imageBuffer, company]
    );
    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).json({ error: 'Error uploading data' });
  }
});


// Endpoint to fetch all products with image data
app.get('/products', async (req, res) => {
  try {
    const [rows] = await req.db.execute('SELECT * FROM items');
    
    // Modify each product to include a base64 encoded image representation
    const productsWithImages = rows.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      details: product.details,
      company: product.company,
      image: product.image_data ? Buffer.from(product.image_data).toString('base64') : null
    }));

    res.status(200).json(productsWithImages);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
});
app.post('/productDelete', async (req, res) => {
  const productId = req.query.id;

  if (!productId) {
    return res.status(400).send('Product ID is required');
  }

  try {
    const [result] = await req.db.execute('DELETE FROM items WHERE id = ?', [productId]);

    if (result.affectedRows === 0) {
      return res.status(404).send('Product not found');
    }

    res.send('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Server error');
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});