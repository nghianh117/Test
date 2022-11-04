const express = require('express')
const app = express()
const port=3000

app.set("view engine","ejs")
app.set("views","./views")
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render("pages/home")
})
app.get('/time', (req, res) => {
    const d=new Date()
    const time=`${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    res.render("pages/time",{
        time
    })
}) 
app.get('/time/day', (req, res) => {
    const d=new Date()
    const arr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const day=d.getDay()
    res.render("pages/day",{
        day:arr[day]
    })
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})