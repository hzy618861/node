// mysql.js
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port:'3666',
    user: 'root',
    password: '123456',
    database: 'base'
});

connection.connect(function (err) {
    if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }
    console.log(`Mysql is connected! 连接id: ${connection.threadId}`);
});

module.exports = connection;