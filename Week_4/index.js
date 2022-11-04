const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const route = require('./routes')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(methodOverride('_method'))

app.use(express.static(__dirname + '/public'))
app.use(express.json({ limit: '30mb' }))

route(app)


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})