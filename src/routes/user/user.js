var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
var user_id;
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });


function generateAccessToken(pass) {
  return jwt.sign(pass, process.env.SECRET, { expiresIn: '1d' });
}

function auth(keyg){
  var sql = "SELECT password FROM user WHERE id = "+ id +"";
  connection.query(sql, function (err, result) {
    const token_test = generateAccessToken({id: id});
    var key_test = keyg.keyg;
    for (var i = 0; key_test[i] != '.'; i++) {
      if (key_test[i] != token_test[i]){
        return false;
    }
  }
  });
  return true;
}

router.get('/', function (req, res){
    var sql = "SELECT * FROM user";
    connection.query(sql, function (err, result) {
      res.status(200).send({
      " " : result
      });
      if (err) throw err;
    });
});

module.exports = router;