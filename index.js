const express = require('express');
const dotenv = require('dotenv');
const BitcoinCore = require('bitcoin-core');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Real Estate Tokenization API is running' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const client = new BitcoinCore({
  network: 'testnet', // Use testnet for development
  username: process.env.BITCOIN_RPC_USER,
  password: process.env.BITCOIN_RPC_PASS,
  port: process.env.BITCOIN_RPC_PORT
});
