const express = require('express')
const path = require('path')
const compress = require('compression')
const ip = require('ip')
const config = require('./config')
const { PORT } = config

const app = express()
app.use(compress())

app.use(express.static(path.join(__dirname, 'public')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

console.log('Starting server...')
app.listen(PORT, () => {
  console.log(`Server is running at http://${ip.address()}:${PORT}`)
})
