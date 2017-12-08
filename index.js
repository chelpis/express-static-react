const express = require('express')
const https = require('https')
const http = require('http')
const path = require('path')
const compress = require('compression')
const ip = require('ip')
const fs = require('fs')

const config = require('./config')

const {
  HTTP_PORT,
  HTTPS_PORT
} = config

var options = {
  key: fs.readFileSync('./ssl/privatekey.pem'),
  cert: fs.readFileSync('./ssl/certificate.pem')
}

const app = express()
app.use(compress())

app.use(express.static(path.join(__dirname, 'public')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

console.log('Starting server...')
const ipAddress = ip.address()
http.createServer(app).listen(HTTP_PORT, () => {
  console.log(`Server is running at http://${ipAddress}:${HTTP_PORT}`)
})
https.createServer(options, app).listen(HTTPS_PORT, () => {
  console.log(`Secure server is running at http://${ipAddress}:${HTTPS_PORT}`)
})
