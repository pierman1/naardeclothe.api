const express = require('express')
var cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
// MYSQL

var mysql = require('mysql')

var con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'webshop'
})

const PORT = process.env.PORT || 9898

Mollie = require('mollie-api-node')

mollie = new Mollie.API.Client()
mollie.setApiKey(process.env.MOLLIE_KEY)

app.post('/api/checkout/payment', function (req, res) {
  // con.connect(function (err) {
  //   if (err) throw err
  //   console.log('Connected!')
  // var sql =
  //   "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')"
  // con.query(sql, function (err, result) {
  //   if (err) throw err
  //   console.log('1 record inserted')
  // })
  // })

  mollie.payments.create(
    {
      amount: 10.0,
      description: 'My first API payment',
      method: 'ideal',
      redirectUrl: 'http://localhost:3000/checkout-succes',
      webhookUrl: 'https://webshop.example.org/mollie-webhook/'
    },
    function (payment) {
      res.json(payment.links.paymentUrl)
    }
  )
})

app.listen(PORT)
console.log('app is listening on port 9898')
