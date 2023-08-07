const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => console.log('App listening on port 3000'));

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'user_database'
});

const SECRET_KEY = process.env.SECRET_KEY;

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

app.get('/getinfo', (req, res) => {
    res.sendFile('/Users/tanyanangpal/Desktop/HyFi/P2/public/getinfo.html');
});

// Signup
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const insertUser = () => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    };
    
    try {
        const result = await insertUser();
        const token = jwt.sign({ id: result.insertId }, SECRET_KEY);
        res.json({ status: 'success', token: token });  
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err });
    }
});

// Login

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const userQuery = 'SELECT * FROM users WHERE Email = ?';
    db.query(userQuery, [email], async (err, result) => {
        if (err) {
            res.status(500).json({ status: 'error', error: 'Error in fetching user' });
            return;
        }
        
        if (result.length === 0) {
            res.status(401).json({ status: 'error', message: 'Incorrect email or password' });
            return;
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.Password);

           if (match) {
            // Generate a JWT after a successful login
            const token = jwt.sign({ id: user.ID }, SECRET_KEY);
            res.json({ status: 'success', token: token });
        } else {
            res.status(401).json({ status: 'error', message: 'Incorrect email or password' });
        }
    });
});

// Create Wallet (getinfo page)

app.post('/createWallet', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Get token from headers

    console.log('Received token:', token); 

    try {
        console.log('Verifying JWT');
        const { id } = jwt.verify(token, SECRET_KEY);

console.log('Fetching wallet from Tatum API');
const resp = await fetch('https://api.tatum.io/v3/bitcoin/wallet', {
    method: 'GET',
    headers: {
        'x-api-key': process.env.TATUM_API_KEY
    }
});

 console.log('Parsing wallet data');
        const wallet = await resp.json();

        console.log('Inserting wallet into database');
        // We no longer need to supply a wallet_id because this is now handled by the database
        db.query('INSERT INTO BTC_wallet (ID, Mnemonic, XPUB) VALUES (?, ?, ?)', [id, wallet.mnemonic, wallet.xpub], (err, result) => {
            if (err) throw err;
            res.json({ status: 'success', wallet });
        });
    } catch (err) {
        console.error('An error occurred:', err);
        res.status(500).json({ status: 'error', error: err });
    }
});

// View Wallets

app.get('/getWallets', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Get token from headers

    console.log('Received token:', token); 

    try {
        console.log('Verifying JWT');
        const { id } = jwt.verify(token, SECRET_KEY);

        console.log('Fetching wallets from database');
        db.query('SELECT * FROM BTC_wallet WHERE ID = ?', [id], (err, results) => {
            if (err) throw err;
            res.json({ status: 'success', wallets: results });
        });
    } catch (err) {
        console.error('An error occurred:', err);
        res.status(500).json({ status: 'error', error: err });
    }
});

