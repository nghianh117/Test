const fs = require('fs')

const list = (folder) => {
    fs.readdir(folder, (err, files) => {
        console.log(files)
    })
}
module.exports = list