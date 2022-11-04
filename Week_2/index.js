const crawl = require('./crawl')
const listUrl = [
    "https://freetuts.net/crawl-du-lieu-website-bang-nodejs-2743.html",
    "https://freetuts.net/cac-ham-xu-ly-chuoi-trong-javascript-393.html",
    "https://galaxyz.net/cach-tao-mot-http-client-voi-core-http-trong-nodejs.992.anews",
    "https://viblo.asia/p/nodejs-bai-06-http-request-va-rest-service-trong-nodejs-vyDZOwxaZwj",
    "https://viblo.asia/p/lay-du-lieu-trang-web-trong-phut-mot-su-dung-nodejs-va-cheerio-yMnKMjPmZ7P"
]

const listTitle = async (array) => {
    const promises = array.map((item, i) => {
        return new Promise((resolve) => {
            crawl(item, resolve)
        })
    })
    return await Promise.all(promises)
}

listTitle(listUrl).then((values) => {
    values.forEach(item => {
        console.log(item)
    })
}).catch(err => console.log(err))