const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class TodoController {
    async getTodos(req, res) {
        const id = req.id
        try {
            const data = await prisma.Account.findUnique({
                where: {
                    id: Number(id)
                },
                include: { todos: true }
            })
            res.render('pages/home', {
                data: data.todos.sort((a, b) => a.id - b.id)
            })
        } catch (error) {
            console.log(error)
            res.send('Internal server error')
        }
    }
    addTodo(req, res) {
        res.render('pages/create')
    }
    async createTodo(req, res) {
        const { title, desc, is_done } = req.body
        const id = req.id
        try {
            const result = await prisma.Todo.create({
                data: {
                    accountId: Number(id),
                    title,
                    desc,
                    is_done
                }
            })
            if (result) {
                res.redirect('/todo')
            }
        } catch (error) {
            console.log(error)
            res.send('Internal server error')
        }
    }
    async formUpdate(req, res) {
        const id = req.params.id
        try {
            const todo = await prisma.Todo.findUnique({
                where: {
                    id: Number(id)
                }
            })
            if (todo) {
                res.render('pages/update', {
                    todo
                })
            }
        } catch (error) {
            console.log(error)
            res.send('Internal server error')
        }
    }
    async updateTodo(req, res) {
        const { title, desc } = req.body
        const id = req.params.id
        try {
            const result = await prisma.Todo.update({
                where: {
                    id: Number(id)
                },
                data: {
                    title,
                    desc
                }
            })
            if (result) {
                res.redirect('/todo')
            }
        } catch (error) {
            console.log(error)
            res.send('Internal server error')
        }
    }
    async updateStatus(req, res) {
        const { is_done } = req.body
        const id = req.params.id
        try {
            const result = await prisma.Todo.update({
                where: {
                    id: Number(id)
                },
                data: {
                    is_done: Boolean(Number(is_done))
                }
            })
            if (result) {
                res.redirect('/todo')
            }
        } catch (error) {
            console.log(error)
            res.send('Internal server error')
        }
    }
    async deleteTodo(req, res) {
        const id = req.params.id
        try {
            const result = await prisma.Todo.delete({
                where: {
                    id: Number(id)
                }
            })
            if (result) {
                res.redirect('/todo')
            }
        } catch (error) {
            console.log(error)
            res.send('Internal server error')
        }
    }
    async searchTodo(req, res) {
        const { is_done, title } = req.body
        try {
            const result = await prisma.Todo.findMany({
                where: {
                    accountId: Number(req.id),
                    is_done: Boolean(Number(is_done)),
                    title: {
                        search: title,
                    },
                }
            })
            res.render('pages/home', {
                data: result
            })
        } catch (error) {
            console.log(error)
            res.send('Internal server error')
        }
    }
}
module.exports = new TodoController()