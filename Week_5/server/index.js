const express = require('express')
const app = express()
const port = 5000
const route = require('./routes')
const cors = require('cors')

app.use(express.json({ limit: '30mb' }))
app.use(cors())
route(app)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})