const express = require('express')
const https = require('https')
const http = require('http')
const path = require('path')
const compress = require('compression')
const ip = require('ip')
const fs = require('fs')

const config = require('./config')

const {
  ENABLE_HTTPS,
  HTTP_PORT,
  HTTPS_PORT
} = config

const app = express()
app.use(compress())

if (process.env.PRERENDER_TOKEN) {
  const prerender = require('prerender-node').set('prerenderToken', process.env.PRERENDER_TOKEN)
  prerender.crawlerUserAgents.push('googlebot')
  prerender.crawlerUserAgents.push('bingbot')
  prerender.crawlerUserAgents.push('yandex')
  app.use(prerender)
}

app.use(express.static(path.join(__dirname, 'public')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

console.log('Starting server...')
const ipAddress = ip.address()
http.createServer(app).listen(HTTP_PORT, () => {
  console.log(`Server is running at http://${ipAddress}:${HTTP_PORT}`)
})

if (ENABLE_HTTPS) {
  var options = {
    key: fs.readFileSync('./ssl/privatekey.pem'),
    cert: fs.readFileSync('./ssl/certificate.pem')
  }

  https.createServer(options, app).listen(HTTPS_PORT, () => {
    console.log(`Secure server is running at http://${ipAddress}:${HTTPS_PORT}`)
  })
}
