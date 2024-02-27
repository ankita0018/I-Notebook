const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
connectToMongo()

const app = express()
const port = 5000
//to use req.json a middleware is required

app.use(express.json())
app.use(cors())
//available routes
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
