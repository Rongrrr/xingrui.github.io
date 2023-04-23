const mysql = require('mysql')

//建立与mysql数据库的连接关系
const db = mysql.createPool({
    host: '127.0.0.1',
    port: '8088',
    user: 'root',
    password: 'admin123',
    database: 'project',
})

module.exports = db
//测试数据库连接
// db.query('select * from user_db', (err, results) => {
//     if (err) return console.log(err.message);
    
//     console.log(results);
// })