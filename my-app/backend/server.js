const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
const dbConnection = require('./config/Database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/', routes);

// Test route
app.get('/', (req, res) => {
    res.send("Welcome to the API");
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));




/*
const PORT = 8080;

const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());
app.use(cors());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '$Stenbot100',
    database: 'test',
    multipleStatements: true
});

mysqlConnection.connect((err)=> {
    if(!err) console.log('Connection Established Successfully');
    else console.log('Connection Failed!'+ JSON.stringify(err, undefined, 2));
});

app.get('/',(req,res)=>{
    res.send("welcome")
})

app.get('/welcome', (req, res) => {
    res.send("Welcome User");
});

app.post('/signup', (req, res) => {
    try {
        const {userName, userEmail, userPassword} = req.body;
        let checkQuery = `SELECT * FROM USER WHERE email = ?;`;

        mysqlConnection.query(checkQuery, [userEmail], (err, results) => {
            if (err) return res.status(500).send("Server error. Please try again later."); //throw err;
                
            if (results.length > 0) {
                return res.status(409).send("Email is already in use. Please sign up with a different account.");
            } else {
                let query = `INSERT INTO USER (name, email, password) VALUES (?, ?, ?);`;

                mysqlConnection.query(query, [userName, userEmail, userPassword], (err, rows) => {
                    if (err) return res.status(500).send("Server error. Please try again later."); //throw err;
                    console.log("Row inserted with id = " + JSON.stringify(rows));
                    res.status(200).send(`Success!`);
                });
            }
        });
    } catch (error) {
        res.status(500).send("An unexpected error occurred. Please try again later.");
    }
});

app.post('/authenticate', (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        let query = `SELECT * FROM USER WHERE email = ? AND password = ?;`;

        mysqlConnection.query(query, [userEmail, userPassword], (err, rows) => {
            if (err) {
                res.status(500).send("Server error. Please try again later.");
            } else if (rows.length > 0) {
                res.status(200).send("Login successful!");
            } else {
                res.status(401).send("Invalid email or password.");
            }
        });
    } catch (error) {
        res.status(500).send("Server error. Please try again later.");
    }
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
*/