const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const argon2 = require('argon2')

class AuthController {
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
    async checkLogin(req, res) {
        try {
            const user = await prisma.Account.findUnique({
                where: {
                    id: Number(req.id)
                }
            })
            if (!user)
                return res.status(400).json({
                    success: false,
                    message: 'User not found'
                })
            res.json({
                success: true,
                user:{
                    email:user.email
                }
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async register(req, res) {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: 'Missing email and/or password',
                success: false
            })
        }
        try {
            const user = await prisma.Account.findUnique({
                where: {
                    email
                }
            })
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already taken'
                })
            }
            const hashedPassword = await argon2.hash(password)
            const result = await prisma.Account.create({
                data: {
                    email,
                    password: hashedPassword
                }
            })
            if (result) {
                const accessToken = jwt.sign({ id: result.id }, process.env.ACCESS_TOKEN_SECRET)
                res.json({
                    success: true,
                    user: result,
                    accessToken
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
    async login(req, res) {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: 'Missing email and/or password',
                success: false
            })
        }
        try {
            const user = await prisma.Account.findUnique({
                where: {
                    email
                }
            })
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect username'
                })
            }
            const passwordValid = await argon2.verify(user.password, password)
            if (!passwordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect password'
                })
            }
            const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET)
            res.json({
                success: true,
                message: 'User logged in successfully',
                accessToken,
                user
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }
}
module.exports = new AuthController()