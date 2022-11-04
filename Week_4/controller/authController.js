const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

class AuthController {
    async login(req, res) {
        const { email, password } = req.body
        try {
            const result = await prisma.Account.findUnique({
                where: {
                    email
                }
            })
            const passwordValid = await argon2.verify(result.password, password)
            const accessToken = jwt.sign({ id: result.id }, process.env.ACCESS_TOKEN_SECRET)
            if (passwordValid) {
                res.cookie('token', accessToken, { expires: new Date(Date.now() + 900000) })
                res.redirect('/todo')
            } else {
                res.send('Password no matching')
                res.redirect('/login')
            }
        } catch (error) {
            console.log(error)
            res.send('Email no matching')
            res.redirect('/login')
        }
    }
    async logout(req, res) {
        res.clearCookie('token')
        res.redirect('/login')
    }
    async formLogin(req, res) {
        try {
            res.render('pages/login')
        } catch (error) {
            res.send('Internal server error')
        }
    }
    async getAccounts(req, res) {
        try {
            const data = await prisma.Account.findMany({
                include: { todos: true }
            })
            res.json({
                success: true,
                data
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async getAccount(req, res) {
        const id = req.params.id
        try {
            const data = await prisma.Account.findUnique({
                where: {
                    id: Number(id)
                },
                include: { todos: true }
            })
            res.json({
                success: true,
                data
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async formRegister(req, res) {
        try {
            res.render('pages/register')
        } catch (error) {
            res.send('Internal server error')
        }
    }
    async createAccount(req, res) {
        const { email, password } = req.body
        try {
            const hashedPassword = await argon2.hash(password)
            const result = await prisma.Account.create({
                data: {
                    email,
                    password: hashedPassword
                }
            })
            if (result) {
                res.redirect('/login')
            }
        } catch (error) {
            console.log(error)
            res.send('Register fail')
        }
    }
}
module.exports = new AuthController()