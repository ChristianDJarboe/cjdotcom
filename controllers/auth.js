const mysql = require('mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')


// for bcrypt
const saltRounds = 10
const signup = (req, res) => {
  const { username, password, authphrase} = req.body
  if(authphrase == process.env.AUTH_PHRASE){
    console.log("auth phrase match")
    let insertCredentials = "INSERT INTO userscredentials (password, username ) VALUES (?, ?)"
    bcrypt.hash(password, saltRounds, function(err, hash) {
      insertCredentials = mysql.format(insertCredentials, [hash, username])
      pool.query(insertCredentials, (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('username is taken')
        }else{
          console.log("user created");
          res.json({msg:"user created"})
        }

      })
    })
  }else{
    return res.status(409).send('incorrect auth phrase')
  }
}

const login = (req, res) => {
  const { username, password } = req.body
  let sql = "SELECT * FROM userscredentials WHERE username = ?"
  sql = mysql.format(sql, [ username ])
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    if (!rows.length) return res.status(404).send('No matching username')

    const hash = rows[0].password
    bcrypt.compare(password, hash)
      .then(result => {
        if (!result) return res.status(400).send('Invalid password')
        const data = { ...rows[0] }
        const user_id = data.user_ID
        data.password = 'REDACTED'
        const token = jwt.sign(data, process.env.BCRYPT_SECRET)
        res.json({
          msg: 'Login successful',
          token:token,
        })
      })
  })
}


module.exports = {
  signup,
  login
}