var fs = require('fs')

const content = (folder) => {
    fs.readdir(folder, (err, files) => {
        const index = Math.floor(Math.random() * files.length)
        fs.readFile(`./${files[index]}`, 'utf8', (error, data) => {
            console.log(data)
        })
    })
}
module.exports = content