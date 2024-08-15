const mysql = require('mysql');
require('dotenv').config();

const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});

dbConnection.connect((err) => {
    if (err) {
        console.error('Connection Failed!' + JSON.stringify(err, undefined, 2));
    } else {
        console.log('Connection Established Successfully!');
    }
});

module.exports = dbConnection;