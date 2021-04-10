const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'e2l2u5jy',
    database: 'maroDb'
});

mysqlConnection.connect(function(err) {

    if (err) {
        console.log(err)
        return;
    }

    console.log('Database is connected')

});

module.exports = mysqlConnection;