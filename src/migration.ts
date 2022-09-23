
var mysql = require('mysql');
var migration = require('mysql-migrations');

var connection = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'video-library'
});

migration.init(connection, __dirname + '/migrations');

module.exports = {
    "up": "CREATE TABLE categories (category_id INT NOT NULL, UNIQUE KEY category_id (category_id), name TEXT )",
}
// module.exports = {
//     "up": "INSERT INTO `categories`(category_id,) VALUES (value_1,value_2,...);",
//     "down": "UPDATE users SET name = '' WHERE name = 'John Snow'"
// }
