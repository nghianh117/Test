const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

class Middleware {
    async checkLogin(req, res, next) {
        const token = req.cookies.token
        if (!token) {
            return res.redirect('/login')
        }
        try {
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const account = await prisma.Account.findUnique({
                where: {
                    id: Number(decode.id)
                }
            })
            if (account) {
                req.id = decode.id
                next()
            } else {
                return res.redirect('/login')
            }

        } catch (error) {
            console.log(error)
            res.send('Internal server error')
            return res.redirect('/login')
        }
    }
}
module.exports = new Middleware()