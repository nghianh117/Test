const todo = require('./todo')
const auth = require('./auth')


function route(app) {
    app.use('/todo', todo)
    app.use('/', auth)
}
module.exports = route