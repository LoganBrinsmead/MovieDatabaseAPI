const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })          // environment variables
const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    debug: false,
    host: '127.0.0.1',
    database: 'MovieWebsite',
    user: process.env.USERNAME,
    password: process.env.PW
});

module.exports = dbConnection;