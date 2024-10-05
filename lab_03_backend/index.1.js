const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/hello', (req, res) => {
    res.send('Hello World 2')
  })

app.listen(3003, () => {
  console.log('Start API Server at port 3003.')
})
