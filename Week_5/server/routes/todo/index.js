const express = require('express')
const router = express.Router()
const todoController = require('../../controller/todoController')
const verifyToken = require('../../controller/verifyToken')

router.get('/', verifyToken, todoController.getTodos)
router.get('/:id', verifyToken, todoController.getTodo)
router.post('/create', verifyToken, todoController.createTodo)
router.post('/search',verifyToken, todoController.searchTodo)
router.post('/updateStatus/:id',verifyToken, todoController.updateStatus)
router.put('/update/:id',verifyToken, todoController.updateTodo)
router.delete('/delete/:id',verifyToken, todoController.deleteTodo)

module.exports = router