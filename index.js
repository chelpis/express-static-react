const express = require('express')
const path = require('path')
const compress = require('compression')
const ip = require('ip')
const config = require('./config')
const { PORT } = config

const app = express()
app.use(compress())

const indexFileLocation = path.join(__dirname, 'public', 'index.html')
app.use(express.static(indexFileLocation))
app.get('*', (req, res) => {
  res.sendFile(indexFileLocation)
})

console.log('Starting server...')
app.listen(PORT, () => {
  console.log(`Server is running at http://${ip.address()}:${PORT}`)
})
