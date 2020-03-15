var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "node",
    password: "12345",
    database: "employeesDB"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected as id: " + connection.threadId);
});

module.exports = connection; 