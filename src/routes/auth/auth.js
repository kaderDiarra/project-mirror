var express = require('express');
const mysql = require('mysql');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const user = require("../user/user.js");
const todos = require("../todos/todos.js");
var salt = bcrypt.genSaltSync(10)
global.id = 0;
global.key = 0;
let router = express.Router({ mergeParams: true });
const dotenv = require('dotenv');
dotenv.config();
process.env.SECRET;
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
  return jwt.sign(pass, process.env.SECRET, { expiresIn: '180s' });
}
router.post('/login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var sql = 'SELECT password FROM user WHERE email = "' + email + '"';
  connection.query(sql, function (err, result) {
    if (err) throw err;
    bcrypt.compare(password, result[0].password, function (erri, resu) {
      if (resu == true) {
        const token = generateAccessToken({ id: result[0].id});
        key = token;
        res.status(200).send({
          token: token
        });
        var sql2 = 'SELECT id FROM user WHERE email = "' + email + '"';
        connection.query(sql2, function (errd, resu) {
          id = resu[0].id;
          if (errd) throw errd;
        })
      } else {
        res.status(400).send({
          msg: "internal server error"
        });
      }
    });
  });
})

router.use("/user", user);
module.exports = router;
