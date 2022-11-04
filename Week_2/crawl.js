const { rejects } = require('assert')
const https = require('https')
const options = {
    method: 'GET',
    headers: { 'Accept': 'application/json' }
}

const crawl = (url, resolve) => {
    let request = https.request(url, options, (res) => {
        if (res.statusCode !== 200) {
            console.error(`Did not get an OK from the server(${url}). Code: ${res.statusCode}`)
            res.resume()
            return
        }
        let data = ''
        res.on('data', (chunk) => {
            data += chunk
        })
        res.on('close', () => {
            const start = data.indexOf("<title>") + 7
            const end = data.indexOf("</title>")
            resolve(data.substring(start, end))
        })
        res.on('error', (err) => {
            console.error(`Response error:${err}`)
        })
    })
    request.end()
    request.on('error', (err) => {
        console.error(`Encountered an error trying to make a request: ${err.message}`)
    })
}
module.exports = crawl